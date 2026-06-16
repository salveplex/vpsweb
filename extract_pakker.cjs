const cp = require('child_process');
const fs = require('fs');

const oldFallback = cp.execSync('git show HEAD~1:src/content/fallback.ts').toString();
const pakkerBlock = oldFallback.split("id: 'page-pakker-no'")[1].split("id: 'page-")[0];

// The pakkerBlock is everything after `id: 'page-pakker-no'` up to the next `id: 'page-`.
// We need to reconstruct the CmsPage object.
const reconstructed = `  {
    id: 'page-pakker-no'${pakkerBlock.trim().replace(/,\s*$/, '')}
  }`;

let modern = fs.readFileSync('src/content/modern.ts', 'utf8');

// Insert it into the modernPages array. 
// Just replace `export const modernPages: CmsPage[] = [` with `export const modernPages: CmsPage[] = [\n` + reconstructed + `,`

modern = modern.replace('export const modernPages: CmsPage[] = [', 'export const modernPages: CmsPage[] = [\n' + reconstructed + ',');

fs.writeFileSync('src/content/modern.ts', modern, 'utf8');
console.log('Pakker injected into modern.ts');
