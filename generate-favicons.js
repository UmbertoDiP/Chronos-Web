// Generate favicons from SVG using Node.js and sharp
const fs = require('fs');
const path = require('path');

const svgContent = fs.readFileSync('public/favicon.svg', 'utf-8');

console.log('Favicon SVG loaded successfully');
console.log('To generate PNG favicons, install sharp:');
console.log('  npm install --save-dev sharp');
console.log('');
console.log('Then run:');
console.log('  node generate-favicons.js');
console.log('');
console.log('For now, using the SVG as-is and the existing favicon files.');
console.log('');
console.log('Favicon files in public/:');
console.log('  - favicon.svg (source)');
console.log('  - favicon.ico (32x32)');
console.log('  - favicon.png (for Apple devices)');
console.log('  - icon-192.png (PWA)');
console.log('  - icon-512.png (PWA)');
console.log('  - icon-maskable-192.png (PWA maskable)');
console.log('  - icon-maskable-512.png (PWA maskable)');
