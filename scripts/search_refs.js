const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('extracted/manifest.json', 'utf8'));
const images = manifest.files.filter(f => f.category === 'images');

const imageNames = images.map(img => {
  const parts = img.url.split('/');
  return parts[parts.length - 1].split('?')[0];
});

console.log('Unique image resource identifiers:');
const uniqueIds = [...new Set(imageNames)];
console.log(uniqueIds);

// Search for these in CSS and JS
const cssDir = path.join(__dirname, 'extracted', 'css');
const jsDir = path.join(__dirname, 'extracted', 'js');
const bloksStr = fs.readFileSync('bloks_call.json', 'utf8');

uniqueIds.forEach(id => {
  console.log(`\nSearching for ${id}:`);
  if (bloksStr.includes(id)) {
    console.log(`  -> Found in bloks_call.json!`);
  }
  // Check CSS
  fs.readdirSync(cssDir).forEach(cf => {
    const content = fs.readFileSync(path.join(cssDir, cf), 'utf8');
    if (content.includes(id)) console.log(`  -> Found in CSS: ${cf}`);
  });
  // Check JS
  fs.readdirSync(jsDir).forEach(jf => {
    const content = fs.readFileSync(path.join(jsDir, jf), 'utf8');
    if (content.includes(id)) console.log(`  -> Found in JS: ${jf}`);
  });
});
