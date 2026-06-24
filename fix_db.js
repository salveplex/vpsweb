const Database = require('better-sqlite3');
const db = new Database('./.tmp/data.db');

const pages = db.prepare("SELECT id, content, title FROM pages WHERE locale='no' OR locale IS NULL").all();
const stmt = db.prepare('UPDATE pages SET content = ?, title = ? WHERE id = ?');

let updated = 0;
for (const page of pages) {
  let newContent = page.content || '';
  let newTitle = page.title || '';
  
  const replacements = [
    [/\buten\b/g, 'utan'],
    [/\bUten\b/g, 'Utan'],
    [/\bvalg\b/g, 'val'],
    [/\bValg\b/g, 'Val'],
    [/\bkjørereglene\b/g, 'køyrereglane'],
    [/\bKjørereglene\b/g, 'Køyrereglane'],
    [/\bestiller\b/g, 'tinger'],
    [/\bestilling\b/g, 'tinging'],
    [/\bestille\b/g, 'tinge'],
    [/\bestill\b/g, 'ting'],
    [/\bBestill\b/g, 'Ting'],
    [/\bBestilling\b/g, 'Tinging'],
    [/\btilbyr\b/g, 'byr på'],
    [/\bTilbyr\b/g, 'Byr på'],
    [/\bHistorien\b/g, 'Historia'],
    [/\bhistorien\b/g, 'historia'],
  ];

  for (const [regex, repl] of replacements) {
    newContent = newContent.replace(regex, repl);
    newTitle = newTitle.replace(regex, repl);
  }

  if (newContent !== page.content || newTitle !== page.title) {
    stmt.run(newContent, newTitle, page.id);
    updated++;
  }
}
console.log(`Updated ${updated} pages`);
