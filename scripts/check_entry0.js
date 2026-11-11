const fs = require('fs');
const har = JSON.parse(fs.readFileSync('m.facebook.com.har', 'utf8'));
const entry0 = har.log.entries[0];

console.log('Status:', entry0.response.status);
console.log('Mime:', entry0.response.content.mimeType);
console.log('Size:', entry0.response.content.size);
const html = entry0.response.content.text;

fs.writeFileSync('page_0.html', html, 'utf8');
console.log('Saved page_0.html. Length:', html.length);

// Let's check other html entries
har.log.entries.forEach((e, idx) => {
  if (e.response.content && e.response.content.mimeType && e.response.content.mimeType.includes('html')) {
    console.log(`[${idx}] ${e.request.url} -> content size: ${e.response.content.size}, text length: ${(e.response.content.text || '').length}`);
  }
});
