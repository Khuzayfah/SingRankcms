// Script to install necessary dependencies for CMS integration
const { execSync } = require('child_process');

console.log('🔧 Installing dependencies for CMS integration...');

try {
  console.log('📦 Installing gray-matter for parsing markdown frontmatter...');
  execSync('npm install gray-matter', { stdio: 'inherit' });
  
  console.log('📦 Installing remark packages for markdown processing...');
  execSync('npm install remark remark-html', { stdio: 'inherit' });
  
  console.log('✅ Dependencies installed successfully!');
  console.log('');
  console.log('🚀 You can now run the development server to see CMS integration in action:');
  console.log('npm run dev');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
} 