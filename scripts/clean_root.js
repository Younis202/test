const fs = require('fs');
const dom = fs.readFileSync('complete_live_dom.html', 'utf8');

const startIdx = dom.indexOf('<div id="root_0_0_8y">');
// Find where root_0_0_8y closes
// It's inside id="37543afb-04ee-4acf-914b-4e2d9a3d7a4f"
const afterStart = dom.substring(startIdx);
// Let's find the closing tag of root_0_0_8y
let depth = 0;
let endPos = 0;
let inTag = false;
let currentTagName = '';

// Let's write a parser to find the exact matching closing </div>
let i = 0;
while (i < afterStart.length) {
  if (afterStart.startsWith('<div', i)) {
    depth++;
    i += 4;
  } else if (afterStart.startsWith('</div', i)) {
    depth--;
    if (depth === 0) {
      endPos = i + 6;
      break;
    }
    i += 5;
  } else {
    i++;
  }
}

const rootClean = afterStart.substring(0, endPos);
fs.writeFileSync('clean_root_markup.html', rootClean, 'utf8');
console.log('Saved clean_root_markup.html! Length:', rootClean.length);
