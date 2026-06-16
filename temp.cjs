const fs = require('fs');
const f = fs.readFileSync('prosjekt.html', 'utf-8');
const imgs = [...f.matchAll(/<img[^>]*src=["']([^"']+)["']/g)];
console.log(imgs.map(m => m[1]).join('\n'));
