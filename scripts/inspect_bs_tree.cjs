const fs = require('fs');

const bloksPayload = JSON.parse(fs.readFileSync('bottom_sheet_bloks.json', 'utf8'));

// Let's inspect the tree
console.log('Tree structure:');
fs.writeFileSync('bottom_sheet_tree.json', JSON.stringify(bloksPayload.tree, null, 2), 'utf8');

// Also check embedded payloads and props
if (bloksPayload.props) {
  fs.writeFileSync('bottom_sheet_props.json', JSON.stringify(bloksPayload.props, null, 2), 'utf8');
}
if (bloksPayload.data) {
  fs.writeFileSync('bottom_sheet_data.json', JSON.stringify(bloksPayload.data, null, 2), 'utf8');
}
console.log('Saved bottom_sheet_tree.json, props, data');
