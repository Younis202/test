const fs = require('fs');
const path = require('path');

const harPath = path.join(__dirname, 'm.facebook.com.har');
const har = JSON.parse(fs.readFileSync(harPath, 'utf8'));

const outDir = path.join(__dirname, 'extracted');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const subdirs = ['html', 'css', 'js', 'images', 'fonts', 'data', 'all'];
subdirs.forEach(sd => {
  const p = path.join(outDir, sd);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const extractedFiles = [];

har.log.entries.forEach((entry, idx) => {
  const req = entry.request;
  const res = entry.response;
  const url = req.url;
  const mime = (res.content?.mimeType || 'application/octet-stream').toLowerCase();
  const text = res.content?.text;
  const encoding = res.content?.encoding;

  let ext = '';
  let category = 'data';

  if (mime.includes('html')) {
    category = 'html';
    ext = '.html';
  } else if (mime.includes('css')) {
    category = 'css';
    ext = '.css';
  } else if (mime.includes('javascript') || mime.includes('x-javascript')) {
    category = 'js';
    ext = '.js';
  } else if (mime.includes('image/webp')) {
    category = 'images';
    ext = '.webp';
  } else if (mime.includes('image/png')) {
    category = 'images';
    ext = '.png';
  } else if (mime.includes('image/gif')) {
    category = 'images';
    ext = '.gif';
  } else if (mime.includes('image/jpeg') || mime.includes('image/jpg')) {
    category = 'images';
    ext = '.jpg';
  } else if (mime.includes('image/svg')) {
    category = 'images';
    ext = '.svg';
  } else if (mime.includes('font') || mime.includes('woff2') || mime.includes('woff')) {
    category = 'fonts';
    ext = '.woff2';
  } else if (mime.includes('json')) {
    category = 'data';
    ext = '.json';
  } else {
    category = 'data';
    ext = '.txt';
  }

  // Derive a friendly filename from URL
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (e) {
    parsedUrl = { pathname: `entry_${idx}`, hostname: 'unknown' };
  }
  let baseName = path.basename(parsedUrl.pathname);
  if (!baseName || baseName === '/' || baseName === '') {
    baseName = `index_${idx}`;
  }
  // Remove invalid filename characters
  baseName = baseName.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  if (!baseName.includes('.')) {
    baseName += ext;
  }

  const uniqueFileName = `${String(idx).padStart(2, '0')}_${baseName}`;
  const catFilePath = path.join(outDir, category, uniqueFileName);

  let buffer;
  if (text !== undefined && text !== null) {
    if (encoding === 'base64') {
      buffer = Buffer.from(text, 'base64');
    } else {
      buffer = Buffer.from(text, 'utf8');
    }
    fs.writeFileSync(catFilePath, buffer);
  } else {
    // Empty content (e.g. tracking requests)
    buffer = Buffer.alloc(0);
    fs.writeFileSync(catFilePath, buffer);
  }

  extractedFiles.push({
    index: idx,
    url: url,
    method: req.method,
    status: res.status,
    mimeType: mime,
    category: category,
    filename: uniqueFileName,
    relativePath: path.relative(__dirname, catFilePath).replace(/\\/g, '/'),
    sizeBytes: buffer.length,
    originalSize: res.content?.size,
    encoding: encoding || 'utf-8'
  });
});

fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify({ totalEntries: extractedFiles.length, files: extractedFiles }, null, 2),
  'utf8'
);

console.log(`Successfully extracted all ${extractedFiles.length} files into ${outDir}`);

// Breakdown summary
const counts = {};
extractedFiles.forEach(f => {
  counts[f.category] = (counts[f.category] || 0) + 1;
});
console.log('Category breakdown:', counts);
