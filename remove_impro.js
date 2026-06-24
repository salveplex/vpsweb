const Database = require('better-sqlite3');
const db = new Database('./.tmp/data.db');

const pages = db.prepare("SELECT id, content FROM pages WHERE content LIKE '%impro.usercontent.one%'").all();
const stmt = db.prepare('UPDATE pages SET content = ? WHERE id = ?');

let updated = 0;
for (const page of pages) {
  if (!page.content) continue;
  
  // Replace markdown images that contain impro.usercontent.one
  // e.g. ![image](https://impro.usercontent.one/...)
  let newContent = page.content.replace(/!\[.*?\]\([^)]*impro\.usercontent\.one[^)]*\)\n*/g, '');

  if (newContent !== page.content) {
    stmt.run(newContent, page.id);
    updated++;
  }
}
console.log(`Removed impro images from ${updated} pages`);
