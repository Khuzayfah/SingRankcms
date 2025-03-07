/**
 * Optimizing JavaScript
 * 
 * This script generates a report about JavaScript usage in the application
 * and provides recommendations for optimization. Run with:
 *
 * node scripts/optimize-js.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📊 Starting JavaScript optimization analysis...');

// Create optimizations directory if it doesn't exist
const OPTIMIZATIONS_DIR = path.join(process.cwd(), 'optimizations');
if (!fs.existsSync(OPTIMIZATIONS_DIR)) {
  fs.mkdirSync(OPTIMIZATIONS_DIR);
}

// 1. Generate a production build with bundle analyzer
console.log('🔄 Generating production build with bundle analyzer...');
try {
  execSync('cross-env ANALYZE=true next build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to generate build with bundle analyzer.');
  console.error('Make sure "cross-env" and "@next/bundle-analyzer" are installed.');
  console.error('npm install --save-dev cross-env @next/bundle-analyzer');
  process.exit(1);
}

// 2. Provide optimization recommendations
const recommendations = [
  {
    title: 'Implement dynamic imports',
    description: 'Use dynamic imports for components that are not needed on initial load',
    example: `
// Before
import HeavyComponent from './HeavyComponent';

// After
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // if component uses browser APIs
});`
  },
  {
    title: 'Tree shake large libraries',
    description: 'Import only what you need from large libraries',
    example: `
// Before: imports entire library
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// After: imports only what's needed
import { motion } from 'framer-motion/motion';
import { AnimatePresence } from 'framer-motion/AnimatePresence';
import { useAnimation } from 'framer-motion/useAnimation';`
  },
  {
    title: 'Defer non-critical JavaScript',
    description: 'Use the Script component with the right strategy',
    example: `
// Before
<script src="heavy-analytics.js"></script>

// After
import Script from 'next/script';

<Script
  src="heavy-analytics.js"
  strategy="lazyOnload"
  onLoad={() => console.log('Script loaded')}
/>`
  },
  {
    title: 'Move functions outside component definitions',
    description: 'Prevent recreation of functions on every render',
    example: `
// Before
function MyComponent() {
  const handleClick = () => {
    // function recreated on every render
  };
  
  return <button onClick={handleClick}>Click me</button>;
}

// After
// Function defined once
const handleClick = () => {
  // function created once
};

function MyComponent() {
  return <button onClick={handleClick}>Click me</button>;
}`
  },
  {
    title: 'Use React.memo for expensive components',
    description: 'Prevent unnecessary re-renders of complex components',
    example: `
// Before
function ExpensiveComponent({ data }) {
  // Complex rendering logic
  return <div>{/* Complex UI */}</div>;
}

// After
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Complex rendering logic
  return <div>{/* Complex UI */}</div>;
});`
  }
];

// Generate optimization report
const report = `# JavaScript Optimization Report

## Recommendations for Reducing Unused JavaScript

${recommendations.map((rec, index) => `
### ${index + 1}. ${rec.title}

${rec.description}

\`\`\`jsx
${rec.example}
\`\`\`
`).join('\n')}

## Specific Component Recommendations

1. **ParticlesContainer**: Make sure it's dynamically imported and only loaded when needed. Reduce particle count and animation complexity.

2. **ChatTerminal**: Extract static data outside the component and implement proper code-splitting.

3. **Home Page**: Break down into smaller components and lazy load non-critical sections.

4. **Animations**: Use simpler CSS animations where possible instead of JavaScript animations.

5. **Third-party Libraries**: Review and remove unused libraries or replace with smaller alternatives.

## Next Steps

1. Check the bundle analyzer output to identify the largest JavaScript chunks.
2. Focus on optimizing the components that contribute most to the bundle size.
3. Implement dynamic imports for components not needed on initial load.
4. Extract utility functions to separate files to improve tree-shaking.
5. Consider implementing route-based code splitting.
`;

// Write report to file
fs.writeFileSync(path.join(OPTIMIZATIONS_DIR, 'javascript-optimization-report.md'), report);

console.log('✅ JavaScript optimization analysis complete!');
console.log(`📝 Report saved to: ${path.join(OPTIMIZATIONS_DIR, 'javascript-optimization-report.md')}`);
console.log('\nRecommended next steps:');
console.log('1. Review the report and bundle analyzer output');
console.log('2. Apply the recommended optimizations to your code');
console.log('3. Run Lighthouse again to measure the improvements'); 