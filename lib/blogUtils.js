/**
 * Utility functions for connecting CMS blog content with the website
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Root directory for content from CMS - path relatif dari direktori NextJs
const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');
const TESTIMONIALS_DIR = path.join(CONTENT_DIR, 'testimonials');

// Pastikan direktori content ada
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Buat direktori content jika belum ada
ensureDirectoryExists(CONTENT_DIR);
ensureDirectoryExists(BLOG_DIR);
ensureDirectoryExists(TESTIMONIALS_DIR);

/**
 * Get all blog posts from the CMS content directory
 */
export function getAllBlogPosts() {
  // Ensure the content directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    console.warn('Blog content directory not found:', BLOG_DIR);
    // Return empty array if directory doesn't exist yet
    return [];
  }

  // Read all markdown files from the blog directory
  const files = fs.readdirSync(BLOG_DIR);
  
  if (files.length === 0) {
    console.log('No blog posts found in directory:', BLOG_DIR);
    return [];
  }
  
  console.log(`Found ${files.length} files in blog directory:`, files);
  
  const posts = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      // Read file content
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse frontmatter and content
      const { data, content } = matter(fileContent);
      
      // Extract the slug from the filename (remove date prefix and extension)
      const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      
      // Convert date string to Date object
      const date = new Date(data.date);
      
      // Format the date for display
      const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
      
      // Calculate read time (assuming average reading speed of 200 words per minute)
      const wordCount = content.split(/\s+/).length;
      const readTime = `${Math.ceil(wordCount / 200)} min read`;
      
      // Return the post data
      return {
        id: slug,
        title: data.title,
        description: data.description,
        date: formattedDate,
        rawDate: date, // For sorting
        category: data.tags?.[0] || 'Uncategorized',
        image: data.thumbnail || '/images/blog/default.jpg',
        content: content,
        readTime: readTime,
        featured: data.featured || false,
        tags: data.tags || [],
        author: {
          name: data.author?.name || 'SingRank Team',
          title: data.author?.title || 'Content Writer',
          image: data.author?.image || '/images/authors/default.jpg'
        }
      };
  });
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => b.rawDate - a.rawDate);
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug) {
  const posts = getAllBlogPosts();
  return posts.find(post => post.id === slug);
}

/**
 * Get featured posts
 */
export function getFeaturedPosts() {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.featured);
}

/**
 * Get all testimonials from the CMS
 */
export function getAllTestimonials() {
  // Ensure the testimonials directory exists
  if (!fs.existsSync(TESTIMONIALS_DIR)) {
    console.warn('Testimonials directory not found:', TESTIMONIALS_DIR);
    // Return empty array if directory doesn't exist yet
    return [];
  }
  
  // Read all markdown files from the testimonials directory
  const files = fs.readdirSync(TESTIMONIALS_DIR);
  
  const testimonials = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      // Read file content
      const filePath = path.join(TESTIMONIALS_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse frontmatter
      const { data } = matter(fileContent);
      
      // Return the testimonial data
      return {
        id: filename.replace(/\.md$/, ''),
        name: data.name,
        position: data.position,
        company: data.company,
        quote: data.quote,
        avatar: data.avatar || '/images/testimonials/default.jpg',
        rating: data.rating || 5
      };
    });
    
  return testimonials;
} 