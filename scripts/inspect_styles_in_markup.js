const fs = require('fs');
let html = fs.readFileSync('clean_root_markup.html', 'utf8');

// Replace class with className
// Replace for with htmlFor
// Replace tabindex with tabIndex
// Replace style strings with style objects or inspect

console.log('HTML size:', html.length);
// Let's inspect all unique style attribute strings in clean_root_markup.html
const styleAttrs = [...html.matchAll(/style="([^"]*)"/g)].map(m => m[1]);
console.log('Total style attributes:', styleAttrs.length);
const uniqueStyles = [...new Set(styleAttrs)];
console.log('Unique style strings:', uniqueStyles.length);
