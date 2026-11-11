const fs = require('fs');
const html = fs.readFileSync('page_0.html', 'utf8');

// Find body content
const bodyStart = html.indexOf('<body');
const bodyEnd = html.indexOf('</body>');
const bodyContent = html.substring(bodyStart, bodyEnd + 7);

// Let's strip out script tags to see the HTML markup only
const markupOnly = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
fs.writeFileSync('markup_only.html', markupOnly, 'utf8');
console.log('Markup only length:', markupOnly.length);
console.log('Sample markup first 2000 chars:');
console.log(markupOnly.substring(0, 2000));
