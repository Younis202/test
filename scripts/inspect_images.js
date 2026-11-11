const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('extracted/manifest.json', 'utf8'));
const images = manifest.files.filter(f => f.category === 'images');

console.log(`Found ${images.length} images:`);
images.forEach(img => {
  console.log(`[${img.index}] ${img.filename} (${img.sizeBytes} bytes) - URL: ${img.url}`);
});
