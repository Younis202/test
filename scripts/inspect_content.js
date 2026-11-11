const fs = require('fs');
const s38 = fs.readFileSync('script_38.js', 'utf8');

const match = s38.match(/bigPipe\.onPageletArrive\(([\s\S]*)\)\s*;\s*\}\)\);?/);
if (match) {
  const obj = eval('(' + match[1] + ')');
  const content = obj.content;
  console.log('content keys:', Object.keys(content));
  const val = content['37543afb-04ee-4acf-914b-4e2d9a3d7a4f'];
  console.log('val type:', typeof val, 'keys:', Object.keys(val));
  fs.writeFileSync('s38_content.json', JSON.stringify(val, null, 2), 'utf8');
  console.log('Wrote s38_content.json!');
}
