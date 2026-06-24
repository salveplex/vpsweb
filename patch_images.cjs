const fs = require('fs');
const path = require('path');

let rawUploads = fs.readFileSync('uploads.txt', 'utf8').replace(/\0/g, '');
const uploads = rawUploads.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('thumbnail_') && !l.startsWith('small_') && !l.startsWith('medium_') && !l.startsWith('large_'));

const map = {};
for (const file of uploads) {
  const m = file.match(/^(.*?)_[a-f0-9]{10}\.[a-zA-Z]+$/);
  if (m) {
    map[m[1]] = file;
  } else {
    const nameWithoutExt = file.substring(0, file.lastIndexOf('.'));
    map[nameWithoutExt] = file;
  }
}

const looseMatch = (filename) => {
  filename = decodeURIComponent(filename);
  let base = filename.replace(/\.[^/.]+$/, "");
  
  if (map[base]) return map[base];
  
  base = base.replace(/[^a-zA-Z0-9]/g, '_');
  for (const [key, val] of Object.entries(map)) {
    if (key.replace(/[^a-zA-Z0-9]/g, '_') === base) return val;
  }

  for (const [key, val] of Object.entries(map)) {
    if (key.includes(base) || base.includes(key)) return val;
  }
  
  for (const file of uploads) {
    if (file.toLowerCase().includes(base.toLowerCase())) return file;
  }
  
  return null;
}

const filesToPatch = [
  'src/content/fallback.ts',
  'src/content/modern.ts',
  'src/content/modernEn.ts',
  'src/content/extraEn.ts'
];

for (const filePath of filesToPatch) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /https:\/\/impro\.usercontent\.one\/appid\/oneComWsb\/domain\/vosstaxi\.no\/media\/vosstaxi\.no\/onewebmedia\/([^\?\"\'\)]+)(\?[^\'\"\)]*)?/g;
  
  content = content.replace(regex, (match, filename, qs) => {
    const matchedFile = looseMatch(filename);
    if (matchedFile) {
      console.log(`Replaced ${filename} -> ${matchedFile}`);
      return `https://cms.vosstaxi.no/uploads/${matchedFile}`;
    } else {
      console.log(`Warning: No match found for ${filename}`);
      return match;
    }
  });
  
  fs.writeFileSync(filePath, content);
}
console.log('Patching complete!');
