const fs = require('fs');

const pages = JSON.parse(fs.readFileSync('pages_data.json', 'utf8'));

// Slug mappings
const slugMap = {
  'nyheter-og-praktisk-informasjon': 'bli-sjafor',
  'om-meg': 'tenester'
};

const newPages = pages
  .filter(p => !['om-meg', 'galleri', 'kontakt'].includes(p.slug)) // Skip ones that use special components that don't need markdown text
  .map(p => {
    const slug = slugMap[p.slug] || p.slug;
    
    // We only need the text blocks for these pages.
    // Let's create a single rich_text block for the entire content.
    const content = p.content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');

    return `
      {
        id: 'page-${slug}-no',
        locale: 'no',
        slug: '${slug}',
        title: '${p.title}',
        eyebrow: 'Voss Taxi SA',
        summary: '',
        blocks: [
          {
            type: 'rich_text',
            title: '${p.title}',
            body: \`${content}\`
          }
        ]
      }`;
  });

let fallbackCode = fs.readFileSync('src/content/fallback.ts', 'utf8');

const anchor = "        slug: 'ris-ros',\n        eyebrow: 'Ris og ros',\n        title: 'Send oss ris, ros eller klage.',\n        summary: 'Tilbakemeldingar hjelper oss å gjere tenesta betre.',\n        blocks: [],\n      },";

const insertionPoint = fallbackCode.indexOf(anchor);

if (insertionPoint !== -1) {
  const newPagesStr = ',' + newPages.join(',') + '\n';
  const pos = insertionPoint + anchor.length;
  fallbackCode = fallbackCode.slice(0, pos) + newPagesStr + fallbackCode.slice(pos);
  fs.writeFileSync('src/content/fallback.ts', fallbackCode);
  console.log('Successfully injected pages into fallback.ts!');
} else {
  console.error('Could not find insertion point.');
}
