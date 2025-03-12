import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

// Cache invalidation timestamp to ensure content is fresh
let lastCacheInvalidation = Date.now();

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
    
    // Pre-process the markdown to convert any ## formatting that wasn't properly processed
    let enhancedContent = content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
      const level = hashes.length;
      return `<h${level}>${title}</h${level}>`;
    });
    
    // Process the enhanced content again
    const enhancedProcessed = await remark()
      .use(html)
      .process(enhancedContent || 'No content provided.');
    
    let finalContentString = enhancedProcessed.toString();
    
    while ((match = headingRegex.exec(finalContentString)) !== null) {
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
      tableOfContents += '<h3 class="text-lg font-bold mb-3 text-[#d13239]">Table of Contents</h3>';
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
    const styledContent = finalContentString
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
        
        return `<h${level} id="${id}" class="${size} font-bold text-[#d13239] ${margin}">${content}</h${level}>`;
      })
      
      // Paragraphs with better line height and spacing
      .replace(/<p>(.*?)<\/p>/g, 
        '<p class="text-gray-800 my-6 leading-relaxed text-base lg:text-lg">$1</p>')
      
      // Emphasis and strong elements
      .replace(/<em>(.*?)<\/em>/g, 
        '<em class="text-gray-800 italic">$1</em>')
      .replace(/<strong>(.*?)<\/strong>/g, 
        '<strong class="font-bold text-[#d13239]">$1</strong>')
      
      // Improve links
      .replace(/<a(.*?)>(.*?)<\/a>/g, 
        '<a$1 class="text-[#d13239] font-medium hover:underline transition-colors underline underline-offset-2">$2</a>')
      
      // Style images with better layout and responsive design
      .replace(/<img(.*?)>/g, 
        '<div class="my-10"><img$1 class="rounded-lg shadow-md w-full object-cover mx-auto" loading="lazy" /></div>')
      
      // Blockquotes with a professional design
      .replace(/<blockquote>(.*?)<\/blockquote>/g, 
        '<blockquote class="border-l-4 border-[#d13239] bg-gray-50 py-4 px-6 my-8 rounded-r-lg text-gray-800 italic">$1</blockquote>')
      
      // Lists with better spacing
      .replace(/<(ul|ol)>(.*?)<\/\1>/g, (_, type, content) => 
        `<${type} class="list-${type === 'ul' ? 'disc' : 'decimal'} pl-6 my-8 space-y-3 text-gray-800">${content
          .replace(/<li>(.*?)<\/li>/g, '<li class="text-gray-800 pl-2">$1</li>')
        }</${type}>`)
      
      // Code blocks with syntax highlighting styles
      .replace(/<pre><code>(.*?)<\/code><\/pre>/g, 
        '<pre class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8"><code class="text-sm">$1</code></pre>')
      
      // Inline code
      .replace(/<code>(.*?)<\/code>/g, 
        '<code class="bg-gray-100 text-[#d13239] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      
      // Horizontal rules
      .replace(/<hr>/g,
        '<hr class="my-10 border-t border-gray-200" />')
      
      // Fix for markdown formatting that might not be properly processed
      .replace(/#{1,6}\s+([^\n]+)/g, (match, title) => {
        const level = match.trim().indexOf(' ');
        if (level > 0 && level <= 6) {
          return `<h${level} class="text-${level === 1 ? '4xl' : level === 2 ? '3xl' : level === 3 ? '2xl' : 'xl'} font-bold text-[#d13239] ${level === 1 ? 'mb-8 mt-10' : 'mb-4 mt-8'}">${title}</h${level}>`;
        }
        return match;
      })
      
      // Ensure all images are responsive
      .replace(/<img([^>]*?)>/g, (match, attrs) => {
        if (!attrs.includes('class=')) {
          return `<img${attrs} class="w-full rounded-lg shadow-md">`;
        }
        return match;
      });
    
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

// Utility to invalidate cache
export function invalidateBlogCache() {
  console.log('Invalidating blog content cache');
  lastCacheInvalidation = Date.now();
}

// Get all blog posts - Updated with cache bypass
export async function getAllBlogPosts(bypassCache: boolean = false): Promise<BlogPost[]> {
  try {
    const cacheTimestamp = lastCacheInvalidation;
    console.log(`getAllBlogPosts called with bypassCache=${bypassCache}, cache timestamp: ${new Date(cacheTimestamp).toISOString()}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}, NETLIFY: ${process.env.NETLIFY}`);
    
    // Define potential blog post directories to check in order of priority
    const potentialDirectories = [
      // First check environment variable if set
      process.env.BLOG_POSTS_DIRECTORY,
      // Check for content directory which is used by Decap CMS
      path.join(process.cwd(), 'content', 'blog'),
      // Check standard locations
      process.env.NODE_ENV === 'production' 
        ? path.join(process.cwd(), 'public', '_posts')
        : path.join(process.cwd(), '_posts'),
      // Check alternative locations that might work in Netlify
      path.join(process.cwd(), '_posts'),
      path.join(process.cwd(), 'posts'),
      path.join(process.cwd(), 'public', 'posts'),
      path.join(process.cwd(), 'public', 'blog'),
      path.join(process.cwd(), 'blog'),
      // For Netlify CMS specifically
      // Check for absolute paths which might be needed in Netlify environment
      '/opt/build/repo/_posts',
      '/opt/build/repo/public/_posts',
      '/opt/build/repo/posts',
      '/opt/build/repo/content/blog'
    ].filter(Boolean) as string[]; // Filter out undefined values
    
    let postsDirectory = '';
    let fileNames: string[] = [];
    
    // Try each directory until we find one that exists and has markdown files
    for (const directory of potentialDirectories) {
      try {
        console.log(`Checking directory: ${directory}`);
        if (fs.existsSync(directory)) {
          const files = fs.readdirSync(directory).filter(fileName => {
            const ext = path.extname(fileName).toLowerCase();
            return ext === '.md' || ext === '.markdown';
          });
          
          if (files.length > 0) {
            postsDirectory = directory;
            fileNames = files;
            console.log(`Found ${files.length} markdown files in ${directory}`);
            break;
          } else {
            console.log(`Directory ${directory} exists but contains no markdown files`);
          }
        } else {
          console.log(`Directory ${directory} does not exist`);
        }
      } catch (dirError) {
        console.error(`Error accessing directory ${directory}:`, dirError);
      }
    }
    
    // If no valid directory was found, try creating a default post
    if (!postsDirectory || fileNames.length === 0) {
      console.error('No valid blog posts directory found with markdown files');
      
      // Create a default post directory if in production
      if (process.env.NODE_ENV === 'production') {
        try {
          // Determine a directory to create posts in
          const defaultDir = path.join(process.cwd(), 'public', '_posts');
          console.log(`Attempting to create default posts directory: ${defaultDir}`);
          
          // Create the directory if it doesn't exist
          ensureDirectoryExists(defaultDir);
          
          // Create a default post if no posts found
          const defaultPostPath = path.join(defaultDir, 'welcome-post.md');
          if (!fs.existsSync(defaultPostPath)) {
            const defaultPostContent = `---
title: "Welcome to Our Blog"
description: "This is a default post to ensure the blog page works correctly."
date: "${new Date().toISOString().split('T')[0]}"
thumbnail: "/images/blog/default.jpg"
featured: true
tags: ["Welcome"]
author:
  name: "SingRank Team"
  title: "Content Team"
  image: "/images/authors/default.jpg"
---

# Welcome to Our Blog

Thank you for visiting our blog! We're working on adding more content soon.

## Coming Soon

Stay tuned for more articles about:
- Digital Marketing Strategies
- SEO Tips and Tricks
- Content Marketing
- And much more!

In the meantime, feel free to [contact us](/contact) if you have any questions.
`;
            fs.writeFileSync(defaultPostPath, defaultPostContent);
            console.log(`Created default post at: ${defaultPostPath}`);
            
            // Update the posts directory and file names
            postsDirectory = defaultDir;
            fileNames = ['welcome-post.md'];
          }
        } catch (error) {
          console.error('Error creating default post:', error);
        }
      }
      
      // If still no posts found, return an empty array or placeholder post
      if (!postsDirectory || fileNames.length === 0) {
        console.log('Using placeholder post data since no physical files were found');
        
        // Return a single placeholder post
        return [{
          id: 'welcome-post',
          slug: 'welcome-post',
          title: 'Welcome to Our Blog',
          description: 'We\'re working on adding content. Please check back soon!',
          date: new Date().toISOString(),
          category: 'Announcements',
          image: '/images/blog/default.jpg',
          content: '<p>Thank you for visiting our blog! We\'re currently working on adding content. Please check back soon for updates.</p>',
          readTime: '1 min read',
          featured: true,
          tags: ['Welcome'],
          author: {
            name: 'SingRank Team',
            title: 'Content Team',
            image: '/images/authors/default.jpg'
          }
        }];
      }
    }
    
    console.log(`Using blog posts from directory: ${postsDirectory}`);
    
    // Parse each markdown file
    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          // Get the file path
          const filePath = path.join(postsDirectory, fileName);
          
          // Get the slug from the filename
          const slug = fileName.replace(/\.md$/, '').replace(/\.markdown$/, '');
          
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
            id: fileName.replace(/\.md$/, '').replace(/\.markdown$/, ''),
            slug: fileName.replace(/\.md$/, '').replace(/\.markdown$/, ''),
            title: fileName.replace(/\.md$/, '').replace(/\.markdown$/, ''),
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
    
    // Log the number of posts found
    console.log(`Processed ${allPostsData.length} blog posts`);
    
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
    
    // Return a placeholder post in case of error
    return [{
      id: 'system-error',
      slug: 'system-error',
      title: 'System is updating',
      description: 'We\'re currently updating our blog. Please check back soon!',
      date: new Date().toISOString(),
      category: 'System',
      image: '/images/blog/default.jpg',
      content: '<p>Our blog system is currently updating. Please check back in a few minutes.</p>',
      readTime: '1 min read',
      featured: true,
      tags: ['System'],
      author: {
        name: 'SingRank Team',
        title: 'System',
        image: '/images/authors/default.jpg'
      }
    }];
  }
}

// Get post by slug - with forced cache refresh
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Getting blog post by slug: ${slug}, NODE_ENV: ${process.env.NODE_ENV}, NETLIFY: ${process.env.NETLIFY}`);
    
    // Define potential blog post directories to check in order of priority
    const potentialDirectories = [
      // First check environment variable if set
      process.env.BLOG_POSTS_DIRECTORY,
      // Check standard locations
      process.env.NODE_ENV === 'production' 
        ? path.join(process.cwd(), 'public', '_posts')
        : path.join(process.cwd(), '_posts'),
      // Check alternative locations that might work in Netlify
      path.join(process.cwd(), '_posts'),
      path.join(process.cwd(), 'posts'),
      path.join(process.cwd(), 'public', 'posts'),
      path.join(process.cwd(), 'public', 'blog'),
      path.join(process.cwd(), 'blog'),
      // For Netlify CMS specifically
      path.join(process.cwd(), 'content', 'blog'),
      // Check for absolute paths which might be needed in Netlify environment
      '/opt/build/repo/_posts',
      '/opt/build/repo/public/_posts',
      '/opt/build/repo/posts',
      '/opt/build/repo/content/blog'
    ].filter(Boolean) as string[]; // Filter out undefined values
    
    let postFilePath = '';
    
    // Try different file extensions
    const fileExtensions = ['.md', '.markdown'];
    
    // Try to find the post in each directory with different extensions
    for (const directory of potentialDirectories) {
      try {
        if (fs.existsSync(directory)) {
          for (const extension of fileExtensions) {
            const filePath = path.join(directory, `${slug}${extension}`);
            console.log(`Checking for blog post at: ${filePath}`);
            
            if (fs.existsSync(filePath)) {
              postFilePath = filePath;
              console.log(`Found blog post at: ${filePath}`);
              break;
            }
          }
          
          if (postFilePath) break;
        }
      } catch (dirError) {
        console.error(`Error accessing directory ${directory}:`, dirError);
      }
    }
    
    // If post file wasn't found in any directory
    if (!postFilePath) {
      console.error(`Blog post with slug "${slug}" not found in any directory`);
      
      // Try to get all posts and find by slug for fallback
      console.log('Attempting to fetch all posts to find matching slug...');
      const allPosts = await getAllBlogPosts();
      const matchingPost = allPosts.find(post => post.slug === slug);
      
      if (matchingPost) {
        console.log(`Found matching post by slug in getAllBlogPosts results`);
        return matchingPost;
      }
      
      return null;
    }
    
    // Parse the markdown file
    console.log(`Reading blog post from file: ${postFilePath}`);
    const postData = await parseMarkdownFile(postFilePath);
    
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