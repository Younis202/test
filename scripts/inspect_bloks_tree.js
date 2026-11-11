const fs = require('fs');
const bloksCall = JSON.parse(fs.readFileSync('bloks_call.json', 'utf8'));

const payload = bloksCall[3][0].payload;
console.log('payload keys:', Object.keys(payload));
console.log('layout keys:', Object.keys(payload.layout));
const bloksPayload = payload.layout.bloks_payload;
console.log('bloks_payload keys:', Object.keys(bloksPayload));
console.log('tree keys:', Object.keys(bloksPayload.tree));
console.log('tree type:', bloksPayload.tree.type);

fs.writeFileSync('bloks_tree.json', JSON.stringify(bloksPayload.tree, null, 2), 'utf8');
console.log('Wrote bloks_tree.json');
