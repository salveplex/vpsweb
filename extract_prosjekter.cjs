const fs = require('fs');

const html = fs.readFileSync('prosjekter2.html', 'utf-8');

let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let content = bodyMatch ? bodyMatch[1] : html;

content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');

// remove hidden things or non text things
content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                 .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

// find all images
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let match;
const images = [];
while ((match = imgRegex.exec(content)) !== null) {
  images.push(match[1]);
}

let text = content.replace(/<[^>]+>/g, '\n')
                 .replace(/\n\s+\n/g, '\n')
                 .replace(/\n+/g, '\n');

fs.writeFileSync('prosjekter_extracted.txt', text.trim() + '\n\nImages:\n' + images.join('\n'));
