const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

// Read all_computed_styles.css
const computedStyles = fs.readFileSync('all_computed_styles.css', 'utf8');

// Also include any extra styles from extracted/css/*.css if missing
const extraCss = [];
const cssDir = path.join(__dirname, 'extracted', 'css');
fs.readdirSync(cssDir).forEach(f => {
  extraCss.push(`/* --- ${f} --- */\n` + fs.readFileSync(path.join(cssDir, f), 'utf8'));
});

const combinedCss = `/* Facebook Mobile Styles - Exact & Frozen from HAR */
${extraCss.join('\n\n')}

/* Dynamically Generated Computed & WebBloks Styles */
${computedStyles}

/* Additional Reset & Mobile Responsive Freeze */
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #1c2b33;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

/* Ensure mobile container fills nicely on desktop preview while staying 100% authentic mobile */
.fb-mobile-wrapper {
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
}
`;

fs.writeFileSync(path.join(srcDir, 'facebook.css'), combinedCss, 'utf8');
console.log('Created src/facebook.css! Size:', combinedCss.length);
