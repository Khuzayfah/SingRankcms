// A utility script to clean Next.js cache thoroughly
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Starting thorough Next.js cache cleaning...');

// Directories to clean
const dirsToClean = [
  '.next',
  'node_modules/.cache',
];

// Clean directories
dirsToClean.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  
  if (fs.existsSync(dirPath)) {
    console.log(`📁 Removing ${dir}...`);
    try {
      if (process.platform === 'win32') {
        // Windows needs special handling for deep directories
        execSync(`rmdir /s /q "${dirPath}"`, { stdio: 'inherit' });
      } else {
        execSync(`rm -rf "${dirPath}"`, { stdio: 'inherit' });
      }
      console.log(`✅ Successfully removed ${dir}`);
    } catch (error) {
      console.error(`❌ Error removing ${dir}:`, error.message);
    }
  } else {
    console.log(`⚠️ Directory ${dir} does not exist, skipping...`);
  }
});

console.log('🔄 Cache cleared successfully!');
console.log('👉 Run "npm install" followed by "npm run dev" to restart with a clean cache.'); 