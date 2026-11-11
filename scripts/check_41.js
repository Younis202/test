const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('extracted/manifest.json', 'utf8'));
const entry41 = manifest.files.find(f => f.index === 41);
console.log('Entry 41:', entry41);

const content41 = fs.readFileSync(entry41.relativePath, 'utf8');
console.log('Content 41 length:', content41.length);
console.log('Snippet of 41:', content41.substring(0, 1000));
