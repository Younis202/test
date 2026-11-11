const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('extracted/manifest.json', 'utf8'));

const entry = manifest.files.find(f => f.url.includes('aU5Ji88A7zq'));
console.log('Original URL:', entry ? entry.url : 'not found');
console.log('Relative path:', entry ? entry.relativePath : 'not found');
