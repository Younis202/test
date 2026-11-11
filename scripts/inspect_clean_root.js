const fs = require('fs');
const html = fs.readFileSync('clean_root_markup.html', 'utf8');

// Let's print out the structure with tags, attributes, text, and child hierarchy
console.log('--- First 3000 chars of clean_root_markup.html ---');
console.log(html.substring(0, 3000));
console.log('--- Next 3000 chars ---');
console.log(html.substring(3000, 6000));
console.log('--- Next 3000 chars ---');
console.log(html.substring(6000, 9000));
