const fs = require('fs');
if (fs.existsSync('dumped_dom.html')) {
  const content = fs.readFileSync('dumped_dom.html', 'utf8');
  console.log('dumped_dom.html size:', content.length);
  // Check if root has children
  const rootIdx = content.indexOf('id="root"');
  if (rootIdx !== -1) {
    console.log('root tag and snippet:', content.substring(rootIdx, rootIdx + 1500));
  }
} else {
  console.log('dumped_dom.html does not exist');
}
