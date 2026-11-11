const fs = require('fs');
const dom = fs.readFileSync('complete_live_dom.html', 'utf8');

const modalIdx = dom.indexOf('aria-modal="true"');
if (modalIdx !== -1) {
  console.log('Modal chunk:');
  console.log(dom.substring(modalIdx - 100, modalIdx + 1500));
} else {
  console.log('No aria-modal found');
}
