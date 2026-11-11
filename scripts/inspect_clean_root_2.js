const fs = require('fs');
const html = fs.readFileSync('clean_root_markup.html', 'utf8');

console.log('--- 9000 to 12000 ---');
console.log(html.substring(9000, 12000));
console.log('--- 12000 to 15000 ---');
console.log(html.substring(12000, 15000));
console.log('--- 15000 to end ---');
console.log(html.substring(15000));
