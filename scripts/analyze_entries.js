const fs = require('fs');
const path = require('path');

const har = JSON.parse(fs.readFileSync('m.facebook.com.har', 'utf8'));
const entries = har.log.entries;

console.log(`Analyzing ${entries.length} entries for extraction...`);

const report = entries.map((e, i) => {
  const url = e.request.url;
  const mime = e.response.content?.mimeType || 'unknown';
  const size = e.response.content?.size || 0;
  const encoding = e.response.content?.encoding;
  const hasText = !!(e.response.content?.text);
  const textLen = (e.response.content?.text || '').length;
  return { i, method: e.request.method, status: e.response.status, url, mime, size, encoding, hasText, textLen };
});

console.log(JSON.stringify(report.filter(r => r.hasText), null, 2));
console.log('Entries with text count:', report.filter(r => r.hasText).length);
console.log('Entries without text count:', report.filter(r => !r.hasText).length);
