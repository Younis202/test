const fs = require('fs');
const path = require('path');

const harPath = path.join(__dirname, 'm.facebook.com.har');
console.log('Reading HAR file...');
const harData = JSON.parse(fs.readFileSync(harPath, 'utf8'));

const entries = harData.log.entries;
console.log(`Total entries: ${entries.length}`);

const summary = entries.map((entry, idx) => {
  const req = entry.request;
  const res = entry.response;
  return {
    index: idx,
    method: req.method,
    url: req.url,
    status: res.status,
    mimeType: res.content ? res.content.mimeType : 'none',
    size: res.content ? res.content.size : 0,
    hasText: !!(res.content && res.content.text),
    encoding: res.content ? res.content.encoding : null,
  };
});

fs.writeFileSync('har_summary.json', JSON.stringify(summary, null, 2), 'utf8');

const mimeCounts = {};
summary.forEach(s => {
  const mime = (s.mimeType || 'unknown').split(';')[0].trim();
  mimeCounts[mime] = (mimeCounts[mime] || 0) + 1;
});

console.log('MIME type counts:', mimeCounts);
console.log('\nFirst 20 URLs:');
summary.slice(0, 20).forEach(s => console.log(`[${s.index}] ${s.method} ${s.status} ${s.mimeType} -> ${s.url}`));
