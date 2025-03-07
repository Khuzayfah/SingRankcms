/**
 * Debug script to help identify blog post file paths and content
 * This can be run as part of the build process to diagnose path issues in Netlify
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Function to check a directory and list its contents
function checkDirectory(dirPath) {
  console.log(`\nChecking directory: ${dirPath}`);
  
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`  Directory does not exist: ${dirPath}`);
      return;
    }
    
    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
      console.log(`  Path exists but is not a directory: ${dirPath}`);
      return;
    }
    
    const files = fs.readdirSync(dirPath);
    console.log(`  Directory exists with ${files.length} files/folders`);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const fileStats = fs.statSync(filePath);
      if (fileStats.isDirectory()) {
        console.log(`  - [DIR] ${file}`);
      } else {
        console.log(`  - [FILE] ${file} (${fileStats.size} bytes)`);
        
        // If it's a markdown file, show a preview of its content
        if (path.extname(file).toLowerCase() === '.md') {
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            const preview = content.substring(0, 150).replace(/\n/g, ' ') + '...';
            console.log(`    Preview: ${preview}`);
          } catch (err) {
            console.log(`    Error reading file: ${err.message}`);
          }
        }
      }
    });
  } catch (err) {
    console.log(`  Error accessing directory: ${err.message}`);
  }
}

console.log('==== BLOG POST DIRECTORY DEBUG INFO ====');
console.log(`Current working directory: ${process.cwd()}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NETLIFY: ${process.env.NETLIFY}`);
console.log(`CONTEXT: ${process.env.CONTEXT}`);

// Check all potential blog post directories
const potentialDirs = [
  '_posts',
  'posts',
  'public/_posts',
  'public/posts',
  'content/blog',
  '.next/server/pages/api',
  '.next/static/chunks'
];

potentialDirs.forEach(checkDirectory);

// Search for markdown files in the entire project
console.log('\nSearching for all markdown files in the project...');
try {
  const markdownFiles = glob.sync('**/*.md', {
    ignore: ['node_modules/**', '.git/**', '.next/**']
  });
  
  console.log(`Found ${markdownFiles.length} markdown files:`);
  markdownFiles.forEach(file => {
    console.log(`- ${file}`);
  });
} catch (err) {
  console.log(`Error searching for markdown files: ${err.message}`);
}

console.log('\n==== END OF DEBUG INFO ===='); 