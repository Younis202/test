function cssStringToJsxObject(cssStr) {
  if (!cssStr || !cssStr.trim()) return {};
  // First unescape HTML entities
  const unescaped = cssStr.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  
  // Split declarations carefully avoiding semicolons inside quotes or urls
  const decls = [];
  let current = '';
  let inQuote = false;
  let quoteChar = '';
  for (let i = 0; i < unescaped.length; i++) {
    const ch = unescaped[i];
    if ((ch === '"' || ch === "'") && unescaped[i - 1] !== '\\') {
      if (!inQuote) {
        inQuote = true;
        quoteChar = ch;
      } else if (ch === quoteChar) {
        inQuote = false;
      }
      current += ch;
    } else if (ch === ';' && !inQuote) {
      if (current.trim()) decls.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) decls.push(current.trim());

  const obj = {};
  decls.forEach(decl => {
    const colonIdx = decl.indexOf(':');
    if (colonIdx === -1) return;
    const prop = decl.substring(0, colonIdx).trim();
    let val = decl.substring(colonIdx + 1).trim();
    
    let camelProp = prop;
    if (prop.startsWith('-webkit-')) {
      camelProp = 'Webkit' + prop.substring(8).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    } else if (prop.startsWith('-ms-')) {
      camelProp = 'ms' + prop.substring(4).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    } else if (!prop.startsWith('--')) {
      camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }
    obj[camelProp] = val;
  });
  return obj;
}

const res = cssStringToJsxObject('mask-image: url("/rsrc.php/yw/r/gLamC64FCJF.webp"); background-color: rgb(0, 100, 224); -webkit-tap-highlight-color: transparent;');
console.log(JSON.stringify(res, null, 2));
