const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'extracted', 'css');
fs.readdirSync(cssDir).forEach(f => {
  const content = fs.readFileSync(path.join(cssDir, f), 'utf8');
  console.log(`${f}: ${content.length} chars. Snippet: ${content.substring(0, 100).replace(/\n/g, ' ')}`);
});
