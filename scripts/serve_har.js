const http = require('http');
const fs = require('fs');
const path = require('path');
const urlParser = require('url');

const har = JSON.parse(fs.readFileSync('m.facebook.com.har', 'utf8'));

// Build a map of clean path / URL to entry
const entriesByUrl = new Map();
const entriesByPath = new Map();

har.log.entries.forEach(entry => {
  const u = entry.request.url;
  entriesByUrl.set(u, entry);
  try {
    const parsed = new URL(u);
    entriesByPath.set(parsed.pathname, entry);
    // Also without /rsrc.php/v5/...
    const base = path.basename(parsed.pathname);
    entriesByPath.set('/' + base, entry);
  } catch (e) {}
});

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  const parsed = urlParser.parse(reqUrl);
  const pathname = parsed.pathname;

  console.log(`[REQ] ${req.method} ${pathname}`);

  // Handle root -> entry 0
  if (pathname === '/' || pathname === '/index.html') {
    const entry0 = har.log.entries[0];
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // Let's replace absolute fbcdn URLs with local URLs
    let html = entry0.response.content.text;
    html = html.replace(/https:\/\/z-m-static\.xx\.fbcdn\.net/g, '');
    html = html.replace(/https:\/\/static\.xx\.fbcdn\.net/g, '');
    html = html.replace(/https:\/\/m\.facebook\.com/g, '');
    html = html.replace(/https:\/\/facebook\.com/g, '');
    res.end(html);
    return;
  }

  // Look up entry by pathname or base filename
  let entry = entriesByPath.get(pathname);
  if (!entry) {
    const base = path.basename(pathname);
    entry = entriesByPath.get('/' + base);
  }

  if (entry && entry.response.content) {
    const content = entry.response.content;
    const mime = content.mimeType || 'application/octet-stream';
    const encoding = content.encoding;
    let body;

    if (content.text) {
      if (encoding === 'base64') {
        body = Buffer.from(content.text, 'base64');
      } else {
        let text = content.text;
        // In JS / CSS, rewrite fbcdn URLs to relative
        if (mime.includes('javascript') || mime.includes('css')) {
          text = text.replace(/https:\/\/z-m-static\.xx\.fbcdn\.net/g, '');
          text = text.replace(/https:\/\/static\.xx\.fbcdn\.net/g, '');
          text = text.replace(/https:\/\/m\.facebook\.com/g, '');
        }
        body = Buffer.from(text, 'utf8');
      }
    } else {
      body = Buffer.alloc(0);
    }

    res.writeHead(entry.response.status || 200, {
      'Content-Type': mime,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(body);
  } else {
    // 200 empty for tracking or missing
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    res.end('');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('HAR replay server listening on http://127.0.0.1:3000');
});
