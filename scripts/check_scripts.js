const fs = require('fs');
const html = fs.readFileSync('page_0.html', 'utf8');

// Search for BigPipe, handleServerJS, or JSON payloads
const scriptMatches = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('Total inline scripts:', scriptMatches.length);

scriptMatches.forEach((s, idx) => {
  console.log(`Script ${idx} length: ${s.length}, snippet: ${s.substring(0, 100).replace(/\n/g, ' ')}`);
  if (s.includes('require(') || s.includes('bigPipe') || s.includes('ScheduledServerJS') || s.includes('handleServerJS') || s.includes('login') || s.includes('Bloks') || s.includes('root')) {
    console.log(`   -> contains key terms! Length: ${s.length}`);
  }
});
