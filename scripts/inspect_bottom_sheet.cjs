const fs = require('fs');

const raw = fs.readFileSync('extracted/js/41_fetch.js', 'utf8');
// It starts with for (;;);
const jsonStr = raw.replace(/^for\s*\(\s*;\s*;\s*\)\s*;\s*/, '');
const data = JSON.parse(jsonStr);

console.log('Keys of 41_fetch.js:', Object.keys(data));
const payload = data.payload;
console.log('Payload keys:', Object.keys(payload));
const bloksPayload = payload.layout.bloks_payload;
console.log('Bloks payload keys:', Object.keys(bloksPayload));

fs.writeFileSync('bottom_sheet_bloks.json', JSON.stringify(bloksPayload, null, 2), 'utf8');
console.log('Wrote bottom_sheet_bloks.json');
