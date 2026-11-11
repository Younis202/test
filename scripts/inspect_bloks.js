const fs = require('fs');
const s38 = fs.readFileSync('script_38.js', 'utf8');

const match = s38.match(/bigPipe\.onPageletArrive\(([\s\S]*)\)\s*;\s*\}\)\);?/);
const obj = eval('(' + match[1] + ')');
const bloksCall = obj.jsmods.require.find(r => r[0] === 'StartFBWebBloks');
console.log('StartFBWebBloks call:', JSON.stringify(bloksCall, null, 2).substring(0, 2000));
fs.writeFileSync('bloks_call.json', JSON.stringify(bloksCall, null, 2), 'utf8');
