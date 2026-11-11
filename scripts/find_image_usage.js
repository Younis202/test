const fs = require('fs');
const bloksStr = fs.readFileSync('bloks_call.json', 'utf8');

const targets = [
  'gLamC64FCJF',
  'XpWPmzCEVDS',
  'WJI0PrMp5z2',
  'DUiOg0mJTjz',
  'RkrEdst9VSp',
  'wMyrLGPYKPq',
  'm-eF6r5Wlln',
  '5yjMTAfnv98',
  'd73UG10vgxw',
  'aU5Ji88A7zq',
  'M6oWJ5INQpg'
];

targets.forEach(t => {
  let idx = 0;
  console.log(`\n=== Usages of ${t} ===`);
  while ((idx = bloksStr.indexOf(t, idx)) !== -1) {
    const start = Math.max(0, idx - 150);
    const end = Math.min(bloksStr.length, idx + 200);
    console.log(bloksStr.substring(start, end).replace(/\n/g, ' '));
    idx += t.length;
  }
});
