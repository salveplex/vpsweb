const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = 'd:/AI/antigravity/vpsweb/www2_extracted/Hjem';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const pages = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const $ = cheerio.load(content);
  
  let markdown = '';
  
  // To avoid hidden or duplicate mobile elements, we'll try to just grab unique texts.
  const seenTexts = new Set();

  $('h1, h2, h3, h4, p, img').each((i, el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'img') {
        const src = $(el).attr('src');
        if (src && !src.includes('logo') && !src.includes('icon')) {
            // some one.com images have huge srcset/data URIs, let's keep it simple
            if (!seenTexts.has(src)) {
                markdown += `\n![image](${src})\n\n`;
                seenTexts.add(src);
            }
        }
    } else {
        const text = $(el).text().trim();
        if (text && text.length > 2 && !seenTexts.has(text)) {
            seenTexts.add(text);
            if (tag === 'h1') markdown += `# ${text}\n\n`;
            else if (tag === 'h2') markdown += `## ${text}\n\n`;
            else if (tag === 'h3') markdown += `### ${text}\n\n`;
            else if (tag === 'h4') markdown += `#### ${text}\n\n`;
            else markdown += `${text}\n\n`;
        }
    }
  });

  const title = file.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const slug = file.replace('.html', '');

  pages.push({
    title,
    slug,
    content: markdown
  });
}

fs.writeFileSync('d:/AI/antigravity/vpsweb/pages_data.json', JSON.stringify(pages, null, 2));
console.log(`Parsed ${pages.length} pages.`);
