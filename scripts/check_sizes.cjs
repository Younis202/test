const fs = require('fs');

['m-eF6r5Wlln.webp', '5yjMTAfnv98.webp', 'd73UG10vgxw.webp', 'aU5Ji88A7zq.webp', 'wMyrLGPYKPq.webp'].forEach(img => {
  const stat = fs.statSync(`public/${img}`);
  console.log(`${img}: ${stat.size} bytes`);
});
