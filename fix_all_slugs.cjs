const fs = require('fs');

const fixSlugs = (filename, map) => {
  let code = fs.readFileSync(filename, 'utf8');
  for (const [oldSlug, newSlug] of Object.entries(map)) {
    code = code.replace(new RegExp(`slug: '${oldSlug}'`, 'g'), `slug: '${newSlug}'`);
  }
  fs.writeFileSync(filename, code);
};

fixSlugs('src/content/modernDe.ts', {
  'pakete': 'pakker',
  'uber-uns': 'om-oss',
  'dienstleistungen': 'tenester',
  'fahrer-werden': 'bli-sjafor',
  'galerie': 'galleri'
});

fixSlugs('src/content/modernFr.ts', {
  'forfaits': 'pakker',
  'a-propos': 'om-oss',
  'services': 'tenester',
  'devenir-chauffeur': 'bli-sjafor',
  'contact': 'kontakt',
  'galerie': 'galleri'
});

fixSlugs('src/content/modernEs.ts', {
  'paquetes': 'pakker',
  'sobre-nosotros': 'om-oss',
  'servicios': 'tenester',
  'convertirse-en-conductor': 'bli-sjafor',
  'contacto': 'kontakt',
  'galeria': 'galleri'
});

// For fallback files too!
fixSlugs('src/content/fallbackDe.ts', {
  'dienstleistungen': 'tenester',
  'fares': 'takstar',
  'galerie': 'galleri',
  'kontakt': 'kontakt'
});

fixSlugs('src/content/fallbackFr.ts', {
  'services': 'tenester',
  'fares': 'takstar',
  'galerie': 'galleri',
  'contact': 'kontakt'
});

fixSlugs('src/content/fallbackEs.ts', {
  'servicios': 'tenester',
  'fares': 'takstar',
  'galeria': 'galleri',
  'contacto': 'kontakt'
});

