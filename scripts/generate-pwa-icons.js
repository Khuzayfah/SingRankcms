/**
 * This script generates placeholder PWA icons for the SingRank website
 * In a production environment, you should replace these with your actual brand icons
 */

const fs = require('fs');
const path = require('path');

// Define the icon sizes
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Function to generate a simple SVG icon with text
function generateSVGIcon(size, text) {
  const fontSize = Math.floor(size / 4);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#d13239" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="${fontSize}" fill="white">${text}</text>
  </svg>`;
}

// Create directory if it doesn't exist
const iconsDir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate icons
iconSizes.forEach(size => {
  const iconPath = path.join(iconsDir, `icon-${size}x${size}.png`);
  
  // If the icon doesn't exist, create an SVG placeholder
  // In production, you should replace this with real PNG icons
  if (!fs.existsSync(iconPath)) {
    const svgContent = generateSVGIcon(size, 'SR');
    const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    console.log(`Generated placeholder SVG icon: ${svgPath}`);
    console.log(`For production, please replace with a proper PNG icon at: ${iconPath}`);
  }
});

// Also generate special icons for shortcuts
const blogIconPath = path.join(iconsDir, 'blog-icon.svg');
const contactIconPath = path.join(iconsDir, 'contact-icon.svg');

fs.writeFileSync(blogIconPath, generateSVGIcon(192, 'Blog'));
fs.writeFileSync(contactIconPath, generateSVGIcon(192, 'Contact'));

console.log('PWA icon generation complete! Please replace placeholder SVGs with proper PNG icons for production.'); 