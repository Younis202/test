const fs = require('fs');
const dom = fs.readFileSync('rendered_dom.html', 'utf8');

const start = dom.indexOf('<div id="root_0_0_8y">');
if (start !== -1) {
  // Find the end of this div or extract a large chunk
  const end = dom.indexOf('<div style="display:none"></div><span><img src="/security/hsts-pixel.gif"', start);
  const chunk = end !== -1 ? dom.substring(start, end) : dom.substring(start);
  fs.writeFileSync('rendered_root.html', chunk, 'utf8');
  console.log('Saved rendered_root.html, length:', chunk.length);
} else {
  console.log('root_0_0_8y not found');
}
