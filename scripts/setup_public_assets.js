const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('extracted/manifest.json', 'utf8'));

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy every asset into public/ matching its URL pathname
manifest.files.forEach(f => {
  try {
    const parsed = new URL(f.url);
    let relPath = parsed.pathname;
    if (relPath.startsWith('/')) relPath = relPath.substring(1);
    
    // Target file in public
    const targetFile = path.join(publicDir, relPath);
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const sourceFile = path.join(__dirname, f.relativePath);
    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, targetFile);
      // Also copy to root of public using base name for convenience
      const baseName = path.basename(parsed.pathname);
      const rootCopy = path.join(publicDir, baseName);
      if (!fs.existsSync(rootCopy)) {
        fs.copyFileSync(sourceFile, rootCopy);
      }
    }
  } catch (e) {}
});

console.log('Finished populating public/ directory with exact asset paths.');
