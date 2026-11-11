const http = require('http');

function check(url) {
  http.get(url, res => {
    console.log(`${url} -> status: ${res.statusCode}, contentType: ${res.headers['content-type']}, length: ${res.headers['content-length']}`);
  }).on('error', e => console.error(url, e.message));
}

check('http://localhost:5174/rsrc.php/yT/r/aU5Ji88A7zq.webp');
check('http://localhost:5174/aU5Ji88A7zq.webp');
check('http://localhost:5174/rsrc.php/y-/r/d73UG10vgxw.webp');
check('http://localhost:5174/rsrc.php/yt/r/m-eF6r5Wlln.webp');
check('http://localhost:5174/rsrc.php/yJ/r/5yjMTAfnv98.webp');
check('http://localhost:5174/rsrc.php/yr/r/wMyrLGPYKPq.webp');
