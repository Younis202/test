const fs = require('fs');
const treeStr = fs.readFileSync('bottom_sheet_bloks.json', 'utf8');

// Search for the images in the tree to get their exact styling
['d73UG10vgxw', 'm-eF6r5Wlln', '5yjMTAfnv98', 'aU5Ji88A7zq', 'wMyrLGPYKPq'].forEach(name => {
  let idx = treeStr.indexOf(name);
  if (idx !== -1) {
    console.log(`\n=== Image: ${name} ===`);
    console.log(treeStr.substring(idx - 300, idx + 400).replace(/\n/g, ' '));
  }
});
