const fs = require('fs');
const css = fs.readFileSync('all_computed_styles.css', 'utf8');

const wbloksRules = css.split('\n').filter(l => l.includes('.wbloks_'));
console.log('Total wbloks class rules:', wbloksRules.length);
wbloksRules.slice(0, 30).forEach(r => console.log(r));
