import fs from 'fs';

let code = fs.readFileSync('src/content/fallback.ts', 'utf-8');

const hist = fs.readFileSync('historia.txt', 'utf-8');
const vilk = fs.readFileSync('vilkar.txt', 'utf-8');
const pers = fs.readFileSync('personvern.txt', 'utf-8');

const pages = [
  { slug: 'historia-var', title: 'Historia vår', text: hist },
  { slug: 'transportvilkar', title: 'Transportvilkår', text: vilk },
  { slug: 'personvern', title: 'Personvern', text: pers }
];

let extraPagesStr = '';
for (const p of pages) {
  const jsonText = JSON.stringify(p.text);
  extraPagesStr += `,
      {
        id: '${p.slug}-no',
        locale: 'no',
        slug: '${p.slug}',
        title: '${p.title}',
        eyebrow: 'Voss Taxi SA',
        summary: '${p.title} for Voss Taxi SA.',
        blocks: [
          {
            type: 'rich_text',
            title: '${p.title}',
            body: ${jsonText}
          }
        ]
      }`;
}

// We want to insert right before `    ],\n    fares: [` for the `no` locale.
// Let's use a regex replace.
code = code.replace(/      \},\n    \],\n    fares: \[/, "      }" + extraPagesStr + "\n    ],\n    fares: [");

const extraNavStr = `
      { id: 'nav-historia-var-no', locale: 'no', label: 'Historia vår', href: '/no/historia-var', sort: 11 },
      { id: 'nav-transportvilkar-no', locale: 'no', label: 'Transportvilkår', href: '/no/transportvilkar', sort: 12 },
      { id: 'nav-personvern-no', locale: 'no', label: 'Personvern', href: '/no/personvern', sort: 13 },`;

// insert into navigation array for 'no' locale
code = code.replace("      { id: 'nav-ris-ros-no', locale: 'no', label: 'Ris & Ros', href: '/no/ris-ros', sort: 10 },\n    ],", 
                    "      { id: 'nav-ris-ros-no', locale: 'no', label: 'Ris & Ros', href: '/no/ris-ros', sort: 10 }," + extraNavStr + "\n    ],");

const oldBlocks = `          {
            type: 'rich_text',
            title: 'Bestill via App',
            body: '### Snappy Taxi\\n\\n[![Last ned i App Store](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![Få den på Google Play](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\\n\\n### Bestill Taxi i VY appen\\n\\n[![Last ned i App Store](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![Få den på Google Play](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
          },
          {
            type: 'cta',
            title: 'Bestill med telefon eller kalkulator',
            body: 'Ring sentralen, eller sjekk pris i kalkulatoren før turen.',
            href: settings.booking_url,
            label: 'Bestill taxi',
          },`;

const newBlocks = `          {
            type: 'rich_text',
            title: 'Tryggleik i fokus',
            body: 'Målet vårt er at du skal kunna føla deg trygg og ivaretatt når du sitt på med oss. Me har profesjonelle og erfarne sjåførar og tilsette. Samstundes som alle bilane våre har:\\n\\n- Taksameter (TDS - Transport Data Systems)\\n- Betalingsterminalar (Ingenico) for kortbetaling og TT\\n- Minimum Euro6 motorar\\n- Heil elektriske bilar\\n- Periodiske køyretøykontrollar kvart år (PKK)\\n- Drosjeforsikring\\n- Løyvegaranti\\n- Godkjend barnesikringsutstyr\\n- Førstehjelpskurs\\n- Gyldig Køyreseddel\\n- Taushetsavtalar\\n- Kompetansekrav (Løyvekurs)\\n- Glattkøyringskurs\\n- Lampe på taket\\n- Logo & Løyvenummer'
          },`;

code = code.replace(oldBlocks, newBlocks);

fs.writeFileSync('src/content/fallback.ts', code);
console.log('Done!');
