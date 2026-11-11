const fs = require('fs');
const html = fs.readFileSync('page_0.html', 'utf8');

const scriptMatches = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

fs.writeFileSync('script_34.js', scriptMatches[34], 'utf8');
fs.writeFileSync('script_38.js', scriptMatches[38], 'utf8');

console.log('Saved script_34.js and script_38.js');
