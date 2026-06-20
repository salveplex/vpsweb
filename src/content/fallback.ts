import type { SiteData } from '../types'

const settings = {
  site_name: 'Voss Taxi',
  phone: '+4756511340',
  phone_display: '56 51 13 40',
  email: 'post@vosstaxi.no',
  address: 'Uttrågata 19, 5700 Voss, Norway',
  booking_url: 'https://web-page-voss-taxi.vercel.app/no',
  fare_calculator_url: 'http://voss-taxi-kalkulator.vercel.app',
  facebook_url: 'https://facebook.com/vosstaxi.no/',
  instagram_url: 'https://instagram.com/vosstaxi/',
  map_url:
    'https://www.google.com/maps/search/?api=1&query=%22Voss%20Taxi%20SA%2C%20Uttr%C3%A5gata%2019%2C%205700%20Voss%2C%20Norway%22',
  app_store_url: 'https://apps.apple.com/no/app/snappy-taxi/id6479620974',
  play_store_url: 'https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no',
  hero_media:
    'https://cms.vosstaxi.no/uploads/20240522_130220_bbadf2752f.jpg',
}

const originalGalleryImages = [
  ['Voss Taxi Bilde 2', 'Galleri Bilde 2', 'https://cms.vosstaxi.no/uploads/1714421291589_b408a586ac.jpg'],
  ['Voss Taxi Bilde 4', 'Galleri Bilde 4', 'https://cms.vosstaxi.no/uploads/4_Desember_fb18e187fb.jpg'],
  ['Voss Taxi Bilde 5', 'Galleri Bilde 5', 'https://cms.vosstaxi.no/uploads/7_Desember_fecd5997fd.jpg'],
  ['Voss Taxi Bilde 6', 'Galleri Bilde 6', 'https://cms.vosstaxi.no/uploads/2_Desember_16b4855560.jpg'],
  ['Voss Taxi Bilde 8', 'Galleri Bilde 8', 'https://cms.vosstaxi.no/uploads/1714421291597_067d74b5e4.jpg'],
  ['Voss Taxi Bilde 9', 'Galleri Bilde 9', 'https://cms.vosstaxi.no/uploads/19_Desember_b5ea82f757.jpeg'],
  ['Voss Taxi Bilde 10', 'Galleri Bilde 10', 'https://cms.vosstaxi.no/uploads/image0000001002_c7c2fd8637.jpg'],
  ['Voss Taxi Bilde 11', 'Galleri Bilde 11', 'https://cms.vosstaxi.no/uploads/15_Desember_e18f147802.jpg'],
  ['Voss Taxi Bilde 12', 'Galleri Bilde 12', 'https://cms.vosstaxi.no/uploads/Osa_2774ae3d20.jpg'],
  ['Voss Taxi Bilde 14', 'Galleri Bilde 14', 'https://cms.vosstaxi.no/uploads/IMG_6539_dc892c6e66.jpg'],
  ['Voss Taxi Bilde 35', 'Galleri Bilde 35', 'https://cms.vosstaxi.no/uploads/20240507_190114_d3b10c61fc.jpg'],
  ['Voss Taxi Bilde 36', 'Galleri Bilde 36', 'https://cms.vosstaxi.no/uploads/20240507_190102_709f18b705.jpg'],
  ['Voss Taxi Bilde 38', 'Galleri Bilde 38', 'https://cms.vosstaxi.no/uploads/20240507_190046_7854c924a7.jpg'],
  ['Voss Taxi Bilde 40', 'Galleri Bilde 40', 'https://cms.vosstaxi.no/uploads/20240501_185013_b80c0cda68.jpg'],
  ['Voss Taxi Bilde 41', 'Galleri Bilde 41', 'https://cms.vosstaxi.no/uploads/20240501_185146_8d69714689.jpg'],
  ['Voss Taxi Bilde 43', 'Galleri Bilde 43', 'https://cms.vosstaxi.no/uploads/20240501_185206_b79896aa21.jpg'],
  ['Voss Taxi Bilde 44', 'Galleri Bilde 44', 'https://cms.vosstaxi.no/uploads/20240501_185210_f57fa1dd8b.jpg'],
  ['Voss Taxi Bilde 45', 'Galleri Bilde 45', 'https://cms.vosstaxi.no/uploads/Bergo_i_ulvik_4031876385.jpg'],
  ['Voss Taxi Bilde 48', 'Galleri Bilde 48', 'https://cms.vosstaxi.no/uploads/160_1_b16fd0b4a4.jpg'],
  ['Voss Taxi Bilde 49', 'Galleri Bilde 49', 'https://cms.vosstaxi.no/uploads/160_3_e018af40c0.jpg'],
  ['Voss Taxi Bilde 50', 'Galleri Bilde 50', 'https://cms.vosstaxi.no/uploads/20180523_114411_9c70d2a165.jpg'],
  ['Voss Taxi Bilde 51', 'Galleri Bilde 51', 'https://cms.vosstaxi.no/uploads/20161005_160420_8c95d25793.jpg'],
  ['Voss Taxi Bilde 52', 'Galleri Bilde 52', 'https://cms.vosstaxi.no/uploads/160_5_3bfafaf73b.jpg'],
  ['Voss Taxi Bilde 53', 'Galleri Bilde 53', 'https://cms.vosstaxi.no/uploads/20180618_212754_6a44b65cee.jpg'],
  ['Voss Taxi Bilde 54', 'Galleri Bilde 54', 'https://cms.vosstaxi.no/uploads/20180523_211231_265f67da83.jpg'],
  ['Voss Taxi Bilde 55', 'Galleri Bilde 55', 'https://cms.vosstaxi.no/uploads/20180623_214725_33b00f00aa.jpg'],
  ['Voss Taxi Bilde 56', 'Galleri Bilde 56', 'https://cms.vosstaxi.no/uploads/20180623_214654_fe447de56a.jpg'],
  ['Voss Taxi Bilde 57', 'Galleri Bilde 57', 'https://cms.vosstaxi.no/uploads/20180623_214643_eaeeae1ed1.jpg'],
  ['Voss Taxi Bilde 58', 'Galleri Bilde 58', 'https://cms.vosstaxi.no/uploads/20180623_214845_19fb76c84f.jpg'],
  ['Voss Taxi Bilde 59', 'Galleri Bilde 59', 'https://cms.vosstaxi.no/uploads/20180711_081817_a00d81288d.jpg'],
  ['Voss Taxi Bilde 60', 'Galleri Bilde 60', 'https://cms.vosstaxi.no/uploads/20180623_214951_730c917b88.jpg'],
  ['Voss Taxi Bilde 62', 'Galleri Bilde 62', 'https://cms.vosstaxi.no/uploads/20180627_120309_09fd628e5a.jpg'],
  ['Voss Taxi Bilde 64', 'Galleri Bilde 64', 'https://cms.vosstaxi.no/uploads/20180820_124336_f5493340fa.jpg'],
  ['Voss Taxi Bilde 65', 'Galleri Bilde 65', 'https://cms.vosstaxi.no/uploads/20180716_133738_76af7f0d1e.jpg'],
  ['Voss Taxi Bilde 66', 'Galleri Bilde 66', 'https://cms.vosstaxi.no/uploads/20180715_000941_3d0ae27a51.jpg'],
  ['Voss Taxi Bilde 68', 'Galleri Bilde 68', 'https://cms.vosstaxi.no/uploads/20180820_124458_56fb61303c.jpg'],
  ['Voss Taxi Bilde 69', 'Galleri Bilde 69', 'https://cms.vosstaxi.no/uploads/20180820_124520_3a9a79cf5f.jpg'],
  ['Voss Taxi Bilde 71', 'Galleri Bilde 71', 'https://cms.vosstaxi.no/uploads/20200531_042738_da124eacd3.jpg'],
  ['Voss Taxi Bilde 73', 'Galleri Bilde 73', 'https://cms.vosstaxi.no/uploads/R_40_Stalheim_e5b208bc00.jpg'],
  ['Voss Taxi Bilde 75', 'Galleri Bilde 75', 'https://cms.vosstaxi.no/uploads/subb_b1cc73e67b.jpg'],
  ['Voss Taxi Bilde 76', 'Galleri Bilde 76', 'https://cms.vosstaxi.no/uploads/r_161_1_cdae0df338.png'],
  ['Voss Taxi Bilde 77', 'Galleri Bilde 77', 'https://cms.vosstaxi.no/uploads/r_160_1_4a3a5599f2.jpg'],
]


const norwegianGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image], index) => ({
  id: `gallery-original-no-${index + 1}`,
  locale: 'no',
  title,
  alt,
  image,
  sort: index + 1,
}))

const englishGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image], index) => ({
  id: `gallery-original-en-${index + 1}`,
  locale: 'en',
  title,
  alt,
  image,
  sort: index + 1,
}))

export const fallbackByLocale: Record<'no' | 'en', SiteData> = {
  no: {
    settings,
    source: 'fallback',
    navigation: [
      { id: 'nav-home', locale: 'no', label: 'Heim', href: '/', sort: 1 },
      { id: 'nav-om-oss', locale: 'no', label: 'Om Oss', href: '/om-oss', sort: 2 },
      { id: 'nav-services', locale: 'no', label: 'Tenester', href: '/tenester', sort: 3 },
      { id: 'nav-pakker', locale: 'no', label: 'Pakker', href: '/pakker', sort: 4 },
      { id: 'nav-maxi-taxi', locale: 'no', label: 'Maxi Taxi', href: '/maxi-taxi', sort: 6 },
      { id: 'nav-bli-sjafor', locale: 'no', label: 'Bli sjåfør', href: '/bli-sjafor', sort: 7 },
      { id: 'nav-gallery', locale: 'no', label: 'Galleri', href: '/galleri', sort: 8 },
      { id: 'nav-ris-ros', locale: 'no', label: 'Ris og Ros', href: '/ris-ros', sort: 9 },
      { id: 'nav-contact', locale: 'no', label: 'Kontakt', href: '/kontakt', sort: 10 },
    ],
    pages: [
      {
        id: 'home-no',
        locale: 'no',
        slug: 'home',
        eyebrow: 'Lokalt taxiselskap på Voss',
        title: 'Trygt fram på Voss, døgnet rundt.',
        summary:
          'Voss Taxi køyrer personbil, storbil, maxi-taxi, minibuss og rullestolbil for lokale, tilreisande og faste transportoppdrag.',
        hero_image: settings.hero_media,
        blocks: [
          {
            type: 'rich_text',
            title: 'Voss Taxi',
            body: 'Me har bilar til alle typar oppdrag og hjelper deg trygt frå tog, hotell, hytte, fjell og arrangement.',
          },
          {
            type: 'rich_text',
            title: 'Bestill via App',
            body: '### Snappy Taxi\n\n[![Last ned i App Store](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![Få den på Google Play](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Bestill Taxi i VY appen\n\n[![Last ned i App Store](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![Få den på Google Play](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
          },
          {
            type: 'cta',
            title: 'Bestill med telefon eller kalkulator',
            body: 'Ring sentralen, eller sjekk pris i kalkulatoren før turen.',
            href: settings.booking_url,
            label: 'Bestill taxi',
          },
        ],
      },
      {
        id: 'services-no',
        locale: 'no',
        slug: 'tenester',
        eyebrow: 'Tenester',
        title: 'Bilar til alle typar oppdrag.',
        summary:
          'Frå korte turar i sentrum til større grupper, rullestoltransport og førehandsbestilte oppdrag.',
        blocks: [],
      },
      {
        id: 'fares-no',
        locale: 'no',
        slug: 'takstar',
        eyebrow: 'Takstar',
        title: 'Tydelege takstar og rask prisoversikt.',
        summary: 'Bruk kalkulatoren for estimat, eller kontakt sentralen for turar som krev planlegging.',
        blocks: [],
      },
      {
        id: 'gallery-no',
        locale: 'no',
        slug: 'galleri',
        eyebrow: 'Galleri',
        title: 'Voss Taxi i kvardagen.',
        summary: 'Eit lite utval frå bilar, oppdrag og transportmiljøet på Voss.',
        blocks: [],
      },
      {
        id: 'contact-no',
        locale: 'no',
        slug: 'kontakt',
        eyebrow: 'Kontakt',
        title: 'Ta kontakt med Voss Taxi.',
        summary: 'Sentralen er klar for bestillingar, spørsmål om oppdrag og praktisk informasjon.',
        blocks: [],
      },
      {
        id: 'wheelchair-no',
        locale: 'no',
        slug: 'rullestol',
        eyebrow: 'Rullestol',
        title: 'Rullestolbil og tilrettelagt transport.',
        summary: 'Ta kontakt for planlegging av trygg og praktisk transport med rullestolbil.',
        blocks: [],
      },
      {
        id: 'feedback-no',
        locale: 'no',
        slug: 'ris-ros',
        title: 'Ris og Ros',
        blocks: [
          {
            type: 'rich_text',
            title: 'Ris og Ros',
            body: 'Her kan du sende formelle klager, eller ros til oss.\n\n## Send klage\n\nVisst du ynskjer å retta ein formell klage, skal denne framsettast skriftleg ved å nytte vala nedanfor, eller på e-post til post@vosstaxi.no.\nMe sender deg innan 14 dagar ein skriftleg beskjed på at klagen er motteken, og informasjon om forventa behandlingstid.\n\nFormelle klagar vil besvarast skriftleg. Dokumentasjon vedrørande klagen oppbevarast hjå oss i tre år etter at klagebehandlinga er avslutta.\n\n## Gje oss ros eller ris\n\nMe ønskjer dine synspunkt, tilbakemeldingar og tips til forbetringar. Det er den beste hjelpen du kan gje oss i arbeidet med å verta endå betre.'
          },
          {
            type: 'cta',
            title: 'Klage på sjåfør',
            body: 'Ynskjer du å sende ein klage på ein av våre sjåførar.',
            href: 'mailto:post@vosstaxi.no?subject=Klage%20på%20sjåfør',
            label: 'Send klage'
          },
          {
            type: 'cta',
            title: 'Klage utført oppdrag',
            body: 'Ynskjer du å klage på eit oppdrag me har utført.',
            href: 'mailto:post@vosstaxi.no?subject=Klage%20utført%20oppdrag',
            label: 'Send klage'
          },
          {
            type: 'cta',
            title: 'Generelle klager',
            body: 'Har du andre generelle klager på våre tenester.',
            href: 'mailto:post@vosstaxi.no?subject=Generell%20klage',
            label: 'Send klage'
          },
          {
            type: 'cta',
            title: 'Ros',
            body: 'Me set stor pris på ros når du har hatt ein god oppleving med oss!',
            href: 'mailto:post@vosstaxi.no?subject=Ros%20til%20Voss%20Taxi',
            label: 'Send ros'
          },
          {
            type: 'cta',
            title: 'Generell informasjon',
            body: 'Reglar, rettar og generell informasjon om taxi/drosje.',
            href: '/generell-informasjon',
            label: 'Les meir'
          }
        ],
      },
      {
        id: 'page-maxi-taxi-no',
        locale: 'no',
        slug: 'maxi-taxi',
        title: 'Maxi Taxi',
        eyebrow: 'Voss Taxi',
        summary: '',
        blocks: [
          {
            type: 'rich_text',
            title: 'Maxi Taxi',
            body: `### Rullestolbil og Maxi-Taxi 🚐

**Voss Taxi har lang erfaring med pasient- og rullestoltransport. Vi utfører rullestoloppdrag dagleg og er ein trygg transportpartnar i heile regionen.**

Alle våre lokalkjende sjåførar er opplærte og godkjende for å handtere ulike typar rullestolbrukarar. Vi har alltid fullt fokus på passasjerane sin sikkerheit og komfort under heile transporten. 

Me utfører kvart år eit stort tal transportar for Helse Bergen, og har mange års erfaring med å frakta passasjerar med behov for spesiell assistanse. Dette gjer oss til ein naturleg og profesjonell transportpartnar også for private omsorgsinstitusjonar, eldresenter, og andre som treng sikker transport av eldre og rørslehemma.

> 📞 **Vi er tilgjengelege kvar dag – heile året.**
> Ring (+47) 93 24 98 44 eller send ein e-post til maxi@vosstaxi.no

---

### Vår bilpark for rullestoltransport ♿

Vi har per dags dato:
- **2 minibussar** spesialtilpassa for å ta med éin eller to rullestolar
- **3 stk 8-seters rullestolbilar**, alle utstyrte med trygge og solide ramper for lett og behageleg ombordstiging

Her kan du sjå eit par av bilane våre i teneste:

![Maxi Taxi bil](https://cms.vosstaxi.no/uploads/DJI_0168_af2b600165.JPG)

![Rullestolbil rampe](https://cms.vosstaxi.no/uploads/20240514_203506_53aa74368f.jpg)

---
`
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
            body: `Transportvilkår

Utarbeidet av Norges Taxiforbund 2000

§ 1 Transportvilkårenes anvendelse
Transportvilkårene er avtalevilkår mellom den reisende og taxifører. På alle forhold som ikke er regulert her, kommer norsk lov til anvendelse.

§ 2 Bestilling av taxi
Ved bestilling av taxi gjennom sentral eller ved telefonbestilling direkte til holdeplass, skal bestiller gi relevante opplysninger som måtte være nødvendig for oppdragets utførelse. Dersom det kreves særskilt utrustet kjøretøy, utvidet setekapasitet eller særlig utstyr (spesialtransport), skal bestiller opplyse dette.

Om bestillingen gjelder f. eks. flere enn fire passasjerer og det viser seg at det faktiske behov er redusert, regnes godtgjørelse og lignende i henhold til bestillingen.

§ 3 Bruk av holdeplass. Fortrinnsrett til taxi.
Ved kø på holdeplass, skal taxifører kjøre den reisende som står for tur. Syke, uføre og personer med småbarn har fortrinnsrett til taxi. For øvrig gjelder de av myndighetene fastsatte bestemmelser om fortrinnsrett til taxi.

Reisende fra holdeplass er fortrinnsberettiget til ledig taxi. Publikum på holdeplass henvises til første ledige taxi, men de har selv rett til å velge taxi. Taxier som eventuelt står foran i køen, må om nødvendig flyttes for å gi plass til utkjøring.

Ved påstigning skal den reisende oppgi sitt reisemål, om eventuell annen oppgjørsform enn kontant betaling og eventuelle andre forhold av betydning for oppdragets utførelse.

§ 4 Praiing utenom holdeplass.
Når taxi er ledig, skal taxifører sørge for at lediglampe er tent og synlig for publikum. Utenfor en avstand fra nærmeste holdeplass, angitt i sentralens kjørereglement/sjåførinstruks, kan fører plukke opp reisende som gir tydelige tegn, så sant stans og påstigning kan skje innenfor rammen av gjeldende trafikkregler og uten hinder for øvrig trafikk.

§ 5 Taxiførers rett til å avvise turer
Taxifører kan avvise ruset person, reisende som opptrer truende eller personer som av andre årsaker taxifører finner saklig grunn til å avvise.

Den reisende har rett til å medbringe førerhund.

Dersom person avvises, kan taxifører kreve godtgjørelse i samsvar med taksameterets pålydende.

§ 6 Oppdragets utførelse
En taxifører skal følge den kjørerute som tar kortest tid til bestemmelsesstedet, hvis den reisende ikke bestemmer noe annet.

Taxifører plikter etter anmodning på samme turen å kjøre passasjerer til forskjellige steder (kombinering av tur). Hvis ikke annet er avtalt, er sist avstigende passasjer ansvarlig for betaling av turen

Ansvar for påbudt bruk av bilbelte og eventuelt at barnesete er forsvarlig festet, følger veitrafikklovens bestemmelser.

Person som trenger assistanse fra taxi til inngangsdør eller lignende, kan anmode om bistand. Bistand taxifører yter passasjeren, etter dennes ønske, til, fra eller utenfor transportmidlet skjer for passasjerens risiko.

Under turen skal fører og passasjer opptre slik at det ikke oppstår fare for medtrafikanter, bagasje, bil og utstyr. Røyking i taxi er forbudt.

Førers bruk av mobiltelefon, dataterminal og lignende under oppdrag skal skje i henhold til sentralens reglement. Bilradio kan benyttes etter den reisendes samtykke.

Taxifører kan kreve forhåndsbetaling for turen.

§ 7 Ventetid, avbrudd og forsinkelser
Ved henting av passasjer og under kjøring plikter taxifører å vente i et tidsintervall som fremgår av kjørereglement/sjåførinstruks, hvis ikke annet er avtalt. For spesielle kjøreoppdrag av typen legekjøring, bryllup, barnedåp og begravelse følger ventetid av oppdragets art.

Ved forhåndsbestilt taxi gjelder at faktisk fremmøte kan avvike fra avtalt fremmøtetidspunkt med et tidsintervall som er angitt i sentralens kjørereglement/sjåførinstruks.

Må en tur avbrytes på grunn av feil med kjøretøyet, har taxifører ikke krav på betaling for den utførte kjøring, hvis han ikke innen rimelig tid kan skaffe annen taxi. Dersom ny taxi skaffes, kan taxifører kreve betalt for det han har kjørt, fratrukket den nye taxiens fremmøtepris. Hvis passasjeren ikke ønsker en annen taxi, har taxifører krav på betaling for den kjøring som er utført.

Ved avbrytelse av tur på grunn av vær- og/eller føreforhold, har taxifører krav på betaling for kjørt lengde. Forsinkelser som skyldes trafikale og meteorologiske forhold gir den reisende ingen rett til avkortning i samlet takst.

8 Betaling, veksling og kvittering
Taxisentralens takstregulativ benyttes som grunnlag for takstberegningen, med mindre annet er avtalt.

Taxiturer skal skje mot kontant betaling. Ved bruk av kredittkort, rekvisisjon eller annen betalingsform skal det avtales med taxifører før turens start. Dersom det gjennom skilting i taxien, sentralens annonsering eller lignende fremgår at bestemte rekvisisjoner, betalings-/kredittkort aksepteres, plikter taxifører å akseptere disse.

Taxifører plikter ikke å veksle større seddelbeløp enn angitt i sentralens kjørereglement/sjåførinstruks. Kjøring i forbindelse med veksling av større beløp, belastes passasjer.

Taxifører plikter på anmodning å gi passasjer datert kvittering. I kvitteringen skal oppgis taxiførers navn, taxiens løyvenummer, passasjerens på- og avstigningssted samt øvrige opplysninger som er nødvendig til kontroll av at vederlaget er regnet i samsvar med gjeldende takstregulativ. I taxi med kvitteringsskrivende taksameter, skal dette benyttes ved utskrift av kvittering.

§ 9 Sikkerhet for betaling
Taxifører skal snarest og innen 24 – tjuefire – timer underrette taxisentralen om gjenstander mottatt som sikkerhet for betaling. Offentlige dokumenter som f. eks. pass og førerkort, aksepteres ikke som panteobjekt. Taxifører plikter å gi passasjeren kvittering på sentralens godkjente blankett for mottatt pant.

Pantekvittering skal være påført kjørerute, kjørebeløp, gebyr, tid og sted for tilbakelevering av pantet.

Gjeldsbrev, godkjent av taxisentralen, kan benyttes som et alternativ til pant i forbindelse med sikkerhet for betaling.

§ 10 Bagasje og lignende
Taxifører skal hjelpe til med å anbringe bagasje og annet i taxien. Fører kan avvise bagasje og annet som etter sitt omfang eller utforming ikke er egnet til å bli transportert i taxien.

Dersom den reisende ønsker å medbringe bagasje utover det som normalt kan påregnes medtatt i ordinær taxi, skal det opplyses til sentralen ved bestilling. Hvis mulig kan da sentralen formidle oppdraget til taxi tilpasset oppdragets art.

§ 11 Hittegods
Taxifører skal etter hver tur straks undersøke om noe er gjenglemt i taxien, slik at glemte saker kan bli levert tilbake til rette vedkommende med det samme.

Er dette ikke mulig, skal fører levere gjenstander gjenglemt i taxien på det av sentralens anviste sted innen 24 timer. Han plikter å dra forsvarlig omsorg for gjenstanden.

§ 12 Ansvar

a) Skade på person
Transportørens ansvar for skade på person under transport er nærmere regulert i bilansvarsloven. Transportøren skal ha forsikring i samsvar med de krav som lovgivningen bestemmer.

b) Bagasje og annet gods
Går håndbagasje eller ting som de reisende medbringer, helt eller delvis tapt, eller blir slike gjenstander skadd under reisen plikter transportøren å erstatte tapet eller skaden, dersom tapet eller skaden skyldes feil eller forsømmelser fra transportørens side.
For skade på og/eller tap av bagasje eller andre ting passasjeren medbringer, er transportørens ansvar begrenset til kr. 60,- pr. kg. av den del av godset som er gått tapt eller blir skadet.

c) Forsinkelse
Erstatningsplikt for forsinkelse oppstår når fremmøte eller tiden for å fullføre oppdraget, overskrider hva som etter omstendighetene må anses som rimelig. Ansvar foreligger ikke dersom forsinkelsen skyldes passasjeren eller omstendigheter som taxifører ikke kunne unngå og hvis følger han ikke kunne forebygge. Transportørens ansvar for forsinkelser er begrenset til transportens kostnader.

d) Den reisendes ansvar
Den reisende plikter å erstatte skader som ved forsett eller uaktsomhet påføres transportøren.

§ 13 Regler ved tvister
Tvist mellom den reisende og taxifører som ikke lar seg løse mellom partene, kan den reisende forelegge sentralen.

§ 14 Reklamasjon, frister og foreldelse
Den som vil kreve erstatning for tap må gi transportøren og/eller den sentralen hvor transportøren er tilsluttet, meddelelse uten ugrunnet opphold.
Krav om erstatning etter disse befordringsvedtekter, foreldes etter et år med mindre andre frister skal anvendes i medhold av annen lovgivning.

§ 15 Opplysning
Transportvilkårene skal, sammen med gjeldende takstregulativ, være tilgjengelig i taxien og forevises den reisende på forlangende.

Scan QR Code and order

Copyright © Voss Taxi

Telefon+4756511340

E-postpost@vosstaxi.no

AdresseVoss Taxi
Uttrågata 19
5700 Voss
Norway`
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
            body: `Når du brukar Voss Taxi, gjev du oss tilgang til opplysningar om deg. Her kan du lesa kva opplysningar me samlar inn, korleis me gjer det og kva me brukar dei til.
Her finn du informasjon om korleis opplysningar om deg, og dine reiser behandlast i våre system. Elektroniske spor om deg knytt til våre tenester er trygge hjå oss, og me vil ikkje misbruka opplysningane dine. Voss Taxi vil behandla dine personopplysningar slik at du får ei enkel og god teneste. Drosjeselskapet er ansvarleg for dei personopplysningane som behandlast.

Formål

For å kunna tilby digital bestilling, førehandsbetaling og tilleggstenester via vosstaxi.no og VY-Appen, må me kunne lagra informasjon som regnast som personopplysningar

Gjennomføring av endringar

Me vil i blant kunna oppdatera Voss Taxis personvernerklæring for å gjenspeila endringar på nettstaden eller ved vår personvernerklæring. Ved større endringar vil me informera om dette via vår heimeside, eller du informerast ved neste gongs pålogging. I særlege tilfeller vil innlogga brukarar varslast direkte ved e-post eller varsel på SMS.

Kva lagrar me og kvifor

Delar av korttype og –nummer for betaling med kreditt- og bankkort: Me lagrar ikkje heile kortnummeret hjå oss, men delar av da lagrast når du registrerar det direkte i våre tenester. Dette lagrast i vår database slik at kunden skal kunna førehandsbetala og henta ut sine digitale kvitteringar etter endt tur. Visst opplysningane registrerast i tredjepartsløysningar, som for eksempel ved lagring av kort via VY-appen, henvisast kunden til tredjeparts eigne vilkår. https://www.vy.no/vilkar-og-personvern/personvern

Telefonnummer: Sjåførar kan bruka telefonnummer til å ta kontakt med kunde ved henting, eller om han eller ho finn gjengløymde ting i bilen. Me vil også bruka telefonnummer til å senda ut bekreftelsar på bestillingar, eller visst noko uforutsett har skjedd som har betydning for levering av tenester.

For- og/eller etternamn: Lagrast slik at me kan gje betre kundeservice om me treng å kontakta kunden, og for å gjera opplevinga med Voss Taxi meir personleg.

Start- og sluttadresser for turar: Brukast til å generera digitale kvitteringar.

Dato og klokkeslett for turar køyrd: Brukast til å generera digitale kvitteringar.

Karthistorikk: For å kunna henta favorittadresser for raskare bestilling.

GPS: Ved bestilling av tur brukast GPS-signal for å finna ut kvar kunden befinn seg (startadresse).

Utvikling av tenester

Me utviklar stadig våre tenester. Når me utviklar tilleggstenester på vosstaxi.no som inneber lagring av personopplysningar, vil me oppdatera desse vilkåra. Oppdaterte vilkår vil til ei kvar tid væra tilgjengeleg på web.

Kva er personopplysningar?

Personopplysningar er informasjon som kan knytast til ein person, for eksempel namn, bustad, telefonnummer, e-postadresse, IP-adresse.

Med personopplysning meiner me opplysningar som kan knytast til ein enkeltperson

Innstillingar for personopplysningar

Du kan begrensa lagring og behandling av opplysningar om deg. Våre tenester vil då ikkje i like stor grad være tilpassa deg.

Du kan når som helst endra databehandlinga som skjer i våre appar i telefonens innstillingar. Her kan du slå av og på varslingar og opne eller slå av sending av GPS-data til lokasjons teneste. Dette påverkar moglegheitene til å få personaliserte tenester og målretta annonsar.

Voss Taxi loggfører også data knytta til dei enkelte taxiturar.

I tillegg er da kun dei opplysningar som du sjølv oppgjev til oss igjennom appen, som lagrast. Me vil ikkje be om opplysningar som me ikkje treng for å kunna oppfylla våre forpliktelsar ovanfor deg.

Dine personopplysningar vil ikkje verta brukt til andre føremål, eller verta utlevert til andre, med mindre du samtykkjer til slik utvida bruk.

Dersom du vel å registrera ein profil om deg sjølv i VY-appen, vil du sjølv kunna sjå, redigera og sletta dei personlege opplysningane som er lagra i” Min Profil”. Du må angje brukarnamn og passord for å få tilgang til desse opplysningane.

VY-Appen brukar fleire sikkerhetsteknologiar for å beskytta dine personopplysningar mot uautorisert tilgang, bruk eller vidareformidling.

Ved å kontakta oss kan du få innsyn i dine personopplysningar som er lagra hjå oss

Vy-Appen ryddar løpande i sine databasar. Opplysningar som ikkje lenger er relevante, vert automatisk sletta. Ved å kontakta oss kan du krevja at dine personopplysningar som er lagra hjå oss, vert sletta. I så fall tar me kun vare på opplysningar som me er pålagd av lov å oppbevara.

VY-Appen nyttar informasjonskapslar kun til å verifisera gyldig brukarkonto. Dersom du ønskjer å skreddarsy tenesta til dine spesifikke føremål og preferansar, kan du sjølv konfigurera ei rekkje parameter under «din profil».

Oppdaterte «Retningslinjer for personvern knytt til Voss Taxi» er til ei kvar tid tilgjengeleg på http://vosstaxi.no.

Nokon av våre tenester krevjer at kunden samtykkjer til brukarvilkår på grunn av tenestas omfang. Ved bruk av VY-appen må kunden godkjenna innhenting og lagring av personopplysningar ved fyrste oppstart. På VY.no godkjenner kunden innhenting av personopplysningar ved å registrera seg som brukar og bruke tenesta. Enkelte tenester vil ikkje fungera som tiltenkt utan aktivt samtykke, for eksempel stads tenester.

Alle data kunden sjølv fyller inn for å bruka våre tenester lagrast i vår kundedatabase. Voss Taxi har ikkje anledning til å bruka informasjonen ut over vårt formål. Alt krypterast for å sikra at kommunikasjonen mellom tenestene våre er så sikkert som overhode mogeleg.

Me har ikkje anledning til å lagra eller samla inn informasjon ut over det me har spesifisert i dette dokumentet. Endringar i kva me samlar inn vil bli meldt frå om på førehand.

Me har ingen kontroll over, eller ansvar for, tredjepartsprogramvare med tanke på personopplysningar. Me vil ikkje bruka tredjepartsløysningar som er allment kjend for å bryta personvernopplysningslova i Noreg. Me brukar blant anna Google Maps, Vipps. Vennlegast sjå opplysningar om personvern i desse appane.

Kva brukast informasjonen til?

Me jobbar heile tida for å gje deg ei tilpassa og god oppleving av Voss Taxi. Her er dei viktigaste føremåla me brukar personopplysningar til:

Levera tenestene du forventar av oss

Spara deg for tid og arbeid

Forstå markedstrender og behov

Rett til innsyn, retting og sletting

Kunden har rett til å krevje innsyn i dei registrerte opplysningane, samt rett til å krevje retting og sletting i henhold til personopplysningsloven. Ta kontakt på e-post for kundeservice: personvern@vosstaxi.no

Dersom kunde slettar sin profil vil også tilhøyrande personopplysningar slettast. Reisekvitteringar vil som følgje av detta væra anonyme, slik som før oppretta profil.

Behandlingsansvarleg &amp; Personvernombod

Voss Taxi har eit eiget personvernombud for å sikra ein trygg og god behandling av personopplysningar. Ordninga er initiert av Datatilsynet. Du kan kontakte Voss Taxis personvernombod på e-postadressa personvern@vosstaxi.no.

Kva reglar gjeld for handtering av personopplysningar?

Voss Taxi er ansvarleg for handteringa av personopplysningar som samlast inn ved bruk av våre tenester. Voss Taxi følgjer personopplysningsloven i behandlinga av personopplysningar.

Når du lar oss formidla personopplysningar til andre, vil desse ha eit sjølvstendig ansvar for vidare behandling av opplysningane.

Borns personvern

Me ynskjer ikkje å samla inn eller på annan måte behandla personopplysningar om born under 16 års alder.

Visst born under 16 år alikavel har gjett oss personopplysningar vil me sletta opplysningane så snart me vert oppmerksame på forholdet. Føresette kan kontakta oss som angitt nedanfor.

Sletting av personopplysningar

Me lagrar ikkje personopplysningar lenger og i større grad enn da som er nødvendig for å oppfylle formålet med behandlinga med mindre det er lovpålagt, for eksempel gjennom regnskapsloven. Me har omfattande rutinar for sletting og anonymisering. Du kan sjølv be om å få fjerna opplysningar frå din brukarprofil.

Hovudregelen er at personopplysningar lagrast maksimalt i to år. Kor fort opplysninger vert sletta kan variere.

Innsyn i lagra personopplysningar

Ved ynskje om innsyn i kva slags opplysningar me har om deg, vennligst fyll ut vedlagt skjema og send dette til personvern@vosstaxi.no.Personvern skjema

Scan QR Code and order

Copyright © Voss Taxi

Telefon+4756511340

E-postpost@vosstaxi.no

AdresseVoss Taxi
Uttrågata 19
5700 Voss
Norway`
          }
        ]
      }
    ],
    services: [
      {
        id: 'service-no-1',
        locale: 'no',
        title: 'UT Å FLY',
        description: 'Skal du ut å fly så køyrer me og til og i frå Flesland Lufthavn. Ring eller send oss ein mail for meir informasjon og fastpris.',
        capacity: '1-16 passasjerar',
        sort: 1,
      },
      {
        id: 'service-no-2',
        locale: 'no',
        title: 'RULLESTOL',
        description: 'Voss Taxi har ein variert bilpark med plass til samanleggbare rullestolar, men ved behov for å ha med elektrisk rullestol, eller behov for å sitte i rullestolen under transport har me to 16 setar MaxiTaxiar med plass til 2 brukarar samtidig. Samt 3 stk 8 setar rullestolbil, alle med rampe for lett ombordstigning.',
        capacity: 'Inntil 2 rullestolar',
        sort: 2,
      },
      {
        id: 'service-no-3',
        locale: 'no',
        title: 'HITTEGODS',
        description: 'Har du mista noko? Ta kontakt med oss. Me får stadig inn mobilar, hanskar, huer, vesker, briller, skjerf og paraplyar. Alle gjenstandar som vert funne i våre bilar vert bevart på sentralen vår.',
        capacity: '',
        sort: 3,
      },
      {
        id: 'service-no-4',
        locale: 'no',
        title: 'BORN I BIL',
        description: 'Me har barnestolar med IsoFix og støttebase for born i alle aldrar. I tillegg har me eit breitt utval i belteputer og beltestolar.',
        capacity: '',
        sort: 4,
      },
      {
        id: 'service-no-5',
        locale: 'no',
        title: 'SYKKEL?',
        description: 'Me har og moglegheit for å ta med sykkel. Vennligst opplys om dette på førehand, så tek me med oss stativ.',
        capacity: '',
        sort: 5,
      },
      {
        id: 'service-no-6',
        locale: 'no',
        title: 'FØRARHUND',
        description: 'Alle våre bilar og sjåførar tar med seg hund.',
        capacity: '',
        sort: 6,
      },
    ],
    fares: [
      { id: 'fare-phone-no', locale: 'no', label: 'Sentral', value: '56 51 13 40', note: 'Ring for bestilling og pris', sort: 1 },
      { id: 'fare-calc-no', locale: 'no', label: 'Kalkulator', value: 'Online', note: 'Sjekk estimert pris før turen', sort: 2 },
      { id: 'fare-app-no', locale: 'no', label: 'App', value: 'Snappy Taxi', note: 'Bestill via app frå App Store eller Google Play', sort: 3 },
    ],
    gallery: norwegianGallery,
    quickLinks: [
      { id: 'ql-book-no', locale: 'no', title: 'Bestill taxi', description: 'Gå rett til bestilling.', href: settings.booking_url, label: 'Bestill', sort: 1 },
      { id: 'ql-calc-no', locale: 'no', title: 'Priskalkulator', description: 'Få eit estimat før turen.', href: settings.fare_calculator_url, label: 'Opne kalkulator', sort: 2 },
      { id: 'ql-vy-no', locale: 'no', title: 'Vy Taxi', description: 'Bestill via Vy der det passar.', href: 'https://www.vy.no/reis-med-vy/taxi', label: 'Vy taxi', sort: 3 },
    ],
  },
  en: {
    settings,
    source: 'fallback',
    navigation: [
      { id: 'nav-home-en', locale: 'en', label: 'Home', href: '/en', sort: 1 },
      { id: 'nav-om-oss-en', locale: 'en', label: 'About Us', href: '/en/om-oss', sort: 2 },
      { id: 'nav-services-en', locale: 'en', label: 'Services', href: '/en/tenester', sort: 3 },
      { id: 'nav-pakker-en', locale: 'en', label: 'Packages', href: '/en/pakker', sort: 4 },
      { id: 'nav-maxi-taxi-en', locale: 'en', label: 'Maxi Taxi', href: '/en/maxi-taxi', sort: 6 },
      { id: 'nav-bli-sjafor-en', locale: 'en', label: 'Become a driver', href: '/en/bli-sjafor', sort: 7 },
      { id: 'nav-gallery-en', locale: 'en', label: 'Gallery', href: '/en/galleri', sort: 8 },
      { id: 'nav-ris-ros-en', locale: 'en', label: 'Feedback', href: '/en/ris-ros', sort: 9 },
      { id: 'nav-contact-en', locale: 'en', label: 'Contact', href: '/en/kontakt', sort: 10 },
    ],
    pages: [
      {
        id: 'home-en',
        locale: 'en',
        slug: 'home',
        eyebrow: 'Local taxi company in Voss',
        title: 'Drive safe with us, from Voss.',
        summary:
          'Voss Taxi provides sedans, minivans, maxi-taxis, minibuses and wheelchair transport for locals and visitors.',
        hero_image: settings.hero_media,
        blocks: [
          {
            type: 'rich_text',
            title: 'Book with confidence',
            body: 'We have vehicles for all types of assignments and will help you safely to and from trains, hotels, cabins, mountains, and events.',
          },
          {
            type: 'rich_text',
            title: 'Book via App',
            body: '### Snappy Taxi\n\n[![Download on the App Store](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![Get it on Google Play](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Book Taxi in the VY app\n\n[![Download on the App Store](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![Get it on Google Play](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
          },
          {
            type: 'cta',
            title: 'Book by phone or calculator',
            body: 'Call the taxi central or check prices in the calculator before your trip.',
            href: settings.booking_url,
            label: 'Book taxi',
          },
        ],
      },
      {
        id: 'services-en',
        locale: 'en',
        slug: 'services',
        eyebrow: 'Services',
        title: 'Vehicles for every kind of trip.',
        summary: 'Transport for groups, luggage, wheelchair users, tourists and everyday travel.',
        blocks: [],
      },
      {
        id: 'fares-en',
        locale: 'en',
        slug: 'fares',
        eyebrow: 'Fares',
        title: 'Clear fares and quick estimates.',
        summary: 'Use the calculator or call dispatch for trips that need planning.',
        blocks: [],
      },
      {
        id: 'gallery-en',
        locale: 'en',
        slug: 'gallery',
        eyebrow: 'Gallery',
        title: 'Voss Taxi on the road.',
        summary: 'A small selection from the fleet and everyday taxi service in Voss.',
        blocks: [],
      },
      {
        id: 'contact-en',
        locale: 'en',
        slug: 'contact',
        eyebrow: 'Contact',
        title: 'Contact Voss Taxi.',
        summary: 'Call dispatch, send an email or find us in Uttrågata.',
        blocks: [],
      },
      {
        id: 'page-wheelchair-en',
        locale: 'en',
        slug: 'wheelchair',
        title: 'Wheelchair',
        blocks: [
          {
            type: 'rich_text',
            title: 'Wheelchair',
            body: 'We have vehicles adapted for wheelchairs.'
          }
        ]
      },
      {
        id: 'page-ris-ros-en',
        locale: 'en',
        slug: 'ris-ros',
        title: 'Feedback',
        blocks: [
          {
            type: 'rich_text',
            title: 'Feedback',
            body: 'Here you can send formal complaints or praise to us.\n\n## Send a complaint\n\nIf you wish to submit a formal complaint, this must be submitted in writing by using the options below, or by email to post@vosstaxi.no.\nWe will send you a written confirmation within 14 days that the complaint has been received, along with information about the expected processing time.\n\nFormal complaints will be answered in writing. Documentation regarding the complaint is kept with us for three years after the complaint processing has concluded.\n\n## Give us praise or criticism\n\nWe welcome your views, feedback, and tips for improvement. It is the best help you can give us in our efforts to become even better.'
          },
          {
            type: 'cta',
            title: 'Complaint regarding driver',
            body: 'If you wish to submit a complaint about one of our drivers.',
            href: 'mailto:post@vosstaxi.no?subject=Complaint%20regarding%20driver',
            label: 'Send complaint'
          },
          {
            type: 'cta',
            title: 'Complaint regarding service',
            body: 'If you wish to complain about a service we have provided.',
            href: 'mailto:post@vosstaxi.no?subject=Complaint%20regarding%20service',
            label: 'Send complaint'
          },
          {
            type: 'cta',
            title: 'General complaints',
            body: 'If you have other general complaints about our services.',
            href: 'mailto:post@vosstaxi.no?subject=General%20complaint',
            label: 'Send complaint'
          },
          {
            type: 'cta',
            title: 'Praise',
            body: 'We greatly appreciate praise when you have had a good experience with us!',
            href: 'mailto:post@vosstaxi.no?subject=Praise%20for%20Voss%20Taxi',
            label: 'Send praise'
          },
          {
            type: 'cta',
            title: 'General information',
            body: 'Rules, rights, and general information about taxis.',
            href: '/general-information',
            label: 'Read more'
          }
        ]
      },
      {
        id: 'generell-informasjon-en',
        locale: 'en',
        slug: 'general-information',
        title: 'General information',
        blocks: [
          {
            type: 'rich_text',
            title: 'General information',
            body: 'Complain first to the taxi if it is delayed or drives the wrong way. If you cannot agree, you can bring the case to the Consumer Authority (Forbrukertilsynet).\n\n## On this page\n- Can you choose the taxi you want?\n- What can you demand if the taxi drives the wrong way?\n- What can you demand if the taxi is delayed or does not arrive?\n- How do you proceed to complain?\n\n### Can you choose the taxi you want?\nThere is free choice of taxi in Norway. You can choose the car or company you want – even in the taxi queue.\n\n### What can you demand if the taxi drives the wrong way?\nIf the taxi driver drives the wrong way, you can ask them to stop the taximeter, and if it turns out the driver did not choose the fastest route, you may demand a price reduction. You should ideally do this on the spot. If you are unsuccessful, you should raise this in writing with the taxi central as soon as possible.\n\n### What can you demand if the taxi is delayed or does not arrive?\nYou are entitled to compensation for financial losses that occur if the taxi is delayed or does not arrive. Remember that you are responsible for limiting any financial losses, for example by ordering a new taxi or choosing another means of transport.\n\nIn practice, this means that if you have calculated reasonable time but miss your flight because the taxi did not show up, you may claim compensation for the extra costs.\n\n> [!WARNING]\n> **NOTE!** The claim for compensation lapses if the delay is due to circumstances beyond the company\'s control, such as traffic accidents or extreme weather conditions.\n\nSome companies also have schemes that go beyond your statutory rights, so it may be wise to check the transport conditions if the taxi does not arrive as agreed.\n\n### How do you proceed to complain?\n**Complain to the taxi/taxi central**\nIf you have been unlucky, you should complain in writing to the taxi central as soon as possible. It is important to include information about the booked trip and to document any extra costs you have incurred.\n\n**Take the case to mediation**\nIf you cannot reach an agreement with the taxi central, you can take the case to the Consumer Authority.\n\n[Take the case to the Consumer Authority for mediation](https://www.forbrukertilsynet.no/)\n\n[Complaint template](#)'
          }
        ]
      },

      {
        id: 'historia-var-en',
        locale: 'en',
        slug: 'historia-var',
        title: 'Historia vår',
        eyebrow: 'Om Voss Taxi',
        summary: 'Sjå litt av historia til Voss Taxi. Gamle arkiv og bilder eksisterar det forbausande lite av i dag.',
        blocks: [
          {
            type: 'rich_text',
            body: `## Frå drosjeeigarlag til moderne taxisentral

Drosjehistoria på Voss strekkjer seg langt tilbake. Det har truleg vore drosjekøyring på Voss i meir enn hundre år, men den organiserte historia til Voss Taxi kan sporast tilbake til 10. februar 1930, då Voss Drosjeeigarlag vart stifta.

Mykje av den eldste historia er vanskeleg å dokumentera fullt ut. Store delar av arkivmaterialet gjekk tapt under bombinga av Vossevangen under andre verdskrig. Det me veit, er bygd på gamle møtebøker, bilete, munnlege kjelder og seinare dokumentasjon frå drosjemiljøet på Voss.

![Historisk bilde 1](https://cms.vosstaxi.no/uploads/1594031017144_00c7caf4_5ac3_4a54_ba3b_253f2a56aad7_4f98a48e94.jpg)

### Dei første haldeplassane

I dei første tiåra heldt drosjene til sentralt på Vossevangen. Gamle kjelder tyder på at drosjene ei tid stod ved Fiskartorget, og seinare bak Voss Bokhandel. Etter kvart vart Hestavangen eit viktig haldepunkt for drosjene.

Gamle bilete kan tyda på at drosjene var knytte til Hestavangen alt kring 1930-åra, sjølv om den faste brakka som mange hugsar, kom seinare.

![Historisk bilde 2](https://cms.vosstaxi.no/uploads/1594033590475_920ec5d0_fa60_4b9c_b132_45045145a9f9_14ca3489ef.jpg)

### Brakka på Hestavangen

Etter krigen fekk drosjeeigarane, saman med Voss lastebilforening, avtale med Norsk Brændselolje/BP om drivstoff og eigen tank. Som del av denne avtalen fekk drosjesjåførane også husrom i form av ei brakke frå BP.

Denne brakka var først plassert nedom skulehaugen der som Voss parkeringshus heldt til i dag. Deretter vart ho flytta bort på Hestavangen tidleg på 1950-talet. Her vart ho plassert attmed huset til Arne Nilsen. Ho vart etter kvart eit fast samlingspunkt for drosjene på Voss – både som venterom, arbeidsplass og sosial møteplass for sjåførane.

![Historisk bilde 3](https://cms.vosstaxi.no/uploads/IMG_20200706_0003_b681eecd88.jpg)

På 1960-talet kom det planar om nytt helsehus på området der brakka stod. I samband med dette vart det diskutert nye lokale for drosjene, og i 1968 vart brakka flytta vestover på plassen. Flyttinga skulle eigentleg vera mellombels, men slik gjekk det ikkje. Planane om nye lokale vart aldri løyste slik drosjene hadde sett føre seg, og brakka vart ståande i bruk heilt fram til 2014.

![Historisk bilde 4](https://cms.vosstaxi.no/uploads/1594033950011_0dbdd0e0_d971_4beb_aff2_e793c9dbad3c_19c793f208.jpg)

For mange vossingar vart den raude og kvite taxibua eit kjent innslag i sentrum. Ho vart ein del av bybiletet, og er framleis eit syn mange knyter til drosjehistoria på Voss.

### Flytting

I 2014 flytta Voss Taxi inn i nye lokale ved Uttrågata 19, rett over gata frå den gamle bua. For sjåførane vart dette på mange måtar å koma heimatt – tilbake til området der drosjene i generasjonar hadde hatt sitt naturlege utgangspunkt.

Dei nye lokala gav betre arbeidsforhold, meir plass og eit oppvarma venterom for kundar. Samstundes vart den historiske tilknytinga til Hestavangen og Vossevangen teken vidare.

![Historisk bilde 5](https://cms.vosstaxi.no/uploads/1594033487309_3673ee32_eb67_4713_8214_ebb1da48e841_f59ab126c6.jpg)

### Voss Taxi i dag

Voss Taxi har utvikla seg frå eit lokalt drosjeeigarlag til ein moderne taxisentral med døgnbemanning, digitale bestillingsløysingar og eit breitt transporttilbod.

I dag køyrer Voss Taxi både ordinære taxiturar, pasientreiser, skuletransport, rullestoltransport, maxitaxi, turistkøyring og faste transportoppdrag for offentlege og private kundar.

Sjølv om teknologien, bilane og organiseringa har endra seg mykje sidan 1930, er hovudoppgåva den same: å få folk trygt fram.

### Frå SA til AS

Voss Taxi har gjennom åra hatt fleire organisasjonsformer og namn. Frå starten som drosjeeigarlag vart verksemda seinare kjend som Voss Drosjebilsentral. I 2014 vart namnet Voss Taxi SA teke i bruk.

I 2026 vart arbeidet med ny selskapsstruktur sett i gang, og Voss Taxi AS vart etablert som eit nytt steg i utviklinga av sentralen. Målet er å skapa ei meir framtidsretta og robust organisering, samstundes som den lokale forankringa og eigarskapen hjå løyvehavarane vert vidareført.

Voss Taxi byggjer vidare på historia frå 1930 – med røter i lokalt eigarskap, praktisk samarbeid og trygg transport for folk på Voss.

![Historisk bilde 6](https://cms.vosstaxi.no/uploads/1594031162280_775ca4e4_b462_442f_9e94_103488400b80_991d51b7bf.jpg)

### Tidslinje

**1930**
Voss Drosjeeigarlag vert  stifta 10. februar 1930.

**1930-åra**
Drosjene held til sentralt på Vossevangen, mellom anna ved Fiskartorget og seinare i området bak Voss Bokhandel. Hestavangen vert etter kvart eit viktig haldepunkt.

**1940**
Store delar av eldre arkiv og dokumentasjon går tapt under bombinga av Vossevangen.

**Etter krigen**
Drosjeeigarane samarbeider med Voss lastebilforening om avtale med BP/Norsk Brændselolje. Drosjene får tilgang til drivstofftank og husrom.

**Tidleg 1950-tal**
Taxibrakka vert plassert på Hestavangen.

**1960-talet**
Planar om helsehus og nye lokale for drosjene vert diskuterte.

**1968**
Brakka vert flytta vestover på Hestavangen. Flyttinga skulle vera mellombels, men brakka vert verande i bruk i mange tiår.

**1950–2013**
Verksemda er kjend som Drosjebilsentralen/Voss Drosjebilsentral.

**2014**
Voss Taxi SA vert etablert som namn og selskapsform. Sentralen flyttar inn i nye lokale ved Uttrågata 19.

**2020**
Voss Taxi markerer 90 år sidan stiftinga i 1930.

**2026**
Voss Taxi AS vert etablert som del av ei ny og meir framtidsretta organisering av sentralen.`
          }
        ]
      },
      {
        id: 'transportvilkar-en',
        locale: 'en',
        slug: 'transportvilkar',
        title: 'Transportvilkår',
        summary: 'Våre transportvilkår og retningslinjer',
        blocks: [
          {
            type: 'rich_text',
            body: `Transportvilkår

Utarbeidet av Norges Taxiforbund 2000

§ 1 Transportvilkårenes anvendelse
Transportvilkårene er avtalevilkår mellom den reisende og taxifører. På alle forhold som ikke er regulert her, kommer norsk lov til anvendelse.

§ 2 Bestilling av taxi
Ved bestilling av taxi gjennom sentral eller ved telefonbestilling direkte til holdeplass, skal bestiller gi relevante opplysninger som måtte være nødvendig for oppdragets utførelse. Dersom det kreves særskilt utrustet kjøretøy, utvidet setekapasitet eller særlig utstyr (spesialtransport), skal bestiller opplyse dette.

Om bestillingen gjelder f. eks. flere enn fire passasjerer og det viser seg at det faktiske behov er redusert, regnes godtgjørelse og lignende i henhold til bestillingen.

§ 3 Bruk av holdeplass. Fortrinnsrett til taxi.
Ved kø på holdeplass, skal taxifører kjøre den reisende som står for tur. Syke, uføre og personer med småbarn har fortrinnsrett til taxi. For øvrig gjelder de av myndighetene fastsatte bestemmelser om fortrinnsrett til taxi.

Reisende fra holdeplass er fortrinnsberettiget til ledig taxi. Publikum på holdeplass henvises til første ledige taxi, men de har selv rett til å velge taxi. Taxier som eventuelt står foran i køen, må om nødvendig flyttes for å gi plass til utkjøring.

Ved påstigning skal den reisende oppgi sitt reisemål, om eventuell annen oppgjørsform enn kontant betaling og eventuelle andre forhold av betydning for oppdragets utførelse.

§ 4 Praiing utenom holdeplass.
Når taxi er ledig, skal taxifører sørge for at lediglampe er tent og synlig for publikum. Utenfor en avstand fra nærmeste holdeplass, angitt i sentralens kjørereglement/sjåførinstruks, kan fører plukke opp reisende som gir tydelige tegn, så sant stans og påstigning kan skje innenfor rammen av gjeldende trafikkregler og uten hinder for øvrig trafikk.

§ 5 Taxiførers rett til å avvise turer
Taxifører kan avvise ruset person, reisende som opptrer truende eller personer som av andre årsaker taxifører finner saklig grunn til å avvise.

Den reisende har rett til å medbringe førerhund.

Dersom person avvises, kan taxifører kreve godtgjørelse i samsvar med taksameterets pålydende.

§ 6 Oppdragets utførelse
En taxifører skal følge den kjørerute som tar kortest tid til bestemmelsesstedet, hvis den reisende ikke bestemmer noe annet.

Taxifører plikter etter anmodning på samme turen å kjøre passasjerer til forskjellige steder (kombinering av tur). Hvis ikke annet er avtalt, er sist avstigende passasjer ansvarlig for betaling av turen

Ansvar for påbudt bruk av bilbelte og eventuelt at barnesete er forsvarlig festet, følger veitrafikklovens bestemmelser.

Person som trenger assistanse fra taxi til inngangsdør eller lignende, kan anmode om bistand. Bistand taxifører yter passasjeren, etter dennes ønske, til, fra eller utenfor transportmidlet skjer for passasjerens risiko.

Under turen skal fører og passasjer opptre slik at det ikke oppstår fare for medtrafikanter, bagasje, bil og utstyr. Røyking i taxi er forbudt.

Førers bruk av mobiltelefon, dataterminal og lignende under oppdrag skal skje i henhold til sentralens reglement. Bilradio kan benyttes etter den reisendes samtykke.

Taxifører kan kreve forhåndsbetaling for turen.

§ 7 Ventetid, avbrudd og forsinkelser
Ved henting av passasjer og under kjøring plikter taxifører å vente i et tidsintervall som fremgår av kjørereglement/sjåførinstruks, hvis ikke annet er avtalt. For spesielle kjøreoppdrag av typen legekjøring, bryllup, barnedåp og begravelse følger ventetid av oppdragets art.

Ved forhåndsbestilt taxi gjelder at faktisk fremmøte kan avvike fra avtalt fremmøtetidspunkt med et tidsintervall som er angitt i sentralens kjørereglement/sjåførinstruks.

Må en tur avbrytes på grunn av feil med kjøretøyet, har taxifører ikke krav på betaling for den utførte kjøring, hvis han ikke innen rimelig tid kan skaffe annen taxi. Dersom ny taxi skaffes, kan taxifører kreve betalt for det han har kjørt, fratrukket den nye taxiens fremmøtepris. Hvis passasjeren ikke ønsker en annen taxi, har taxifører krav på betaling for den kjøring som er utført.

Ved avbrytelse av tur på grunn av vær- og/eller føreforhold, har taxifører krav på betaling for kjørt lengde. Forsinkelser som skyldes trafikale og meteorologiske forhold gir den reisende ingen rett til avkortning i samlet takst.

8 Betaling, veksling og kvittering
Taxisentralens takstregulativ benyttes som grunnlag for takstberegningen, med mindre annet er avtalt.

Taxiturer skal skje mot kontant betaling. Ved bruk av kredittkort, rekvisisjon eller annen betalingsform skal det avtales med taxifører før turens start. Dersom det gjennom skilting i taxien, sentralens annonsering eller lignende fremgår at bestemte rekvisisjoner, betalings-/kredittkort aksepteres, plikter taxifører å akseptere disse.

Taxifører plikter ikke å veksle større seddelbeløp enn angitt i sentralens kjørereglement/sjåførinstruks. Kjøring i forbindelse med veksling av større beløp, belastes passasjer.

Taxifører plikter på anmodning å gi passasjer datert kvittering. I kvitteringen skal oppgis taxiførers navn, taxiens løyvenummer, passasjerens på- og avstigningssted samt øvrige opplysninger som er nødvendig til kontroll av at vederlaget er regnet i samsvar med gjeldende takstregulativ. I taxi med kvitteringsskrivende taksameter, skal dette benyttes ved utskrift av kvittering.

§ 9 Sikkerhet for betaling
Taxifører skal snarest og innen 24 – tjuefire – timer underrette taxisentralen om gjenstander mottatt som sikkerhet for betaling. Offentlige dokumenter som f. eks. pass og førerkort, aksepteres ikke som panteobjekt. Taxifører plikter å gi passasjeren kvittering på sentralens godkjente blankett for mottatt pant.

Pantekvittering skal være påført kjørerute, kjørebeløp, gebyr, tid og sted for tilbakelevering av pantet.

Gjeldsbrev, godkjent av taxisentralen, kan benyttes som et alternativ til pant i forbindelse med sikkerhet for betaling.

§ 10 Bagasje og lignende
Taxifører skal hjelpe til med å anbringe bagasje og annet i taxien. Fører kan avvise bagasje og annet som etter sitt omfang eller utforming ikke er egnet til å bli transportert i taxien.

Dersom den reisende ønsker å medbringe bagasje utover det som normalt kan påregnes medtatt i ordinær taxi, skal det opplyses til sentralen ved bestilling. Hvis mulig kan da sentralen formidle oppdraget til taxi tilpasset oppdragets art.

§ 11 Hittegods
Taxifører skal etter hver tur straks undersøke om noe er gjenglemt i taxien, slik at glemte saker kan bli levert tilbake til rette vedkommende med det samme.

Er dette ikke mulig, skal fører levere gjenstander gjenglemt i taxien på det av sentralens anviste sted innen 24 timer. Han plikter å dra forsvarlig omsorg for gjenstanden.

§ 12 Ansvar

a) Skade på person
Transportørens ansvar for skade på person under transport er nærmere regulert i bilansvarsloven. Transportøren skal ha forsikring i samsvar med de krav som lovgivningen bestemmer.

b) Bagasje og annet gods
Går håndbagasje eller ting som de reisende medbringer, helt eller delvis tapt, eller blir slike gjenstander skadd under reisen plikter transportøren å erstatte tapet eller skaden, dersom tapet eller skaden skyldes feil eller forsømmelser fra transportørens side.
For skade på og/eller tap av bagasje eller andre ting passasjeren medbringer, er transportørens ansvar begrenset til kr. 60,- pr. kg. av den del av godset som er gått tapt eller blir skadet.

c) Forsinkelse
Erstatningsplikt for forsinkelse oppstår når fremmøte eller tiden for å fullføre oppdraget, overskrider hva som etter omstendighetene må anses som rimelig. Ansvar foreligger ikke dersom forsinkelsen skyldes passasjeren eller omstendigheter som taxifører ikke kunne unngå og hvis følger han ikke kunne forebygge. Transportørens ansvar for forsinkelser er begrenset til transportens kostnader.

d) Den reisendes ansvar
Den reisende plikter å erstatte skader som ved forsett eller uaktsomhet påføres transportøren.

§ 13 Regler ved tvister
Tvist mellom den reisende og taxifører som ikke lar seg løse mellom partene, kan den reisende forelegge sentralen.

§ 14 Reklamasjon, frister og foreldelse
Den som vil kreve erstatning for tap må gi transportøren og/eller den sentralen hvor transportøren er tilsluttet, meddelelse uten ugrunnet opphold.
Krav om erstatning etter disse befordringsvedtekter, foreldes etter et år med mindre andre frister skal anvendes i medhold av annen lovgivning.

§ 15 Opplysning
Transportvilkårene skal, sammen med gjeldende takstregulativ, være tilgjengelig i taxien og forevises den reisende på forlangende.

Scan QR Code and order

Copyright © Voss Taxi

Telefon+4756511340

E-postpost@vosstaxi.no

AdresseVoss Taxi
Uttrågata 19
5700 Voss
Norway`
          }
        ]
      },
      {
        id: 'personvern-en',
        locale: 'en',
        slug: 'personvern',
        title: 'Personvern',
        summary: 'Vår personvernerklæring',
        blocks: [
          {
            type: 'rich_text',
            body: `Når du brukar Voss Taxi, gjev du oss tilgang til opplysningar om deg. Her kan du lesa kva opplysningar me samlar inn, korleis me gjer det og kva me brukar dei til.
Her finn du informasjon om korleis opplysningar om deg, og dine reiser behandlast i våre system. Elektroniske spor om deg knytt til våre tenester er trygge hjå oss, og me vil ikkje misbruka opplysningane dine. Voss Taxi vil behandla dine personopplysningar slik at du får ei enkel og god teneste. Drosjeselskapet er ansvarleg for dei personopplysningane som behandlast.

Formål

For å kunna tilby digital bestilling, førehandsbetaling og tilleggstenester via vosstaxi.no og VY-Appen, må me kunne lagra informasjon som regnast som personopplysningar

Gjennomføring av endringar

Me vil i blant kunna oppdatera Voss Taxis personvernerklæring for å gjenspeila endringar på nettstaden eller ved vår personvernerklæring. Ved større endringar vil me informera om dette via vår heimeside, eller du informerast ved neste gongs pålogging. I særlege tilfeller vil innlogga brukarar varslast direkte ved e-post eller varsel på SMS.

Kva lagrar me og kvifor

Delar av korttype og –nummer for betaling med kreditt- og bankkort: Me lagrar ikkje heile kortnummeret hjå oss, men delar av da lagrast når du registrerar det direkte i våre tenester. Dette lagrast i vår database slik at kunden skal kunna førehandsbetala og henta ut sine digitale kvitteringar etter endt tur. Visst opplysningane registrerast i tredjepartsløysningar, som for eksempel ved lagring av kort via VY-appen, henvisast kunden til tredjeparts eigne vilkår. https://www.vy.no/vilkar-og-personvern/personvern

Telefonnummer: Sjåførar kan bruka telefonnummer til å ta kontakt med kunde ved henting, eller om han eller ho finn gjengløymde ting i bilen. Me vil også bruka telefonnummer til å senda ut bekreftelsar på bestillingar, eller visst noko uforutsett har skjedd som har betydning for levering av tenester.

For- og/eller etternamn: Lagrast slik at me kan gje betre kundeservice om me treng å kontakta kunden, og for å gjera opplevinga med Voss Taxi meir personleg.

Start- og sluttadresser for turar: Brukast til å generera digitale kvitteringar.

Dato og klokkeslett for turar køyrd: Brukast til å generera digitale kvitteringar.

Karthistorikk: For å kunna henta favorittadresser for raskare bestilling.

GPS: Ved bestilling av tur brukast GPS-signal for å finna ut kvar kunden befinn seg (startadresse).

Utvikling av tenester

Me utviklar stadig våre tenester. Når me utviklar tilleggstenester på vosstaxi.no som inneber lagring av personopplysningar, vil me oppdatera desse vilkåra. Oppdaterte vilkår vil til ei kvar tid væra tilgjengeleg på web.

Kva er personopplysningar?

Personopplysningar er informasjon som kan knytast til ein person, for eksempel namn, bustad, telefonnummer, e-postadresse, IP-adresse.

Med personopplysning meiner me opplysningar som kan knytast til ein enkeltperson

Innstillingar for personopplysningar

Du kan begrensa lagring og behandling av opplysningar om deg. Våre tenester vil då ikkje i like stor grad være tilpassa deg.

Du kan når som helst endra databehandlinga som skjer i våre appar i telefonens innstillingar. Her kan du slå av og på varslingar og opne eller slå av sending av GPS-data til lokasjons teneste. Dette påverkar moglegheitene til å få personaliserte tenester og målretta annonsar.

Voss Taxi loggfører også data knytta til dei enkelte taxiturar.

I tillegg er da kun dei opplysningar som du sjølv oppgjev til oss igjennom appen, som lagrast. Me vil ikkje be om opplysningar som me ikkje treng for å kunna oppfylla våre forpliktelsar ovanfor deg.

Dine personopplysningar vil ikkje verta brukt til andre føremål, eller verta utlevert til andre, med mindre du samtykkjer til slik utvida bruk.

Dersom du vel å registrera ein profil om deg sjølv i VY-appen, vil du sjølv kunna sjå, redigera og sletta dei personlege opplysningane som er lagra i” Min Profil”. Du må angje brukarnamn og passord for å få tilgang til desse opplysningane.

VY-Appen brukar fleire sikkerhetsteknologiar for å beskytta dine personopplysningar mot uautorisert tilgang, bruk eller vidareformidling.

Ved å kontakta oss kan du få innsyn i dine personopplysningar som er lagra hjå oss

Vy-Appen ryddar løpande i sine databasar. Opplysningar som ikkje lenger er relevante, vert automatisk sletta. Ved å kontakta oss kan du krevja at dine personopplysningar som er lagra hjå oss, vert sletta. I så fall tar me kun vare på opplysningar som me er pålagd av lov å oppbevara.

VY-Appen nyttar informasjonskapslar kun til å verifisera gyldig brukarkonto. Dersom du ønskjer å skreddarsy tenesta til dine spesifikke føremål og preferansar, kan du sjølv konfigurera ei rekkje parameter under «din profil».

Oppdaterte «Retningslinjer for personvern knytt til Voss Taxi» er til ei kvar tid tilgjengeleg på http://vosstaxi.no.

Nokon av våre tenester krevjer at kunden samtykkjer til brukarvilkår på grunn av tenestas omfang. Ved bruk av VY-appen må kunden godkjenna innhenting og lagring av personopplysningar ved fyrste oppstart. På VY.no godkjenner kunden innhenting av personopplysningar ved å registrera seg som brukar og bruke tenesta. Enkelte tenester vil ikkje fungera som tiltenkt utan aktivt samtykke, for eksempel stads tenester.

Alle data kunden sjølv fyller inn for å bruka våre tenester lagrast i vår kundedatabase. Voss Taxi har ikkje anledning til å bruka informasjonen ut over vårt formål. Alt krypterast for å sikra at kommunikasjonen mellom tenestene våre er så sikkert som overhode mogeleg.

Me har ikkje anledning til å lagra eller samla inn informasjon ut over det me har spesifisert i dette dokumentet. Endringar i kva me samlar inn vil bli meldt frå om på førehand.

Me har ingen kontroll over, eller ansvar for, tredjepartsprogramvare med tanke på personopplysningar. Me vil ikkje bruka tredjepartsløysningar som er allment kjend for å bryta personvernopplysningslova i Noreg. Me brukar blant anna Google Maps, Vipps. Vennlegast sjå opplysningar om personvern i desse appane.

Kva brukast informasjonen til?

Me jobbar heile tida for å gje deg ei tilpassa og god oppleving av Voss Taxi. Her er dei viktigaste føremåla me brukar personopplysningar til:

Levera tenestene du forventar av oss

Spara deg for tid og arbeid

Forstå markedstrender og behov

Rett til innsyn, retting og sletting

Kunden har rett til å krevje innsyn i dei registrerte opplysningane, samt rett til å krevje retting og sletting i henhold til personopplysningsloven. Ta kontakt på e-post for kundeservice: personvern@vosstaxi.no

Dersom kunde slettar sin profil vil også tilhøyrande personopplysningar slettast. Reisekvitteringar vil som følgje av detta væra anonyme, slik som før oppretta profil.

Behandlingsansvarleg &amp; Personvernombod

Voss Taxi har eit eiget personvernombud for å sikra ein trygg og god behandling av personopplysningar. Ordninga er initiert av Datatilsynet. Du kan kontakte Voss Taxis personvernombod på e-postadressa personvern@vosstaxi.no.

Kva reglar gjeld for handtering av personopplysningar?

Voss Taxi er ansvarleg for handteringa av personopplysningar som samlast inn ved bruk av våre tenester. Voss Taxi følgjer personopplysningsloven i behandlinga av personopplysningar.

Når du lar oss formidla personopplysningar til andre, vil desse ha eit sjølvstendig ansvar for vidare behandling av opplysningane.

Borns personvern

Me ynskjer ikkje å samla inn eller på annan måte behandla personopplysningar om born under 16 års alder.

Visst born under 16 år alikavel har gjett oss personopplysningar vil me sletta opplysningane så snart me vert oppmerksame på forholdet. Føresette kan kontakta oss som angitt nedanfor.

Sletting av personopplysningar

Me lagrar ikkje personopplysningar lenger og i større grad enn da som er nødvendig for å oppfylle formålet med behandlinga med mindre det er lovpålagt, for eksempel gjennom regnskapsloven. Me har omfattande rutinar for sletting og anonymisering. Du kan sjølv be om å få fjerna opplysningar frå din brukarprofil.

Hovudregelen er at personopplysningar lagrast maksimalt i to år. Kor fort opplysninger vert sletta kan variere.

Innsyn i lagra personopplysningar

Ved ynskje om innsyn i kva slags opplysningar me har om deg, vennligst fyll ut vedlagt skjema og send dette til personvern@vosstaxi.no.Personvern skjema

Scan QR Code and order

Copyright © Voss Taxi

Telefon+4756511340

E-postpost@vosstaxi.no

AdresseVoss Taxi
Uttrågata 19
5700 Voss
Norway`
          }
        ]
      }
    ],
    services: [
      {
        id: 'service-maxi-en',
        locale: 'en',
        title: 'Maxi-Taxi & wheelchair',
        description: 'Minibuses with room for up to 16 passengers or 2 wheelchairs at the same time.',
        capacity: '16 passengers',
        sort: 1,
      },
      {
        id: 'service-van-en',
        locale: 'en',
        title: 'MiniVan',
        description: 'Minivans with room for 7-8 passengers and luggage.',
        capacity: '7-8 passengers',
        sort: 2,
      },
      {
        id: 'service-car-en',
        locale: 'en',
        title: 'Sedans',
        description: 'Sedans for 1-4 passengers and everyday taxi trips.',
        capacity: '1-4 passengers',
        sort: 3,
      },
    ],
    fares: [
      { id: 'fare-phone-en', locale: 'en', label: 'Dispatch', value: '56 51 13 40', note: 'Call to book or ask for fares', sort: 1 },
      { id: 'fare-calc-en', locale: 'en', label: 'Calculator', value: 'Online', note: 'Check an estimate before travelling', sort: 2 },
      { id: 'fare-app-en', locale: 'en', label: 'App', value: 'Snappy Taxi', note: 'Download from App Store or Google Play', sort: 3 },
    ],
    gallery: englishGallery,
    quickLinks: [
      { id: 'ql-book-en', locale: 'en', title: 'Book taxi', description: 'Go straight to booking.', href: settings.booking_url, label: 'Book', sort: 1 },
      { id: 'ql-calc-en', locale: 'en', title: 'Fare calculator', description: 'Get an estimate before the trip.', href: settings.fare_calculator_url, label: 'Open calculator', sort: 2 },
    ],
  },
}
