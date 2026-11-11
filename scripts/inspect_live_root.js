const fs = require('fs');
const dom = fs.readFileSync('complete_live_dom.html', 'utf8');

// Find all elements inside root_0_0_8y
const rootIdx = dom.indexOf('id="root_0_0_8y"');
const afterRoot = dom.substring(rootIdx);

// Check if there are modals / bottom sheets / overlays
console.log('DOM length:', dom.length);

// Let's find all text nodes in root
const rootHtml = afterRoot.substring(0, afterRoot.indexOf('</body>'));
fs.writeFileSync('live_root_content.html', rootHtml, 'utf8');

console.log('Wrote live_root_content.html, length:', rootHtml.length);
