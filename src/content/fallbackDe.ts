import type { SiteData } from '../types'
import { settings, originalGalleryImages } from './shared'

const deGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image]: string[], index: number) => ({
  id: `gallery-original-de-${index + 1}`,
  locale: 'de',
  title,
  alt,
  image,
  sort: index + 1,
}))

export const fallbackDe: SiteData = {
  settings,
  source: 'fallback',
  navigation: [
    { id: 'nav-home-de', locale: 'de', label: 'Startseite', href: '/de', sort: 1 },
    { id: 'nav-om-oss-de', locale: 'de', label: 'Über uns', href: '/de/om-oss', sort: 2 },
    { id: 'nav-services-de', locale: 'de', label: 'Dienstleistungen', href: '/de/tenester', sort: 3 },
    { id: 'nav-pakker-de', locale: 'de', label: 'Pakete', href: '/de/pakker', sort: 4 },
    { id: 'nav-maxi-taxi-de', locale: 'de', label: 'Maxi Taxi', href: '/de/maxi-taxi', sort: 6 },
    { id: 'nav-bli-sjafor-de', locale: 'de', label: 'Fahrer werden', href: '/de/bli-sjafor', sort: 7 },
    { id: 'nav-gallery-de', locale: 'de', label: 'Galerie', href: '/de/galleri', sort: 8 },
    { id: 'nav-ris-ros-de', locale: 'de', label: 'Feedback', href: '/de/ris-ros', sort: 9 },
    { id: 'nav-contact-de', locale: 'de', label: 'Kontakt', href: '/de/kontakt', sort: 10 },
  ],
  pages: [
    {
      id: 'home-de',
      locale: 'de',
      slug: 'home',
      eyebrow: 'Lokales Taxiunternehmen in Voss',
      title: 'Fahren Sie sicher mit uns, aus Voss.',
      summary:
        'Voss Taxi bietet Limousinen, Minivans, Maxi-Taxis, Minibusse und Rollstuhltransporte für Einheimische und Besucher.',
      hero_image: settings.hero_media,
      blocks: [
        {
          type: 'rich_text',
          title: 'Mit Vertrauen buchen',
          body: 'Wir haben Fahrzeuge für alle Arten von Aufträgen und bringen Sie sicher zu Zügen, Hotels, Hütten, Bergen und Veranstaltungen.',
        },
        {
          type: 'rich_text',
          title: 'Per App buchen',
          body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Buchen Sie ein Taxi in der VY-App\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
        },
        {
          type: 'cta',
          title: 'Telefonisch oder per Kalkulator buchen',
          body: 'Rufen Sie die Taxizentrale an oder überprüfen Sie die Preise im Rechner vor Ihrer Fahrt.',
          href: settings.booking_url,
          label: 'Taxi buchen',
        },
      ],
    },
    {
      id: 'services-de',
      locale: 'de',
      slug: 'tenester',
      eyebrow: 'Dienstleistungen',
      title: 'Fahrzeuge für jede Art von Fahrt.',
      summary: 'Transport für Gruppen, Gepäck, Rollstuhlfahrer, Touristen und alltägliche Fahrten.',
      blocks: [],
    },
    {
      id: 'fares-de',
      locale: 'de',
      slug: 'takstar',
      eyebrow: 'Tarife',
      title: 'Klare Tarife und schnelle Schätzungen.',
      summary: 'Verwenden Sie den Rechner oder rufen Sie den Fahrdienst für Fahrten an, die Planung benötigen.',
      blocks: [],
    },
    {
      id: 'gallery-de',
      locale: 'de',
      slug: 'galleri',
      eyebrow: 'Galerie',
      title: 'Voss Taxi unterwegs.',
      summary: 'Eine kleine Auswahl aus der Flotte und dem alltäglichen Taxiservice in Voss.',
      blocks: [],
    },
    {
      id: 'contact-de',
      locale: 'de',
      slug: 'kontakt',
      eyebrow: 'Kontakt',
      title: 'Kontaktieren Sie Voss Taxi.',
      summary: 'Rufen Sie den Fahrdienst an, senden Sie eine E-Mail oder finden Sie uns in der Uttrågata.',
      blocks: [],
    },
    {
      id: 'page-wheelchair-de',
      locale: 'de',
      slug: 'rullestol',
      title: 'Rollstuhl',
      blocks: [
        {
          type: 'rich_text',
          title: 'Rollstuhl',
          body: 'Wir haben Fahrzeuge, die für Rollstühle ausgestattet sind.'
        }
      ]
    },
    {
      id: 'page-ris-ros-de',
      locale: 'de',
      slug: 'ris-ros',
      title: 'Feedback',
      blocks: [
        {
          type: 'rich_text',
          title: 'Feedback',
          body: 'Hier können Sie formelle Beschwerden oder Lob an uns senden.\n\n## Beschwerde einreichen\n\nWenn Sie eine formelle Beschwerde einreichen möchten, muss diese schriftlich eingereicht werden, indem Sie die unten stehenden Optionen verwenden oder per E-Mail an post@vosstaxi.no senden.\nWir senden Ihnen innerhalb von 14 Tagen eine schriftliche Bestätigung, dass die Beschwerde eingegangen ist, zusammen mit Informationen über die voraussichtliche Bearbeitungszeit.\n\nFormelle Beschwerden werden schriftlich beantwortet. Die Dokumentation zur Beschwerde wird bei uns drei Jahre nach Abschluss der Beschwerdebearbeitung aufbewahrt.\n\n## Geben Sie uns Lob oder Kritik\n\nWir freuen uns über Ihre Meinung, Ihr Feedback und Verbesserungsvorschläge. Dies ist die beste Hilfe, die Sie uns geben können, um noch besser zu werden.'
        },
        {
          type: 'contact_form'
        },
        {
          type: 'cta',
          title: 'Allgemeine Informationen',
          body: 'Regeln, Rechte und allgemeine Informationen zu Taxis.',
          href: '/de/generell-informasjon',
          label: 'Mehr erfahren'
        }
      ]
    },
    {
      id: 'page-maxi-taxi-de',
      locale: 'de',
      slug: 'maxi-taxi',
      title: 'Maxi Taxi',
      eyebrow: 'Voss Taxi',
      summary: '',
      blocks: [
        {
          type: 'rich_text',
          title: 'Maxi Taxi',
          body: `### Rollstuhltransport und Maxi-Taxi 🚐

**Voss Taxi hat lange Erfahrung mit Patienten- und Rollstuhltransporten. Wir führen Rollstuhltransporte täglich durch und sind ein zuverlässiger Transportpartner in der gesamten Region.**

Alle unsere ortskundigen Fahrer sind geschult und genehmigt, um mit verschiedenen Arten von Rollstuhlfahrern umzugehen. Wir legen immer großen Wert auf die Sicherheit und den Komfort der Passagiere während der gesamten Fahrt.

Wir führen jedes Jahr eine große Anzahl von Transporten für Helse Bergen durch und haben jahrelange Erfahrung mit dem Transport von Passagieren mit besonderem Unterstützungsbedarf. Dies macht uns zu einem natürlichen und professionellen Transportpartner auch für private Pflegeeinrichtungen, Seniorenzentren und andere, die sicheren Transport für ältere Menschen und Mobilitätsbeeinträchtigte benötigen.

> 📞 **Wir sind täglich erreichbar – das ganze Jahr über.**
> Rufen Sie (+47) 93 24 98 44 an oder senden Sie eine E-Mail an maxi@vosstaxi.no

---

### Unsere Fahrzeugflotte für Rollstuhltransport ♿

Wir verfügen derzeit über:
- **2 Minibus** speziell ausgestattet, um einen oder zwei Rollstühle zu befördern
- **3 x 8-Platz-Rollstuhltransporter**, alle mit sicheren und stabilen Rampen für leichten und bequemen Einstieg

Hier können Sie ein paar unserer Fahrzeuge im Einsatz sehen:

![](https://cms.vosstaxi.no/uploads/DJI_0168_af2b600165.JPG)

![](https://cms.vosstaxi.no/uploads/20240514_203506_53aa74368f.jpg)

---
`
        }
      ]
    }
  ],
  services: [
    {
      id: 'service-de-1',
      locale: 'de',
      title: 'ZUM FLIEGEN',
      description: 'Wenn Sie fliegen möchten, bringen wir Sie zum und vom Flesland-Flughafen. Rufen Sie uns an oder senden Sie eine E-Mail für weitere Informationen und einen Festpreis.',
      capacity: '1-16 Passagiere',
      sort: 1,
    },
    {
      id: 'service-de-2',
      locale: 'de',
      title: 'ROLLSTUHL',
      description: 'Voss Taxi hat eine vielfältige Fahrzeugflotte mit Platz für zusammenklappbare Rollstühle, aber bei Bedarf für einen elektrischen Rollstuhl oder zum Fahren im Rollstuhl während der Fahrt haben wir zwei 16-Platz-MaxiTaxis mit Platz für 2 Benutzer gleichzeitig. Plus 3 Stück 8-Platz-Rollstuhltransporter, alle mit Rampe für leichten Einstieg.',
      capacity: 'Bis zu 2 Rollstühle',
      sort: 2,
    },
    {
      id: 'service-de-3',
      locale: 'de',
      title: 'FUNDSACHEN',
      description: 'Haben Sie etwas verloren? Kontaktieren Sie uns. Wir bekommen ständig Handys, Handschuhe, Hüte, Taschen, Brillen, Schals und Regenschirme. Alle Gegenstände, die in unseren Autos gefunden werden, werden in unserem Depot aufbewahrt.',
      capacity: '',
      sort: 3,
    },
    {
      id: 'service-de-4',
      locale: 'de',
      title: 'KINDERSITZE',
      description: 'Wir haben Babyschalen mit IsoFix und Stützbase für Kinder jeden Alters. Außerdem haben wir eine große Auswahl an Sitzerhöhern und Kindersitzen.',
      capacity: '',
      sort: 4,
    },
    {
      id: 'service-de-5',
      locale: 'de',
      title: 'FAHRRAD?',
      description: 'Wir haben auch die Möglichkeit, ein Fahrrad mitzunehmen. Bitte teilen Sie dies im Voraus mit, damit wir einen Ständer mitbringen.',
      capacity: '',
      sort: 5,
    },
    {
      id: 'service-de-6',
      locale: 'de',
      title: 'FÜHRERHUND',
      description: 'Alle unsere Autos und Fahrer nehmen Hunde mit.',
      capacity: '',
      sort: 6,
    },
  ],
  fares: [
    { id: 'fare-phone-de', locale: 'de', label: 'Zentrale', value: '56 51 13 40', note: 'Anrufen zum Buchen und für Preise', sort: 1 },
    { id: 'fare-calc-de', locale: 'de', label: 'Rechner', value: 'Online', note: 'Überprüfen Sie den geschätzten Preis vor Ihrer Fahrt', sort: 2 },
    { id: 'fare-app-de', locale: 'de', label: 'App', value: 'Snappy Taxi', note: 'Buchen Sie über die App aus dem App Store oder Google Play', sort: 3 },
  ],
  gallery: deGallery,
  quickLinks: [
    { id: 'ql-book-de', locale: 'de', title: 'Taxi buchen', description: 'Gehen Sie direkt zur Buchung.', href: settings.booking_url, label: 'Buchen', sort: 1 },
    { id: 'ql-calc-de', locale: 'de', title: 'Preisrechner', description: 'Erhalten Sie einen Preisschätzung vor der Fahrt.', href: settings.fare_calculator_url, label: 'Rechner öffnen', sort: 2 },
    { id: 'ql-vy-de', locale: 'de', title: 'Vy Taxi', description: 'Buchen Sie über Vy, wo es passt.', href: 'https://www.vy.no/reis-med-vy/taxi', label: 'Vy Taxi', sort: 3 },
  ],
}
