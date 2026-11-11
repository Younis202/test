const fs = require('fs');
const html = fs.readFileSync('live_root_content.html', 'utf8');

// Find all text elements with their tag and classes
const matches = [...html.matchAll(/>([^<]+)</g)].map(m => m[1].trim()).filter(t => t.length > 0 && !t.startsWith('{') && !t.startsWith('/*'));
console.log('Visible texts:');
const uniqueTexts = [...new Set(matches)];
uniqueTexts.forEach(t => console.log(' - ', t));
