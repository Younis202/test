const fs = require('fs');
const path = require('path');

function cssStringToJsxStyle(cssStr) {
  if (!cssStr || !cssStr.trim()) return '{}';
  const declarations = cssStr.split(';').map(d => d.trim()).filter(Boolean);
  const obj = {};
  declarations.forEach(decl => {
    const colonIdx = decl.indexOf(':');
    if (colonIdx === -1) return;
    const prop = decl.substring(0, colonIdx).trim();
    let val = decl.substring(colonIdx + 1).trim();
    
    // convert kebab-case to camelCase
    let camelProp = prop;
    if (prop.startsWith('-webkit-')) {
      camelProp = 'Webkit' + prop.substring(8).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    } else if (prop.startsWith('-ms-')) {
      camelProp = 'ms' + prop.substring(4).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    } else if (!prop.startsWith('--')) {
      camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }
    
    // Unescape &quot; to "
    val = val.replace(/&quot;/g, '"');
    
    obj[camelProp] = val;
  });
  return JSON.stringify(obj, null, 2);
}

console.log('Testing style conversion:');
console.log(cssStringToJsxStyle('mask-image: url(&quot;/rsrc.php/yw/r/gLamC64FCJF.webp&quot;); background-color: rgb(0, 100, 224); -webkit-tap-highlight-color: transparent;'));
