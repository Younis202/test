const fs = require('fs');
const s34 = fs.readFileSync('script_34.js', 'utf8');
const s38 = fs.readFileSync('script_38.js', 'utf8');

function inspectPayload(str, name) {
  console.log(`=== Inspecting ${name} ===`);
  const match = str.match(/bigPipe\.onPageletArrive\(([\s\S]*)\)\s*;\s*\}\)\);?/);
  if (match) {
    try {
      const obj = eval('(' + match[1] + ')');
      console.log('Keys:', Object.keys(obj));
      console.log('id:', obj.id);
      console.log('phase:', obj.phase);
      if (obj.content) {
        console.log('content keys:', Object.keys(obj.content));
        for (let k in obj.content) {
          console.log(`  content[${k}] length:`, (obj.content[k] || '').length);
          fs.writeFileSync(`${name}_content_${k}.html`, obj.content[k], 'utf8');
        }
      }
      if (obj.jsmods) {
        console.log('jsmods keys:', Object.keys(obj.jsmods));
        if (obj.jsmods.instances) console.log('instances count:', obj.jsmods.instances.length);
        if (obj.jsmods.define) console.log('define count:', obj.jsmods.define.length);
        if (obj.jsmods.require) console.log('require count:', obj.jsmods.require.length);
      }
      return obj;
    } catch (e) {
      console.error('Eval error:', e);
    }
  } else {
    console.log('No match for bigPipe.onPageletArrive');
  }
}

inspectPayload(s34, 's34');
const obj38 = inspectPayload(s38, 's38');
if (obj38 && obj38.jsmods) {
  fs.writeFileSync('s38_jsmods.json', JSON.stringify(obj38.jsmods, null, 2), 'utf8');
}
