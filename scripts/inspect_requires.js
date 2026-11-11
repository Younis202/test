const fs = require('fs');
const s38 = fs.readFileSync('script_38.js', 'utf8');

const match = s38.match(/bigPipe\.onPageletArrive\(([\s\S]*)\)\s*;\s*\}\)\);?/);
const obj = eval('(' + match[1] + ')');
console.log('content:', JSON.stringify(obj.content));
console.log('jsmods require calls:');
obj.jsmods.require.forEach(r => {
  console.log(' - Module:', r[0], 'Method:', r[1]);
});
fs.writeFileSync('s38_requires.json', JSON.stringify(obj.jsmods.require, null, 2), 'utf8');
