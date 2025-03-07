/**
 * Script to ensure blog directories exist at build time
 * This helps prevent 500 errors in production environments like Netlify
 */

const fs = require('fs');
const path = require('path');

// Directories to ensure exist
const directories = [
  path.join(process.cwd(), '_posts'),
  path.join(process.cwd(), 'public', '_posts'),
  path.join(process.cwd(), 'public', 'posts'),
  path.join(process.cwd(), 'public', 'blog')
];

// Create each directory if it doesn't exist
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

// Copy placeholder post to each directory if it exists
const placeholderSource = path.join(process.cwd(), 'public', '_posts', 'netlify-placeholder.md');
if (fs.existsSync(placeholderSource)) {
  console.log('Found placeholder post. Copying to all blog directories...');
  
  // Get content once
  const content = fs.readFileSync(placeholderSource, 'utf8');
  
  // Copy to each directory
  directories.forEach(dir => {
    const targetPath = path.join(dir, 'netlify-placeholder.md');
    if (!fs.existsSync(targetPath)) {
      console.log(`Copying placeholder to: ${targetPath}`);
      fs.writeFileSync(targetPath, content);
    }
  });
} else {
  console.log('No placeholder post found at:', placeholderSource);
}

console.log('Blog directories setup complete!'); 