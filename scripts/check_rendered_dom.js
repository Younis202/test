const fs = require('fs');
const dom = fs.readFileSync('rendered_dom.html', 'utf8');
console.log('DOM size:', dom.length);

const rootIdx = dom.indexOf('id="root"');
if (rootIdx !== -1) {
  console.log('root found! Length from root:', dom.length - rootIdx);
  // Let's find what is inside root
  const rootSnippet = dom.substring(rootIdx, rootIdx + 3000);
  console.log('Root snippet:', rootSnippet);
} else {
  console.log('root not found');
}
