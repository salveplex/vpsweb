const fs = require('fs');

let content = fs.readFileSync('src/content/fallback.ts', 'utf-8');

const regex = /(id:\s*'page-maxi-taxi-no'[\s\S]*?body:\s*`)([\s\S]*?)(`\n\s*\}\n\s*\])/;

const newBody = `### Rullestolbil og Maxi-Taxi 🚐

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

![Maxi Taxi bil](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/DJI_0168.JPG?etag=%226fb506-66495405%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&quality=85)

![Rullestolbil rampe](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240514_203506.jpg?etag=%225098a2-66495519%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&quality=85)

---

### 📱 Rask bestilling
Ønskjer du å bestille via TaxiFix-appen? Skann QR-koden under for å laste ned og bestille.

![QR Kode bestilling Voss Taxi](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/QR-Kode%20bestilling%20Voss%20Taxi.png?etag=%22333-5f09be43%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=200%2B200)
`;

if(regex.test(content)){
  content = content.replace(regex, '$1' + newBody + '$3');
  fs.writeFileSync('src/content/fallback.ts', content, 'utf-8');
  console.log("Replaced using regex.");
} else {
  console.log("Regex didn't match.");
}
