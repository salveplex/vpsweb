const fs = require('fs');

let code = fs.readFileSync('src/content/fallback.ts', 'utf-8');

// The pristine fallback.ts from Git only has 'home'.
// It lacks 'historia-var', 'transportvilkar', 'personvern'.

const personvernText = fs.readFileSync('personvern_clean.txt', 'utf-8').replace(/\uFFFD/g, 'æ').replace(/A\uFFFD/g, 'å').replace(/A,\uFFFD/g, 'ø').replace(/A\uFFFD/g, 'æ');
const vilkarText = fs.readFileSync('vilkar_fixed.txt', 'utf-8').replace(/\uFFFD/g, 'æ').replace(/A\uFFFD/g, 'å').replace(/A,\uFFFD/g, 'ø').replace(/A\uFFFD/g, 'æ');

const extraPagesStr = `
      {
        id: 'historia-var-no',
        locale: 'no',
        slug: 'historia-var',
        title: 'Historia vår',
        eyebrow: 'Om Voss Taxi',
        summary: 'Sjå litt av historia til Voss Taxi. Gamle arkiv og bilder eksisterar det forbausande lite av i dag.',
        blocks: [
          {
            type: 'rich_text',
            body: \`Sjå litt av historia til Voss Taxi. Gamle arkiv og bilder eksisterar det forbausande lite av i dag. Men etter all sannsynligheit har det nok vore drosjevirksomhet på Voss i over 100 år om ikkje lenger, Soga tyder at Voss Drosjeeigarlag blei stifta 10 februar 1930. Her er det litt uklart kvar dei var stasjonerte, men etter det me klarar å tyda ut ifrå gamle møtereferat er at dei heldt til ved fiskatorget, og seinare bak Voss bokhandel. Store delar av historia til laget gjekk tapt under bombinga av Vossevangen under andre verdenskrig.

![Historisk bilde Voss Taxi](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/image.jpg?etag=%22958b-5f037053%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio)

Etter krigen gjekk drosjeeigarlaget saman med Voss lastebilforening om ein avtale med Norsk Brenselsolje (BP) i dag Statoil om ein eigen bensintank mot at dei fylte eksklusivt ved denne. I avtalen vart det også ordna med husrom for drosjesjåførane i form av ei brakke som dei fekk av BP. Brakka vart plassert på Hestavangen tidlig på 50 talet. Men ut i frå gamle bilder kan det sjå ut til at dei allereie var på Hestavangen kring 1937.

![Historisk bilde 2 Voss Taxi](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/IMG_20200706_0003.jpg?etag=%22b21ec-5f037055%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio)

På sekstitalet freista dokter Bonsaksen å byggja helsehus på tomta der drosjene heldt til. Det vart då ein klausul i kjøpskontrakta med Kommunen at sjåførane burde få nytta første etasje når nybygget stod ferdigt.

Det var då i 1968 at brakka blei flytta vestover på plassen, der den framleis står den dag i dag. Dette skulle vera ei mellombels flytting inntil nytt husvære var ferdig. Men når bygget var ferdig og klart for innflytting ville det visa seg for drosjene at lokala ikkje var eigna nok, det var alt for stort og husleiga ville verta for høg, med tanke på dei betalte pr kvadrat. Tidlegare hadde BP vore med å haldt husvære for sjåførane men dei meinte at denne auken i husleige vart urimeleg i så måte. Det var og planar i dei dagar om underjordisk toalett fasilitetar med drosjene oppå denne. Men dette vart det heller aldri noko av.

Så etter ei lengre behandlingstid og fleire brev mellom kommune, drosjene, dr Bonsaksen m.m så glei heile hus spørsmålet ut i det blå og sjåførane vart verande i bua heilt fram til vinteren 2014. Då fekk dei endeleg koma heimat, som dei seier. Der dei var ifrå starten og der dei var opprinneleg lova nytt husly.

![Historisk bilde 3 Voss Taxi](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1594033487309-3673ee32-eb67-4713-8214-ebb1da48e841.jpg?etag=%22b11b9-5f037056%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio)

**Tidslinje:**
- 1930 – ca. 1950 Voss Drosjeeigarlag
- 1950 – 2014 Drosjebilsentralen/Voss Drosjebilsentral
- 2014 - Voss Taxi SA

Voss Taxi fyller 90 år 10 februar 2020.\`
          }
        ]
      },
      {
        id: 'transportvilkar-no',
        locale: 'no',
        slug: 'transportvilkar',
        title: 'Transportvilkår',
        summary: 'Våre transportvilkår og retningslinjer',
        blocks: [
          {
            type: 'rich_text',
            body: \`${vilkarText.replace(/`/g, '\\`')}\`
          }
        ]
      },
      {
        id: 'personvern-no',
        locale: 'no',
        slug: 'personvern',
        title: 'Personvern',
        summary: 'Vår personvernerklæring',
        blocks: [
          {
            type: 'rich_text',
            body: \`${personvernText.replace(/`/g, '\\`')}\`
          }
        ]
      }`;

// Find index of the end of the pages array for the 'no' locale
const servicesIdx = code.indexOf('services: [');
const endOfPagesIdx = code.lastIndexOf('    ],', servicesIdx);

if (endOfPagesIdx !== -1) {
  const lastBraceIdx = code.lastIndexOf('}', endOfPagesIdx);
  if (lastBraceIdx !== -1) {
    code = code.substring(0, lastBraceIdx) + '},' + code.substring(lastBraceIdx + 1, endOfPagesIdx) + extraPagesStr + '\n' + code.substring(endOfPagesIdx);
  }
}

// Do it for the 'en' locale too
const lastServicesIdx = code.lastIndexOf('services: [');
const lastEndOfPagesIdx = code.lastIndexOf('    ],', lastServicesIdx);
if (lastEndOfPagesIdx !== -1 && lastEndOfPagesIdx !== endOfPagesIdx) {
  const lastBraceIdx = code.lastIndexOf('}', lastEndOfPagesIdx);
  if (lastBraceIdx !== -1) {
    code = code.substring(0, lastBraceIdx) + '},' + code.substring(lastBraceIdx + 1, lastEndOfPagesIdx) + extraPagesStr.replace(/-no/g, '-en').replace(/locale: 'no'/g, "locale: 'en'") + '\n' + code.substring(lastEndOfPagesIdx);
  }
}

// Now remove the nav links from fallback.ts (top menu links for 'historia-var', etc.)
code = code.replace(/\{\s*id:\s*'[a-zA-Z0-9-]+',\s*locale:\s*'(no|en)',\s*label:\s*'(Historia vår|Our History|Transportvilkår|Terms & Conditions|Personvern|Privacy Policy)',\s*value:\s*'\/[a-z]+\/(historia-var|transportvilkar|personvern)',\s*sort:\s*\d+\s*\},?/g, '');

fs.writeFileSync('src/content/fallback.ts', code);
console.log('Pages injected with proper UTF-8!');
