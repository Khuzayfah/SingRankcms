/**
 * This script copies blog posts from the _posts directory to public/_posts
 * for Netlify deployment, ensuring they are available at build time.
 */

const fs = require('fs-extra');
const path = require('path');

async function prepareBlogForNetlify() {
  const sourcePath = path.join(process.cwd(), '_posts');
  const destPath = path.join(process.cwd(), 'public', '_posts');

  try {
    // Check if source directory exists
    if (!fs.existsSync(sourcePath)) {
      console.error(`Source directory does not exist: ${sourcePath}`);
      process.exit(1);
    }

    // Ensure destination directory exists
    await fs.ensureDir(destPath);
    
    // Copy all files from _posts to public/_posts
    console.log(`Copying blog posts from ${sourcePath} to ${destPath}`);
    await fs.copy(sourcePath, destPath, {
      overwrite: true,
      errorOnExist: false,
    });
    
    console.log('✅ Blog posts prepared for Netlify deployment');
  } catch (error) {
    console.error('Error preparing blog posts for Netlify:', error);
    process.exit(1);
  }
}

// Run the function
prepareBlogForNetlify(); 