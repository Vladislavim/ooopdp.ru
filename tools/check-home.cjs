const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const sections = [...html.matchAll(/<section[^>]*class=["']([^"']*)["']/g)].map(m => m[1]);
console.log('Sections:', sections);
