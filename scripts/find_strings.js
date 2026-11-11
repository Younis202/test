const fs = require('fs');
const bloksCall = JSON.parse(fs.readFileSync('bloks_call.json', 'utf8'));

// Extract all string values from the bloks payload
const strings = new Set();
function extractStrings(obj) {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (obj.length > 2 && !obj.startsWith('opjr') && !obj.startsWith('__')) {
      strings.add(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(extractStrings);
  } else if (typeof obj === 'object') {
    Object.values(obj).forEach(extractStrings);
  }
}

extractStrings(bloksCall);

const arr = Array.from(strings);
fs.writeFileSync('bloks_strings.json', JSON.stringify(arr, null, 2), 'utf8');
console.log('Found total unique strings:', arr.length);
console.log('First 40 strings:');
arr.slice(0, 40).forEach(s => console.log(' - ', s));
