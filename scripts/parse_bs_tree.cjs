const fs = require('fs');

const tree = JSON.parse(fs.readFileSync('bottom_sheet_tree.json', 'utf8'));

// Helper to recursively inspect nodes
function traverse(node, depth = 0) {
  const indent = '  '.repeat(depth);
  if (!node || typeof node !== 'object') return;
  
  // Find interesting props
  const props = {};
  for (let k in node) {
    if (typeof node[k] === 'string' || typeof node[k] === 'number' || typeof node[k] === 'boolean') {
      props[k] = node[k];
    }
  }
  if (Object.keys(props).length > 0) {
    console.log(`${indent}Node:`, JSON.stringify(props));
  }

  // Children could be in arrays or objects
  for (let k in node) {
    if (Array.isArray(node[k])) {
      node[k].forEach(child => traverse(child, depth + 1));
    } else if (typeof node[k] === 'object' && node[k] !== null && k !== 'props') {
      traverse(node[k], depth + 1);
    }
  }
}

console.log('Traversing bottom sheet tree:');
traverse(tree);
