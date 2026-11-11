const fs = require('fs');
const css = fs.readFileSync('all_computed_styles.css', 'utf8');

console.log('CSS length:', css.length);
console.log('Number of lines:', css.split('\n').length);
console.log('Sample first 2000 chars:');
console.log(css.substring(0, 2000));
