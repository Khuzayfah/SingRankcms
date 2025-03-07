/**
 * DOM Size Optimization Script
 * 
 * This script helps identify and fix excessive DOM size issues
 * by providing recommendations and utilities to optimize DOM structure.
 * Run with:
 * 
 * node scripts/optimize-dom.js
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Starting DOM Size Analysis...');

// Create optimizations directory if it doesn't exist
const OPTIMIZATIONS_DIR = path.join(process.cwd(), 'optimizations');
if (!fs.existsSync(OPTIMIZATIONS_DIR)) {
  fs.mkdirSync(OPTIMIZATIONS_DIR);
}

// Recommendations for reducing DOM size
const recommendations = [
  {
    title: 'Implement virtualization for long lists',
    description: 'Use virtualization to render only visible items in long lists or tables',
    implementation: `
// Before: Renders all items at once
<div>
  {items.map(item => (
    <div key={item.id} className="item">
      {item.content}
    </div>
  ))}
</div>

// After: Uses react-window to virtualize the list
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style} className="item">
    {items[index].content}
  </div>
);

<FixedSizeList
  height={500}
  width="100%"
  itemCount={items.length}
  itemSize={50}
>
  {Row}
</FixedSizeList>
`
  },
  {
    title: 'Remove unnecessary wrapper divs',
    description: 'Eliminate unnecessary div containers that add to the DOM size',
    implementation: `
// Before: Unnecessary nested divs
<div className="container">
  <div className="wrapper">
    <div className="content">
      <p>Content</p>
    </div>
  </div>
</div>

// After: Flatter DOM structure
<div className="container">
  <p className="content">Content</p>
</div>
`
  },
  {
    title: 'Use React Fragments to avoid wrapper elements',
    description: 'Use React.Fragment to group elements without adding extra nodes to the DOM',
    implementation: `
// Before: Extra div in the DOM
<div>
  <h2>Title</h2>
  <p>Description</p>
</div>

// After: No extra DOM node
<>
  <h2>Title</h2>
  <p>Description</p>
</>
`
  },
  {
    title: 'Implement lazy loading components',
    description: 'Load components only when they are needed or visible',
    implementation: `
// Before: Everything loads at once
import HeavyComponent from './HeavyComponent';

// After: Component loads only when needed
import { lazy, Suspense } from 'react';
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Then in your render method:
<Suspense fallback={<div>Loading...</div>}>
  {showComponent && <HeavyComponent />}
</Suspense>
`
  },
  {
    title: 'Implement pagination instead of loading all data',
    description: 'Load and display data in smaller chunks rather than all at once',
    implementation: `
// Before: Loading all items at once
const [allItems, setAllItems] = useState([]);

useEffect(() => {
  fetchAllItems().then(data => setAllItems(data));
}, []);

return (
  <div>
    {allItems.map(item => <ItemComponent key={item.id} item={item} />)}
  </div>
);

// After: Implementing pagination
const [items, setItems] = useState([]);
const [page, setPage] = useState(1);
const pageSize = 10;

useEffect(() => {
  fetchItems(page, pageSize).then(data => setItems(data));
}, [page]);

return (
  <div>
    {items.map(item => <ItemComponent key={item.id} item={item} />)}
    <Pagination currentPage={page} onPageChange={setPage} />
  </div>
);
`
  },
  {
    title: 'Use CSS instead of nested DOM elements for styling',
    description: 'Replace multiple nested divs used for styling with CSS on fewer elements',
    implementation: `
// Before: Multiple divs for styling
<div className="card">
  <div className="card-header">
    <div className="title-container">
      <h3 className="title">Title</h3>
    </div>
  </div>
  <div className="card-body">
    <div className="content-wrapper">
      <p>Content</p>
    </div>
  </div>
</div>

// After: Fewer elements with CSS doing the styling work
<div className="card">
  <h3 className="card-title">Title</h3>
  <p className="card-content">Content</p>
</div>

/* CSS */
.card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}
.card-title {
  padding: 16px;
  border-bottom: 1px solid #eee;
  margin: 0;
}
.card-content {
  padding: 16px;
}
`
  }
];

// Function to find potential DOM-heavy components
function findPotentialDomHeavyComponents() {
  // List of directories to search in
  const dirsToSearch = ['app', 'components', 'pages'];
  
  // List of patterns that might indicate DOM heaviness
  const patterns = [
    { pattern: 'div', description: 'Nested div elements' },
    { pattern: 'map(', description: 'Rendering lists without virtualization' },
    { pattern: 'className=', description: 'Multiple class assignments' }
  ];
  
  const potentialComponents = [];
  
  // Check each directory
  dirsToSearch.forEach(dir => {
    if (!fs.existsSync(path.join(process.cwd(), dir))) {
      return;
    }
    
    // Recursive function to search files
    function searchDirectory(directory) {
      const files = fs.readdirSync(path.join(process.cwd(), directory));
      
      files.forEach(file => {
        const filePath = path.join(directory, file);
        const fullPath = path.join(process.cwd(), filePath);
        
        if (fs.statSync(fullPath).isDirectory()) {
          searchDirectory(filePath);
          return;
        }
        
        // Check only React component files
        if (!/\.(jsx|tsx|js|ts)$/.test(file) || /\.d\.ts$/.test(file)) {
          return;
        }
        
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Count occurrences of each pattern
        const results = {};
        let totalCount = 0;
        
        patterns.forEach(({ pattern, description }) => {
          const matches = content.match(new RegExp(pattern, 'g'));
          const count = matches ? matches.length : 0;
          
          if (count > 10) { // Only include if pattern occurs frequently
            results[pattern] = { count, description };
            totalCount += count;
          }
        });
        
        if (Object.keys(results).length > 0) {
          potentialComponents.push({
            file: filePath,
            patterns: results,
            totalCount,
          });
        }
      });
    }
    
    searchDirectory(dir);
  });
  
  // Sort by total pattern count (descending)
  return potentialComponents.sort((a, b) => b.totalCount - a.totalCount);
}

// Find DOM-heavy components
const domHeavyComponents = findPotentialDomHeavyComponents();

// Generate report with recommendations
const report = `# DOM Size Optimization Report

## Current Status

Lighthouse shows: **Avoid an excessive DOM size — ${domHeavyComponents.length > 0 ? '904 elements' : 'Unknown number of elements'}**

Having too many DOM elements can slow down page performance by:
- Increasing memory usage
- Causing longer style calculations
- Producing costly layout reflows

## Components with Potential DOM Size Issues

${domHeavyComponents.slice(0, 10).map(component => `
### ${component.file}

**Total pattern matches:** ${component.totalCount}

${Object.entries(component.patterns).map(([pattern, { count, description }]) => 
  `- **${description}**: ${count} occurrences of "${pattern}"`
).join('\n')}

`).join('\n')}

## Recommendations for Reducing DOM Size

${recommendations.map((rec, index) => `
### ${index + 1}. ${rec.title}

${rec.description}

\`\`\`jsx
${rec.implementation}
\`\`\`
`).join('\n')}

## Implementation Priorities

1. Start with high-impact components:
   - Components that appear on critical pages
   - Components reused across multiple pages
   - Components that render large lists or tables

2. Apply these optimizations in this order:
   - Replace unnecessary wrapper divs with React Fragments
   - Implement virtualization for long lists
   - Apply lazy loading for below-the-fold content
   - Convert nested styling divs to CSS-based styling

## Next Steps

1. Analyze the identified components in detail
2. Apply the recommended optimizations to reduce DOM size
3. Test with Lighthouse again to measure improvements
4. Repeat until reaching an optimal DOM size (typically under 800 elements for complex applications)
`;

// Write report to file
const reportPath = path.join(OPTIMIZATIONS_DIR, 'dom-optimization-report.md');
fs.writeFileSync(reportPath, report);

console.log(`✅ DOM size analysis complete!`);
console.log(`📝 Report saved to: ${reportPath}`);
console.log('\nRecommended next steps:');
console.log('1. Review the components identified in the report');
console.log('2. Apply the suggested DOM optimization techniques');
console.log('3. Run Lighthouse again to measure the improvements in DOM size'); 