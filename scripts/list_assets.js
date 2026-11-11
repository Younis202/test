const fs = require('fs');
const har = JSON.parse(fs.readFileSync('m.facebook.com.har', 'utf8'));

const assets = [];
har.log.entries.forEach((e, i) => {
  const mime = e.response.content?.mimeType || '';
  if (mime.includes('image') || mime.includes('font') || mime.includes('css')) {
    assets.push({
      index: i,
      url: e.request.url,
      mime: mime,
      size: e.response.content?.size,
      encoding: e.response.content?.encoding,
      hasText: !!e.response.content?.text
    });
  }
});

console.log(`Found ${assets.length} assets (images, fonts, css):`);
assets.forEach(a => console.log(`[${a.index}] ${a.mime} (${a.size}b, enc: ${a.encoding}) -> ${a.url}`));
