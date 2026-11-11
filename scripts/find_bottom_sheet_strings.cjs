const fs = require('fs');

const bloksPayload = JSON.parse(fs.readFileSync('bottom_sheet_bloks.json', 'utf8'));

// Extract all string values from the bottom sheet
const strings = new Set();
function extractStrings(obj) {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (obj.length > 2 && !obj.startsWith('opm') && !obj.startsWith('\t')) {
      strings.add(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(extractStrings);
  } else if (typeof obj === 'object') {
    Object.values(obj).forEach(extractStrings);
  }
}

extractStrings(bloksPayload);

const arr = Array.from(strings);
fs.writeFileSync('bottom_sheet_strings.json', JSON.stringify(arr, null, 2), 'utf8');
console.log('Found total unique strings in bottom sheet:', arr.length);
arr.forEach(s => console.log(' -> ', s));
