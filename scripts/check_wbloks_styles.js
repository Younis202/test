const fs = require('fs');
const dom = fs.readFileSync('rendered_dom.html', 'utf8');

// Find all style tags in rendered_dom
const styleTags = [...dom.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
console.log('Total style tags in rendered_dom:', styleTags.length);
styleTags.forEach((st, idx) => {
  console.log(`Style ${idx} length: ${st.length}, snippet: ${st.substring(0, 150).replace(/\n/g, ' ')}`);
  if (st.includes('wbloks')) {
    console.log(`  -> Style ${idx} contains wbloks! Length: ${st.length}`);
    fs.writeFileSync(`wbloks_style_${idx}.css`, st, 'utf8');
  }
});

// Also check extracted CSS files for wbloks
const cssDir = 'extracted/css';
fs.readdirSync(cssDir).forEach(cf => {
  const c = fs.readFileSync(`${cssDir}/${cf}`, 'utf8');
  if (c.includes('wbloks')) {
    console.log(`Extracted CSS ${cf} contains wbloks! Length: ${c.length}`);
  }
});
