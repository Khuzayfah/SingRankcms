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
  tableOfContents?: string;
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
  tableOfContents?: string;
}> {
  try {
    // Read the file with utf8 encoding and force reload from disk instead of cache
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    
    if (!fileContents || fileContents.trim() === '') {
      throw new Error(`Empty or invalid file content in ${filePath}`);
    }
    
    const { data, content } = matter(fileContents);
    
    console.log(`Parsing markdown file: ${filePath}`);
    console.log(`File frontmatter: ${JSON.stringify(data || {}, null, 2)}`);
    
    // Validate required frontmatter fields
    const title = data?.title || path.basename(filePath, '.md');
    const description = data?.description || 'No description provided.';
    const date = data?.date ? new Date(data.date).toISOString() : new Date().toISOString();
    
    // Process markdown content
    const processedContent = await remark()
      .use(html)
      .process(content || 'No content provided.');

    // Extract headings for potential table of contents
    const headings: {level: number; text: string; id: string}[] = [];
    const headingRegex = /<h([1-6])>(.*?)<\/h\1>/g;
    let match;
    
    // Clone the processed content to use for heading extraction
    const contentString = processedContent.toString();
    
    while ((match = headingRegex.exec(contentString)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2];
      // Create an id from the heading text for anchor links
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      
      // Only include h2, h3, and h4 headings in TOC
      if (level >= 2 && level <= 4) {
        headings.push({ level, text, id });
      }
    }

    // Generate Table of Contents HTML
    let tableOfContents = '';
    if (headings.length > 0) {
      tableOfContents = '<div class="toc-container bg-gray-50 rounded-lg border border-gray-100 p-5 mb-8">';
      tableOfContents += '<h3 class="text-lg font-bold mb-3 text-gray-900">Table of Contents</h3>';
      tableOfContents += '<nav class="toc text-[#d13239] mb-2">';
      tableOfContents += '<ul class="space-y-1 text-sm">';
      
      headings.forEach(heading => {
        const indent = heading.level > 2 ? `ml-${(heading.level - 2) * 3}` : '';
        tableOfContents += `<li class="${indent}"><a href="#${heading.id}" class="hover:underline text-[#d13239] transition-colors">${heading.text}</a></li>`;
      });
      
      tableOfContents += '</ul>';
      tableOfContents += '</nav>';
      tableOfContents += '</div>';
    }

    // Add custom styling to HTML elements with better readability and professional look
    const styledContent = processedContent.toString()
      // Headings with IDs for anchor links and consistent styling
      .replace(/<h([1-6])>(.*?)<\/h\1>/g, (_, level, content) => {
        const id = content.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        const margin = level === '1' ? 'mb-8 mt-10' : 'mb-4 mt-8';
        const sizes: Record<string, string> = {
          '1': 'text-4xl',
          '2': 'text-3xl pb-2 border-b border-gray-100',
          '3': 'text-2xl',
          '4': 'text-xl',
          '5': 'text-lg',
          '6': 'text-base'
        };
        const size = sizes[level] || 'text-lg';
        
        return `<h${level} id="${id}" class="${size} font-bold text-gray-900 ${margin}">${content}</h${level}>`;
      })
      
      // Paragraphs with better line height and spacing
      .replace(/<p>(.*?)<\/p>/g, 
        '<p class="text-gray-800 my-6 leading-relaxed text-base lg:text-lg">$1</p>')
      
      // Emphasis and strong elements
      .replace(/<em>(.*?)<\/em>/g, 
        '<em class="text-gray-800 italic">$1</em>')
      .replace(/<strong>(.*?)<\/strong>/g, 
        '<strong class="font-bold text-gray-900">$1</strong>')
      
      // Improve links
      .replace(/<a(.*?)>(.*?)<\/a>/g, 
        '<a$1 class="text-[#d13239] font-medium hover:underline transition-colors">$2</a>')
      
      // Style images with better layout and responsive design
      .replace(/<img(.*?)>/g, 
        '<div class="my-8"><img$1 class="rounded-lg shadow-md w-full object-cover mx-auto" loading="lazy" /></div>')
      
      // Blockquotes with a professional design
      .replace(/<blockquote>(.*?)<\/blockquote>/g, 
        '<blockquote class="border-l-4 border-[#d13239] bg-gray-50 py-4 px-6 my-6 rounded-r-lg text-gray-800 italic">$1</blockquote>')
      
      // Lists with better spacing
      .replace(/<(ul|ol)>(.*?)<\/\1>/g, (_, type, content) => 
        `<${type} class="list-${type === 'ul' ? 'disc' : 'decimal'} pl-6 my-6 space-y-2 text-gray-800">${content
          .replace(/<li>(.*?)<\/li>/g, '<li class="text-gray-800 pl-2">$1</li>')
        }</${type}>`)
      
      // Code blocks with syntax highlighting styles
      .replace(/<pre><code>(.*?)<\/code><\/pre>/g, 
        '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6"><code class="text-sm">$1</code></pre>')
      
      // Inline code
      .replace(/<code>(.*?)<\/code>/g, 
        '<code class="bg-gray-100 text-[#d13239] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      
      // Horizontal rules
      .replace(/<hr>/g,
        '<hr class="my-8 border-t border-gray-200" />');
    
    // Calculate read time (assuming average reading speed of 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;
    
    return {
      title,
      description,
      date,
      modifiedDate: data?.modifiedDate,
      category: data?.tags?.[0] || 'Uncategorized',
      image: data?.thumbnail || '/images/blog/default.jpg',
      content: styledContent,
      readTime,
      featured: data?.featured || false,
      tags: Array.isArray(data?.tags) ? data.tags : [],
      author: {
        name: data?.author?.name || 'SingRank Team',
        title: data?.author?.title || 'Content Team',
        image: data?.author?.image || '/images/authors/default.jpg'
      },
      tableOfContents
    };
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error);
    // Return a default structure instead of throwing error
    return {
      title: path.basename(filePath, '.md'),
      description: 'An error occurred while loading this article.',
      date: new Date().toISOString(),
      category: 'Uncategorized',
      image: '/images/blog/default.jpg',
      content: '<p>There was an error loading this article content. Please try again later.</p>',
      readTime: '1 min read',
      featured: false,
      tags: [],
      author: {
        name: 'SingRank Team',
        title: 'Content Team',
        image: '/images/authors/default.jpg'
      },
      tableOfContents: ''
    };
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Get the directory path from environment variable or use the default path
    const postsDirectory = process.env.BLOG_POSTS_DIRECTORY || path.join(process.cwd(), '_posts');
    console.log(`Reading blog posts from directory: ${postsDirectory}`);
    
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Blog posts directory (${postsDirectory}) does not exist`);
      return [];
    }
    
    // Get all markdown files in the directory
    const fileNames = fs.readdirSync(postsDirectory).filter(fileName => {
      return path.extname(fileName) === '.md';
    });
    
    console.log(`Found ${fileNames.length} markdown files in ${postsDirectory}`);
    
    // Parse each markdown file
    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          // Get the file path
          const filePath = path.join(postsDirectory, fileName);
          
          // Get the slug from the filename
          const slug = fileName.replace(/\.md$/, '');
          
          // Parse the markdown file
          const postData = await parseMarkdownFile(filePath);
          
          // Return the post data with the slug
          return {
            id: slug,
            slug,
            ...postData
          };
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          // Return a placeholder for this post
          return {
            id: fileName.replace(/\.md$/, ''),
            slug: fileName.replace(/\.md$/, ''),
            title: fileName.replace(/\.md$/, ''),
            description: 'Error loading this post',
            date: new Date().toISOString(),
            category: 'Uncategorized',
            image: '/images/blog/default.jpg',
            content: '<p>There was an error loading this post.</p>',
            readTime: '1 min read',
            featured: false,
            tags: [],
            author: {
              name: 'SingRank Team',
              title: 'Content Team', 
              image: '/images/authors/default.jpg'
            }
          };
        }
      })
    );
    
    // Sort the posts by date (most recent first)
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error in getAllBlogPosts:", error);
    return [];
  }
}

// Get post by slug - with forced cache refresh
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Getting blog post by slug: ${slug}`);
    
    // Construct the file path
    const postsDirectory = process.env.BLOG_POSTS_DIRECTORY || path.join(process.cwd(), '_posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      console.error(`Blog post file not found: ${fullPath}`);
      return null;
    }
    
    console.log(`Reading blog post from file: ${fullPath}`);
    
    // Parse the markdown file
    const postData = await parseMarkdownFile(fullPath);
    
    // Return the post data with the slug
    return {
      id: slug,
      slug,
      ...postData
    };
  } catch (error) {
    console.error(`Error getting blog post with slug "${slug}":`, error);
    return null;
  }
}

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