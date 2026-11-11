const fs = require('fs');
const html = fs.readFileSync('page_0.html', 'utf8');

console.log('HTML length:', html.length);
const titleMatch = html.match(/<title>(.*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'no title');

// Check css links in html
const cssLinks = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(m => m[1]);
console.log('CSS links in HTML:', cssLinks);

// Check inline styles
const inlineStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1].length);
console.log('Inline style tags count:', inlineStyles.length, 'sizes:', inlineStyles);

// Check script src
const scriptSrcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]);
console.log('Script srcs count:', scriptSrcs.length);

// Check images in HTML
const imgSrcs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
console.log('Img srcs in HTML count:', imgSrcs.length);
imgSrcs.forEach(src => console.log(' - img:', src));

// Check body classes and root id
const bodyMatch = html.match(/<body([^>]*)>/i);
console.log('Body tag:', bodyMatch ? bodyMatch[0] : 'no body');
