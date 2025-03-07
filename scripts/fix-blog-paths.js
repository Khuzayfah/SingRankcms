/**
 * Fix Blog Paths for Netlify Deployment
 * 
 * This script addresses path resolution issues between development and production
 * environments by preparing the codebase for Netlify deployment.
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function fixBlogPaths() {
  console.log('🔧 Running fix-blog-paths script for Netlify deployment...');
  
  try {
    // 1. Ensure public/_posts directory exists
    const postsDir = path.join(process.cwd(), '_posts');
    const publicPostsDir = path.join(process.cwd(), 'public', '_posts');
    
    if (!fs.existsSync(postsDir)) {
      console.error('⚠️ Source posts directory not found:', postsDir);
      process.exit(1);
    }
    
    // Create public/_posts if it doesn't exist
    await fs.ensureDir(publicPostsDir);
    
    // 2. Copy all blog posts to public/_posts
    console.log('📂 Copying blog posts to public directory...');
    await fs.copy(postsDir, publicPostsDir, {
      overwrite: true,
      errorOnExist: false
    });
    
    // 3. Create a blog manifest file for quicker loading
    console.log('📝 Creating blog manifest file...');
    const markdownFiles = glob.sync('_posts/**/*.md');
    
    if (markdownFiles.length === 0) {
      console.warn('⚠️ No markdown files found in _posts directory');
    } else {
      console.log(`✅ Found ${markdownFiles.length} blog posts`);
      
      // Create a simple manifest with blog post paths
      const manifest = {
        posts: markdownFiles.map(filePath => ({
          path: filePath,
          slug: path.basename(filePath, '.md')
        })),
        generatedAt: new Date().toISOString()
      };
      
      // Write the manifest file
      await fs.writeFile(
        path.join(process.cwd(), 'public', 'blog-manifest.json'),
        JSON.stringify(manifest, null, 2)
      );
      
      console.log('✅ Blog manifest created successfully');
    }
    
    // 4. Create .env.production file with blog posts path for Netlify
    console.log('🔧 Creating production environment variables...');
    const envContent = `BLOG_POSTS_DIRECTORY=${path.join(process.cwd(), 'public', '_posts')}\n`;
    
    await fs.writeFile(
      path.join(process.cwd(), '.env.production'),
      envContent
    );
    
    console.log('✅ Environment variables created successfully');
    console.log('🚀 Blog path fixing completed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing blog paths:', error);
    process.exit(1);
  }
}

// Run the function
fixBlogPaths(); 