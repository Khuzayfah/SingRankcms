import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

// Define blog post interface
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  modifiedDate?: string;
  category: string;
  image: string;
  content: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  author: {
    name: string;
    title: string;
    image: string;
  };
  slug: string;
}

// Define content directory
const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Ensure directory exists
function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Parse markdown file
async function parseMarkdownFile(filePath: string): Promise<{
  title: string;
  description: string;
  date: string;
  modifiedDate?: string;
  category: string;
  image: string;
  content: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  author: {
    name: string;
    title: string;
    image: string;
  };
}> {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Process markdown content
  const processedContent = await remark()
    .use(html)
    .process(content);

  // Add custom styling to HTML elements
  const styledContent = processedContent.toString()
    .replace(/<h([1-6])>(.*?)<\/h\1>/g, (_, level, content) => 
      `<h${level} class="text-[#d13239] font-bold">${content}</h${level}>`)
    .replace(/<strong>(.*?)<\/strong>/g, 
      '<strong class="text-[#d13239] font-bold">$1</strong>')
    .replace(/<em>(.*?)<\/em>/g, 
      '<em class="text-gray-900">$1</em>')
    .replace(/<img(.*?)>/g, 
      '<div class="relative w-full aspect-square mb-6"><img$1 class="rounded-xl shadow-md object-cover w-full h-full" loading="lazy" /></div>')
    .replace(/<a(.*?)>(.*?)<\/a>/g, 
      '<a$1 class="text-[#d13239] hover:underline">$2</a>')
    .replace(/<blockquote>(.*?)<\/blockquote>/g, 
      '<blockquote class="border-l-4 border-[#d13239] pl-4 py-2 my-4 bg-gray-50 text-gray-900">$1</blockquote>')
    .replace(/<(ul|ol)>(.*?)<\/\1>/g, (_, type, content) => 
      `<${type} class="list-${type === 'ul' ? 'disc' : 'decimal'} pl-4 text-gray-900">${content
        .replace(/<li>(.*?)<\/li>/g, '<li class="text-gray-900">$1</li>')
      }</${type}>`)
    .replace(/<p>(.*?)<\/p>/g, 
      '<p class="text-gray-900 mb-4">$1</p>')
    .replace(/<pre><code>(.*?)<\/code><\/pre>/g, 
      '<pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto"><code class="text-[#d13239]">$1</code></pre>');
  
  // Calculate read time (assuming average reading speed of 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readTime = `${Math.ceil(wordCount / 200)} min read`;
  
  return {
    title: data.title,
    description: data.description,
    date: data.date,
    modifiedDate: data.modifiedDate,
    category: data.tags?.[0] || 'Uncategorized',
    image: data.thumbnail || '/images/blog/default.jpg',
    content: styledContent,
    readTime,
    featured: data.featured || false,
    tags: data.tags || [],
    author: {
      name: data.author?.name || 'SingRank Team',
      title: data.author?.title || 'Content Team',
      image: data.author?.image || '/images/authors/default.jpg'
    }
  };
}

// Get all blog posts with caching
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  ensureDirectoryExists(BLOG_DIR);
  
  const files = fs.readdirSync(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.md'))
      .map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const slug = file.replace(/\.md$/, '');
        const fileData = await parseMarkdownFile(filePath);
        
        return {
          id: slug,
          slug,
          title: fileData.title,
          description: fileData.description,
          date: fileData.date,
          modifiedDate: fileData.modifiedDate,
          category: fileData.category,
          image: fileData.image,
          content: fileData.content,
          readTime: fileData.readTime,
          featured: fileData.featured || false,
          tags: fileData.tags || [],
          author: {
            name: fileData.author?.name || 'SingRank Team',
            title: fileData.author?.title || 'Content Team',
            image: fileData.author?.image || '/images/authors/default.jpg'
          }
        };
      })
  );
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Get post by slug
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileData = await parseMarkdownFile(filePath);
  return {
    id: slug,
    slug,
    title: fileData.title,
    description: fileData.description,
    date: fileData.date,
    modifiedDate: fileData.modifiedDate,
    category: fileData.category,
    image: fileData.image,
    content: fileData.content,
    readTime: fileData.readTime,
    featured: fileData.featured || false,
    tags: fileData.tags || [],
    author: {
      name: fileData.author?.name || 'SingRank Team',
      title: fileData.author?.title || 'Content Team',
      image: fileData.author?.image || '/images/authors/default.jpg'
    }
  };
});

// Get posts by category
export const getPostsByCategory = cache(async (category: string): Promise<BlogPost[]> => {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
});

// Get featured posts
export const getFeaturedPosts = cache(async (): Promise<BlogPost[]> => {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.featured);
});

// Get related posts
export const getRelatedPosts = cache(async (currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts();
  
  return allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
});

// Get all categories
export const getAllCategories = cache(async (): Promise<string[]> => {
  const posts = await getAllBlogPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
});

// Get all tags
export const getAllTags = cache(async (): Promise<string[]> => {
  const posts = await getAllBlogPosts();
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags);
});

// Search posts
export const searchPosts = cache(async (query: string): Promise<BlogPost[]> => {
  const posts = await getAllBlogPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm)
  );
}); 