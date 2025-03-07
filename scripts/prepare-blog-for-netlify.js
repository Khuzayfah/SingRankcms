/**
 * This script copies blog posts from the _posts directory to public/_posts
 * for Netlify deployment, ensuring they are available at build time.
 * It also creates a placeholder post if no posts exist.
 */

const fs = require('fs-extra');
const path = require('path');

async function prepareBlogForNetlify() {
  const sourcePath = path.join(process.cwd(), '_posts');
  const destPath = path.join(process.cwd(), 'public', '_posts');
  const alternateSource = path.join(process.cwd(), 'posts');
  
  // Create a placeholder post content if needed
  const placeholderContent = `---
title: "Welcome to SingRank Blog"
description: "This is a placeholder post to ensure our blog works correctly on Netlify."
date: "${new Date().toISOString().split('T')[0]}"
thumbnail: "/images/blog/default.jpg"
featured: true
tags: ["SingRank", "Welcome"]
author:
  name: "SingRank Team"
  title: "Content Team"
  image: "/images/authors/default.jpg"
---

# Welcome to the SingRank Blog

Thank you for visiting our blog! We're excited to share insights, tips, and industry news with you.

## What to Expect

On this blog, you'll find:

- Digital marketing strategies
- SEO best practices
- Content creation tips
- Industry updates and trends

## Stay Connected

Make sure to check back regularly for new content. You can also follow us on social media for updates.

We're committed to providing you with valuable content that helps you succeed in the digital landscape. If you have any questions or suggestions for topics you'd like us to cover, please don't hesitate to [contact us](/contact).

Thank you for being part of our community!`;

  try {
    // Ensure destination directory exists
    await fs.ensureDir(destPath);
    
    let sourceExists = false;
    let postsCopied = false;
    
    // Try to copy from primary source
    if (fs.existsSync(sourcePath)) {
      sourceExists = true;
      const sourceFiles = fs.readdirSync(sourcePath).filter(file => file.endsWith('.md'));
      
      if (sourceFiles.length > 0) {
        console.log(`Copying ${sourceFiles.length} blog posts from ${sourcePath} to ${destPath}`);
        await fs.copy(sourcePath, destPath, {
          overwrite: true,
          errorOnExist: false,
          filter: (src) => path.extname(src) === '.md' || fs.statSync(src).isDirectory()
        });
        postsCopied = true;
      } else {
        console.log(`Source directory exists but contains no markdown files: ${sourcePath}`);
      }
    } else {
      console.log(`Primary source directory does not exist: ${sourcePath}`);
    }
    
    // Try alternate source if primary failed
    if (!postsCopied && fs.existsSync(alternateSource)) {
      const alternateFiles = fs.readdirSync(alternateSource).filter(file => file.endsWith('.md'));
      
      if (alternateFiles.length > 0) {
        console.log(`Copying ${alternateFiles.length} blog posts from alternate source ${alternateSource} to ${destPath}`);
        await fs.copy(alternateSource, destPath, {
          overwrite: true,
          errorOnExist: false,
          filter: (src) => path.extname(src) === '.md' || fs.statSync(src).isDirectory()
        });
        postsCopied = true;
      } else {
        console.log(`Alternate source directory exists but contains no markdown files: ${alternateSource}`);
      }
    }
    
    // Create placeholder if no posts were copied
    if (!postsCopied) {
      console.log('No blog posts found. Creating placeholder post...');
      
      // Create source directory if it doesn't exist
      if (!sourceExists) {
        await fs.ensureDir(sourcePath);
      }
      
      // Write placeholder to both source and destination
      const placeholderPath = path.join(destPath, 'netlify-placeholder.md');
      const sourcePlaceholderPath = path.join(sourcePath, 'netlify-placeholder.md');
      
      await fs.writeFile(placeholderPath, placeholderContent);
      console.log(`Created placeholder post at: ${placeholderPath}`);
      
      // Also add to source directory for future builds
      await fs.writeFile(sourcePlaceholderPath, placeholderContent);
      console.log(`Created placeholder post at source: ${sourcePlaceholderPath}`);
    }
    
    console.log('✅ Blog posts prepared for Netlify deployment');
  } catch (error) {
    console.error('Error preparing blog posts for Netlify:', error);
    // Don't exit with error - allow build to continue with whatever we managed to set up
    console.log('Continuing build process despite errors...');
  }
}

// Run the function
prepareBlogForNetlify(); 