const http = require('http');

const urls = [
  '/rsrc.php/yw/r/gLamC64FCJF.webp',
  '/rsrc.php/yt/r/DUiOg0mJTjz.webp',
  '/rsrc.php/y8/r/XpWPmzCEVDS.webp',
  '/rsrc.php/yQ/r/WJI0PrMp5z2.webp',
  '/rsrc.php/ys/r/RkrEdst9VSp.webp',
  '/rsrc.php/y-/r/d73UG10vgxw.webp',
  '/rsrc.php/yt/r/m-eF6r5Wlln.webp',
  '/rsrc.php/yJ/r/5yjMTAfnv98.webp',
  '/rsrc.php/yt/r/aU5Ji88A7zq.webp',
  '/rsrc.php/yr/r/wMyrLGPYKPq.webp'
];

urls.forEach(u => {
  http.get('http://localhost:5174' + u, res => {
    console.log(`${u} -> ${res.statusCode} ${res.headers['content-type']} (${res.headers['content-length']}b)`);
  });
});
