const fs = require('fs');
let code = fs.readFileSync('src/content/fallback.ts', 'utf8');

const slugMap = {
  'services': 'tenester',
  'fares': 'takstar',
  'gallery': 'galleri',
  'contact': 'kontakt',
  'wheelchair': 'rullestol',
  'general-information': 'ris-ros',
  'transport-terms': 'transportvilkar',
  'person': 'personvern',
  'about': 'om-oss'
};

for (const [oldSlug, newSlug] of Object.entries(slugMap)) {
  code = code.replace(new RegExp(`slug: '${oldSlug}'`, 'g'), `slug: '${newSlug}'`);
  code = code.replace(new RegExp(`href: '/en/${oldSlug}'`, 'g'), `href: '/en/${newSlug}'`);
}

fs.writeFileSync('src/content/fallback.ts', code);
