const fs = require('fs');
const css = fs.readFileSync('all_computed_styles.css', 'utf8');

['128', '129', '131', '133', '134', '107', '108', '109', '110', '111', '112', '113'].forEach(num => {
  const line = css.split('\n').find(l => l.includes(`.wbloks_${num}`));
  console.log(`.wbloks_${num}:`, line);
});
