const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('pages_data.json', 'utf8'));

// 1. Extract Gallery
const galleryPage = pages.find(p => p.slug === 'galleri');
const imageRegex = /!\[image\]\((.*?)\)/g;
let match;
const galleryImages = [];
while ((match = imageRegex.exec(galleryPage.content)) !== null) {
  galleryImages.push(match[1]);
}

// 2. Extract Services
const servicesPage = pages.find(p => p.slug === 'om-meg');
// Text looks like:
// # Tenestene våre
// UT Å FLY
// Skal du ut å fly så køyrer me og til og i frå Flesland Lufthavn. Ring eller send oss ein mail for meir informasjon og fastpris.
// RULLESTOL
// Voss Taxi har ein variert bilpark...
// ...
const services = [
  {
    title: 'UT Å FLY',
    description: 'Skal du ut å fly så køyrer me og til og i frå Flesland Lufthavn. Ring eller send oss ein mail for meir informasjon og fastpris.',
    capacity: '1-16 passasjerar',
  },
  {
    title: 'RULLESTOL',
    description: 'Voss Taxi har ein variert bilpark med plass til samanleggbare rullestolar, men ved behov for å ha med elektrisk rullestol, eller behov for å sitte i rullestolen under transport har me to 16 setar MaxiTaxiar med plass til 2 brukarar samtidig. Samt 3 stk 8 setar rullestolbil, alle med rampe for lett ombordstigning.',
    capacity: 'Inntil 2 rullestolar',
  },
  {
    title: 'HITTEGODS',
    description: 'Har du mista noko? Ta kontakt med oss. Me får stadig inn mobilar, hanskar, huer, vesker, briller, skjerf og paraplyar. Alle gjenstandar som vert funne i våre bilar vert bevart på sentralen vår.',
  },
  {
    title: 'BORN I BIL',
    description: 'Me har barnestolar med IsoFix og støttebase for born i alle aldrar. I tillegg har me eit breitt utval i belteputer og beltestolar.',
  },
  {
    title: 'SYKKEL?',
    description: 'Me har og moglegheit for å ta med sykkel. Vennligst opplys om dette på førehand, så tek me med oss stativ.',
  },
  {
    title: 'FØRARHUND',
    description: 'Alle våre bilar og sjåførar tar med seg hund.',
  }
];

let fallbackCode = fs.readFileSync('src/content/fallback.ts', 'utf8');

// Replace originalGalleryImages
const galleryTs = `const originalGalleryImages = [\n` + galleryImages.map((img, i) => `  ['Voss Taxi Bilde ${i+1}', 'Galleri Bilde ${i+1}', '${img}'],`).join('\n') + `\n]\n`;
fallbackCode = fallbackCode.replace(/const originalGalleryImages = \[[\s\S]*?\] as const\n/, galleryTs + '\n');

// Replace services
const servicesTs = `services: [\n` + services.map((s, i) => `      {
        id: 'service-no-${i+1}',
        locale: 'no',
        title: '${s.title}',
        description: '${s.description}',
        capacity: '${s.capacity || ''}',
        sort: ${i+1},
      },`).join('\n') + `\n    ],`;

fallbackCode = fallbackCode.replace(/services: \[[\s\S]*?\],\n\s+fares:/, servicesTs + '\n    fares:');

fs.writeFileSync('src/content/fallback.ts', fallbackCode);
console.log('Successfully updated fallback.ts with zip data!');
