const fs = require('fs');

let code = fs.readFileSync('src/content/fallback.ts', 'utf-8');

const extraPagesStr = `
      {
        id: 'historia-var-no',
        locale: 'no',
        slug: 'historia-var',
        title: 'Historia vår',
        eyebrow: 'Om Voss Taxi',
        summary: 'Så litt av historia til Voss Taxi. Gamle arkiv og bilder eksisterar det forbausande lite av i dag.',
        blocks: [
          {
            type: 'rich_text',
            body: \`Så litt av historia til Voss Taxi. Gamle arkiv og bilder eksisterar det forbausande lite av i dag. Men etter all sannsynligheit har det nok vore drosjevirksomhet på Voss i over 100 år om ikkje lenger, Soga tyder at Voss Drosjeeigarlag blei stifta 10 februar 1930. Her er det litt uklart kvar dei var stasjonerte, men etter det me klarar å tyda ut ifrå gamle møtereferat er at dei heldt til ved fiskatorget, og seinare bak Voss bokhandel. Store delar av historia til laget gjekk tapt under bombinga av Vossevangen under andre verdenskrig.

![Historisk bilde Voss Taxi](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/image.jpg?etag=%22958b-5f037053%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=512%2B288&extract=0%2B0%2B413%2B288&quality=85)

Etter krigen gjekk drosjeeigarlaget saman med Voss lastebilforening om ein avtale med Norsk Brenselsolje (BP) i dag Statoil om ein eigen bensintank mot at dei fylte eksklusivt ved denne. I avtalen vart det også ordna med husrom for drosjesjåførane i form av ei brakke som dei fekk av BP. Brakka vart plassert på Hestavangen tidlig på 50 talet. Men ut i frå gamle bilder kan det sjå ut til at dei allereie var på Hestavangen kring 1937.

![Historisk bilde 2 Voss Taxi](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/IMG_20200706_0003.jpg?etag=%22b21ec-5f037055%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=872%2B589&extract=0%2B0%2B869%2B589&quality=85)

På sekstitalet freista dokter Bonsaksen å byggja helsehus på tomta der drosjene heldt til. Det vart då ein klausul i kjøpskontrakta med Kommunen at sjåførane burde få nytta første etasje når nybygget stod ferdigt.

Det var då i 1968 at brakka blei flytta vestover på plassen, der den framleis står den dag i dag. Dette skulle væra ei mellombels flytting inntil nytt husvære var ferdig. Men når bygget var ferdig og klart for innflytting ville det visa seg for drosjene at lokala ikkje var eigna nok, det var alt for stort og husleiga ville verta for høg, med tanke på dei betalte pr kvadrat. Tidlegare hadde BP vore med å haldt husvære for sjåførane men dei meinte at denne auken i husleige vart urimeleg i så måte. Det var og planar i dei dagar om underjordisk toalett fasilitetar med drosjene oppå denne. Men dette vart det heller aldri noko av.

Så etter ei lengre behandlingstid og fleire brev mellom kommune, drosjene, dr Bonsaksen m.m så glei heile hus spørsmålet ut i det blå og sjåførane vart værande i bua heilt fram til vinteren 2014. Då fekk dei endeleg koma heimat, som dei seier. Der dei var i frå starten og der dei var opprinneleg lova nytt husly.

![Historisk bilde 3 Voss Taxi](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1594033487309-3673ee32-eb67-4713-8214-ebb1da48e841.jpg?etag=%22b11b9-5f037056%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=959%2B634&extract=0%2B0%2B959%2B520&quality=85)

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
            body: \`Voss Taxi SA skal utføre transporten med rutebiler, drosjer, turbiler og andre lovlige transportmidler i samsvar med gjeldende lover, forskrifter og konsesjonsvilkår.

Kunden plikter å rette seg etter sjåførens anvisninger, og skal opptre på en slik måte at transporten kan utføres sikkert og uten sjenanse for andre passasjerer. Kjøretøyet skal forlates i samme stand som ved reisens begynnelse.

Voss Taxi SA fraskriver seg ethvert ansvar for forsinkelser som skyldes forhold utenfor vår kontroll, slik som vær, føre, trafikkork eller lignende.

Erstatningsansvaret er begrenset i henhold til gjeldende lover og internasjonale konvensjoner.\`
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
            body: \`Ditt personvern er viktig for oss. Denne personvernerklæringen forklarer hvordan vi samler inn og bruker personopplysninger.

Vi samler inn personopplysninger du gir til oss, som navn og kontaktinformasjon, for å kunne levere våre tjenester til deg.

Vi deler ikke dine personopplysninger med tredjeparter, med mindre det er nødvendig for å levere våre tjenester eller det kreves av loven.

Du har rett til å be om innsyn i, retting eller sletting av dine personopplysninger. Kontakt oss for å utøve disse rettighetene.\`
          }
        ]
      }`;

// Find index of the end of the pages array for the 'no' locale
const servicesIdx = code.indexOf('services: [');
// Find the preceding `    ],`
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

// Now remove the nav links from fallback.ts
code = code.replace(/\\{ id: 'nav-historia-var-no'.*?\\n/g, '');
code = code.replace(/\\{ id: 'nav-transportvilkar-no'.*?\\n/g, '');
code = code.replace(/\\{ id: 'nav-personvern-no'.*?\\n/g, '');

fs.writeFileSync('src/content/fallback.ts', code);
console.log('Done!');
