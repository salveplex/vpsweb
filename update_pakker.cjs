const fs = require('fs');

let content = fs.readFileSync('src/content/fallback.ts', 'utf-8');

const regex = /(id:\s*'page-pakker-no'[\s\S]*?body:\s*`)([\s\S]*?)(`\n\s*\}\n\s*\])/;

const newBody = `### Opplev Voss 🏔️

**Få meir ut av oppholdet ditt. Sightseeing på Voss for 1-16 passasjerar med Voss Taxi.**

Våre sjåførar kan vise deg dei beste severdigheitene her på Voss. Du kan stoppe undervegs for å besøke dei ulike destinasjonane, og du bestemmer sjølv kvar du vil byrja og avslutta reisa.

Med Voss Taxi kan du skreddersy di heilt eiga sightseeing-utflukt og dra akkurat dit du vil, i ditt eige tempo. Vi kjem gjerne med forslag til ruter, men tilpassar sjølvsagt ekskursjonen til dine og dine medreisande sine interesser. Bilane våre vert køyrde av profesjonelle og erfarne sjåførar med inngåande lokalkunnskap.

> 📞 **Bestill sightseeing eller få eit pristilbod:** Ring oss på (+47) 56 51 13 40

---

### Tvindefossen 🌊

Tvindefossen er den 98. høgaste fossen i Noreg rekna ut ifrå totalt fall. Fossen ligg ved Tvinde i Voss herad, 12 km nord for Voss sentrum like ved E-16, og er ein svært kjend turistattraksjon. Tvindefossen har eit totalt fall på 110 meter, der det lengste fallet er på heile 85 meter. Vatnet kjem frå Kroelva og renn ut i Strandaelva.

*Visste du at?* På slutten av 1990-talet fekk Tvindefossen eit rykte på seg for å ha vatn med foryngande effekt og evna til å auka seksuell kraft. Dette gjorde fossen til ein av dei viktigaste naturlege turistattraksjonane på Vestlandet! Så mange som 200 000 turistar fyller flaskene sine her kvart år.

![Tvindefossen](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/TvindeFossen%2003.jpg?etag=%227fcb15-5f09c190%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&quality=85)

---

### Skjervsfossen 💦

Skjervsfossen er ein majestetisk foss i Granvin herad i Vestland. Han ligg ved Skjervet, omtrent midt mellom Granvin og Voss. Riksveg 13 passerer på ei avsats mellom det øvre og nedre fallet til fossen. Rv13 er for øvrig ein av Noregs viktigaste turistvegar.

Fossen ligg ca. 15 kilometer frå Voss sentrum, men pass på å ta den gamle vegen og ikkje tunnelen! Skjervsfossen er ein tvillingfoss i Storelvi med ei total høgd på heile 125 meter. Den øvre delen er den mest imponerande, med eit loddrett fall på 60 meter.

![Skjervsfossen](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/SkjerveFossen%2003.jpg?etag=%2279e57d-5f09c169%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&quality=85)

---

### Bordalsgjelet 🌲

Bordalsgjelet er ein spektakulær naturattraksjon i gangavstand frå sentrum. Det djupe og dramatiske Bordalsgjelet er tilrettelagt for publikum med utsiktspunkt og benkar.

Når det ikkje er snø og is er det òg ein tilrettelagt sti du kan følgje innover gjelet. Her får du god utsikt til dei fantastiske jettegrytene som isen og elva har forma gjennom årtusen. Men hugs, for din eigen sikkerheit: Hald deg til dei merka stiane!

![Bordalsgjelet](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Bordalsgjelet%2002.jpg?etag=%226cd4e7-5f09c189%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&quality=85)

---

### Mølstertunet 🏘️

Voss Folkemuseum vart grunnlagt i 1917. Museet si første oppgåve var å kjøpe gardstunet på Mølster, som i dag er eitt av tre autentiske gardstun som vert ått og ivareteke av museet. I desse tre gardstuna er alle bygningane framleis plassert akkurat der dei stod då folk budde der.

På Mølster gard, som du lett kan sjå i åssida ovanfor Vossevangen, er det eit nyare museumsbygg kor permanente og mellombels utstillingar gjev den besøkande auka kunnskap om den lokale kulturen. Her finn du òg ein museumsbutikk, og om sommaren har dei vanlegvis høner og sauer på garden. Det er mogleg å nå museet både til fots og med bil.

![Mølstertunet](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/M%C3%B8lster,_Voss_folkemuseum,_Hordaland_-_Riksantikvaren-T280_01_0036.jpg?etag=%22913613-5f09c170%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&quality=85)

---

### 🚕 Sightseeing-prisar – Voss Taxi (2026)

**Måndag – fredag**
- 1–4 personar (opptil 1 time): NOK 900
- 5–6 personar (opptil 1 time): NOK 1000
- 7–8 personar (opptil 1 time): NOK 1100
- 9–16 personar (opptil 1 time): NOK 1150

**Laurdag – sundag**
- 1–4 personar (opptil 1 time): NOK 1000
- 5–6 personar (opptil 1 time): NOK 1100
- 7–8 personar (opptil 1 time): NOK 1200
- 9–16 personar (opptil 1 time): NOK 1250

<br/>

> **Vilkår**
> - Tida startar ved avtalt oppmøte og vert rekna fortløpande.
> - Eventuell ventetid under stopp er inkludert i timen. Lengre stopp vert belasta ekstra.
> - Turen må starte og avsluttast i Voss sentrum (Vossevangen).
> - Turar utanfor dette området vert køyrde etter ordinær takst.
> - Sightseeing gjeld lokal køyring i Voss-området. Lengre turar må avtalast på førehand.
> - Pris vert fastsett etter faktisk tal passasjerar ved turstart.
> - Ved forseinka oppmøte vert tida rekna frå avtalt tidspunkt. Manglande oppmøte kan verte fakturert.
> - Avbestilling må skje seinast 12 timar før avtalt tid.
> - Laurdag-/søndagspris gjeld òg for heilagdagar.
> - Sightseeing omfattar transport med sjåfør. Guiding er ikkje inkludert med mindre anna er avtalt.
> - Betaling skjer ved turstart eller etter avtale.
> - Eventuelle bompengar kjem i tillegg.

<br/>

**Bestilling og kontakt**
Voss Taxi
Uttrågata 19
Tlf: +47 56 51 13 40
Maxi-Taxi: +47 93 24 98 44
`;

if(regex.test(content)){
  content = content.replace(regex, '$1' + newBody + '$3');
  fs.writeFileSync('src/content/fallback.ts', content, 'utf-8');
  console.log("Replaced using regex.");
} else {
  console.log("Regex didn't match.");
}
