import type { SiteData } from '../types'
import { settings, originalGalleryImages } from './shared'
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

const germanGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image], index) => ({
  id: `gallery-original-de-${index + 1}`,
  locale: 'de',
  title,
  alt,
  image,
  sort: index + 1,
}))

const frenchGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image], index) => ({
  id: `gallery-original-fr-${index + 1}`,
  locale: 'fr',
  title,
  alt,
  image,
  sort: index + 1,
}))

const spanishGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image], index) => ({
  id: `gallery-original-es-${index + 1}`,
  locale: 'es',
  title,
  alt,
  image,
  sort: index + 1,
}))

export const fallbackByLocale: Record<'no' | 'en' | 'de' | 'fr' | 'es', SiteData> = {
  de: {
    settings,
    source: 'fallback',
    navigation: [
      { id: 'nav-home-de', locale: 'de', label: 'Startseite', href: '/de', sort: 1 },
      { id: 'nav-om-oss-de', locale: 'de', label: 'Über uns', href: '/de/om-oss', sort: 2 },
      { id: 'nav-services-de', locale: 'de', label: 'Dienstleistungen', href: '/de/tenester', sort: 3 },
      { id: 'nav-takstar-de', locale: 'de', label: 'Tarife', href: '/de/takstar', sort: 4 },
      { id: 'nav-maxi-taxi-de', locale: 'de', label: 'Maxi Taxi', href: '/de/maxi-taxi', sort: 6 },
      { id: 'nav-gallery-de', locale: 'de', label: 'Galerie', href: '/de/galleri', sort: 8 },
      { id: 'nav-ris-ros-de', locale: 'de', label: 'Feedback', href: '/de/ris-ros', sort: 9 },
      { id: 'nav-contact-de', locale: 'de', label: 'Kontakt', href: '/de/kontakt', sort: 10 },
    ],
    pages: [
      { id: 'home-de', locale: 'de', slug: 'home', eyebrow: 'Lokales Taxiunternehmen in Voss', title: 'Fahren Sie sicher mit uns von Voss.', summary: 'Voss Taxi bietet Limousinen, Minivans, Maxi-Taxis, Minibusse und Rollstuhltransporte für Einheimische und Besucher.', hero_image: settings.hero_media, blocks: [{ type: 'rich_text', title: 'Mit Vertrauen buchen', body: 'Wir haben Fahrzeuge für alle Arten von Aufgaben und bringen Sie sicher zu Zügen, Hotels, Hütten, Bergen und Veranstaltungen.' }, { type: 'rich_text', title: 'Per App buchen', body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Buchen Sie ein Taxi in der VY-App\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)' }, { type: 'cta', title: 'Per Telefon oder Rechner buchen', body: 'Rufen Sie die Taxizentrale an oder überprüfen Sie die Preise im Rechner vor Ihrer Fahrt.', href: settings.booking_url, label: 'Taxi buchen' }] },
      { id: 'services-de', locale: 'de', slug: 'tenester', eyebrow: 'Dienstleistungen', title: 'Fahrzeuge für jede Art von Fahrt.', summary: 'Transport für Gruppen, Gepäck, Rollstuhlfahrer, Touristen und alltägliche Fahrten.', blocks: [] },
      { id: 'fares-de', locale: 'de', slug: 'takstar', eyebrow: 'Tarife', title: 'Klare Tarife und schnelle Schätzungen.', summary: 'Verwenden Sie den Rechner oder rufen Sie den Fahrdienst an für Fahrten, die Planung benötigen.', blocks: [] },
      { id: 'gallery-de', locale: 'de', slug: 'galleri', eyebrow: 'Galerie', title: 'Voss Taxi unterwegs.', summary: 'Eine kleine Auswahl aus der Flotte und dem alltäglichen Taxiservice in Voss.', blocks: [{ type: 'rich_text', title: 'Bilder aus unserem Alltag', body: '![](https://cms.vosstaxi.no/uploads/20180820_124458_56fb61303c.jpg)\n\n![](https://cms.vosstaxi.no/uploads/20180716_133738_76af7f0d1e.jpg)\n\n![](https://cms.vosstaxi.no/uploads/20200531_042738_da124eacd3.jpg)' }, { type: 'contact_form' }] },
      { id: 'contact-de', locale: 'de', slug: 'kontakt', eyebrow: 'Kontakt', title: 'Kontaktieren Sie Voss Taxi.', summary: 'Rufen Sie den Fahrdienst an, senden Sie eine E-Mail oder finden Sie uns in der Uttrågata.', blocks: [] },
      { id: 'maxi-taxi-de', locale: 'de', slug: 'maxi-taxi', eyebrow: 'Voss Taxi', title: 'Maxi Taxi', summary: '', blocks: [{ type: 'rich_text', title: 'Maxi Taxi', body: '### Rollstuhltransport und Maxi-Taxi 🚐\n\n**Voss Taxi hat lange Erfahrung mit Patienten- und Rollstuhltransporten.**\n\nWir führen Rollstuhltransporte täglich durch und sind ein zuverlässiger Transportpartner in der gesamten Region.' }] },
      { id: 'ris-ros-de', locale: 'de', slug: 'ris-ros', eyebrow: 'Feedback', title: 'Feedback', summary: '', blocks: [{ type: 'rich_text', title: 'Feedback', body: 'Hier können Sie formelle Beschwerden oder Lob an uns senden.\n\n## Beschwerde einreichen\n\nWenn Sie eine formelle Beschwerde einreichen möchten, muss diese schriftlich eingereicht werden.' }, { type: 'contact_form' }] },
    ],
    services: [
      { id: 'service-de-1', locale: 'de', title: 'FLUGHAFEN', description: 'Wir bringen Sie zum und vom Flesland-Flughafen.', capacity: '1-16 Passagiere', sort: 1 },
      { id: 'service-de-2', locale: 'de', title: 'ROLLSTUHL', description: 'Voss Taxi verfügt über Fahrzeuge mit Platz für Rollstühle.', capacity: 'Bis zu 2 Rollstühle', sort: 2 },
      { id: 'service-de-3', locale: 'de', title: 'FUNDSACHEN', description: 'Haben Sie etwas verloren? Kontaktieren Sie uns.', capacity: '', sort: 3 },
      { id: 'service-de-4', locale: 'de', title: 'KINDERSITZE', description: 'Wir haben Babyschalen mit IsoFix und Kindersitze.', capacity: '', sort: 4 },
      { id: 'service-de-5', locale: 'de', title: 'FAHRRAD', description: 'Wir können auch Fahrräder mitnehmen.', capacity: '', sort: 5 },
      { id: 'service-de-6', locale: 'de', title: 'FÜHRERHUND', description: 'Alle unsere Autos und Fahrer nehmen Hunde mit.', capacity: '', sort: 6 },
    ],
    fares: [
      { id: 'fare-phone-de', locale: 'de', label: 'Zentrale', value: '56 51 13 40', note: 'Anrufen zum Buchen und für Preise', sort: 1 },
      { id: 'fare-calc-de', locale: 'de', label: 'Rechner', value: 'Online', note: 'Überprüfen Sie den Preis vor der Fahrt', sort: 2 },
      { id: 'fare-app-de', locale: 'de', label: 'App', value: 'Snappy Taxi', note: 'Buchen Sie über die App', sort: 3 },
    ],
    gallery: germanGallery,
    quickLinks: [
      { id: 'ql-book-de', locale: 'de', title: 'Taxi buchen', description: 'Gehen Sie direkt zur Buchung.', href: settings.booking_url, label: 'Buchen', sort: 1 },
      { id: 'ql-calc-de', locale: 'de', title: 'Preisrechner', description: 'Erhalten Sie einen Preis vor der Fahrt.', href: settings.fare_calculator_url, label: 'Rechner öffnen', sort: 2 },
      { id: 'ql-vy-de', locale: 'de', title: 'Vy Taxi', description: 'Buchen Sie über Vy.', href: 'https://www.vy.no/reis-med-vy/taxi', label: 'Vy Taxi', sort: 3 },
    ],
  },
  fr: {
    settings,
    source: 'fallback',
    navigation: [
      { id: 'nav-home-fr', locale: 'fr', label: 'Accueil', href: '/fr', sort: 1 },
      { id: 'nav-om-oss-fr', locale: 'fr', label: 'À propos', href: '/fr/om-oss', sort: 2 },
      { id: 'nav-services-fr', locale: 'fr', label: 'Services', href: '/fr/tenester', sort: 3 },
      { id: 'nav-takstar-fr', locale: 'fr', label: 'Tarifs', href: '/fr/takstar', sort: 4 },
      { id: 'nav-maxi-taxi-fr', locale: 'fr', label: 'Maxi Taxi', href: '/fr/maxi-taxi', sort: 6 },
      { id: 'nav-gallery-fr', locale: 'fr', label: 'Galerie', href: '/fr/galleri', sort: 8 },
      { id: 'nav-ris-ros-fr', locale: 'fr', label: 'Avis', href: '/fr/ris-ros', sort: 9 },
      { id: 'nav-contact-fr', locale: 'fr', label: 'Contact', href: '/fr/kontakt', sort: 10 },
    ],
    pages: [
      { id: 'home-fr', locale: 'fr', slug: 'home', eyebrow: 'Entreprise de taxi locale à Voss', title: 'Roulez en toute sécurité avec nous, depuis Voss.', summary: 'Voss Taxi propose des berlines, monospaces, maxi-taxis, minibus et transport en fauteuil roulant.', hero_image: settings.hero_media, blocks: [{ type: 'rich_text', title: 'Réserver en toute confiance', body: 'Nous disposons de véhicules pour tous les types de trajets et vous aiderons à vous rendre en toute sécurité.' }, { type: 'rich_text', title: 'Réserver par application', body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)' }, { type: 'cta', title: 'Réserver par téléphone', body: 'Appelez la centrale de taxis ou vérifiez les tarifs.', href: settings.booking_url, label: 'Réserver un taxi' }] },
      { id: 'services-fr', locale: 'fr', slug: 'tenester', eyebrow: 'Services', title: 'Véhicules pour tous les types de trajets.', summary: 'Transport pour les groupes, les bagages, les utilisateurs de fauteuils roulants, les touristes.', blocks: [] },
      { id: 'fares-fr', locale: 'fr', slug: 'takstar', eyebrow: 'Tarifs', title: 'Tarifs clairs et estimations rapides.', summary: 'Utilisez la calculatrice ou appelez la centrale.', blocks: [] },
      { id: 'gallery-fr', locale: 'fr', slug: 'galleri', eyebrow: 'Galerie', title: 'Voss Taxi sur la route.', summary: 'Une petite sélection de la flotte et du service de taxi quotidien à Voss.', blocks: [{ type: 'rich_text', title: 'Photos de notre quotidien', body: '![](https://cms.vosstaxi.no/uploads/20180820_124458_56fb61303c.jpg)\n\n![](https://cms.vosstaxi.no/uploads/20180716_133738_76af7f0d1e.jpg)\n\n![](https://cms.vosstaxi.no/uploads/20200531_042738_da124eacd3.jpg)' }, { type: 'contact_form' }] },
      { id: 'contact-fr', locale: 'fr', slug: 'kontakt', eyebrow: 'Contact', title: 'Contactez Voss Taxi.', summary: 'Appelez la centrale, envoyez un e-mail ou trouvez-nous à Uttrågata.', blocks: [] },
      { id: 'maxi-taxi-fr', locale: 'fr', slug: 'maxi-taxi', eyebrow: 'Voss Taxi', title: 'Maxi Taxi', summary: '', blocks: [{ type: 'rich_text', title: 'Maxi Taxi', body: '### Transport en fauteuil roulant et Maxi-Taxi 🚐\n\n**Voss Taxi a une longue expérience du transport de patients et de fauteuils roulants.**\n\nNous effectuons des transports en fauteuil roulant quotidiennement.' }] },
      { id: 'ris-ros-fr', locale: 'fr', slug: 'ris-ros', eyebrow: 'Avis', title: 'Avis', summary: '', blocks: [{ type: 'rich_text', title: 'Avis', body: 'Ici, vous pouvez nous envoyer des réclamations formelles ou des éloges.\n\n## Soumettre une réclamation\n\nSi vous souhaitez soumettre une réclamation formelle, celle-ci doit être soumise par écrit.' }, { type: 'contact_form' }] },
    ],
    services: [
      { id: 'service-fr-1', locale: 'fr', title: 'AÉROPORT', description: 'Nous vous amenons à l\'aéroport de Flesland et vous le cherchons là-bas.', capacity: '1-16 Passagers', sort: 1 },
      { id: 'service-fr-2', locale: 'fr', title: 'FAUTEUIL ROULANT', description: 'Voss Taxi dispose de véhicules avec de la place pour les fauteuils roulants.', capacity: 'Jusqu\'à 2 fauteuils roulants', sort: 2 },
      { id: 'service-fr-3', locale: 'fr', title: 'OBJETS TROUVÉS', description: 'Vous avez perdu quelque chose? Contactez-nous.', capacity: '', sort: 3 },
      { id: 'service-fr-4', locale: 'fr', title: 'SIÈGES ENFANTS', description: 'Nous avons des sièges bébé avec IsoFix et sièges enfants.', capacity: '', sort: 4 },
      { id: 'service-fr-5', locale: 'fr', title: 'VÉLO', description: 'Nous pouvons également transporter des vélos.', capacity: '', sort: 5 },
      { id: 'service-fr-6', locale: 'fr', title: 'CHIEN GUIDE', description: 'Tous nos taxis et chauffeurs acceptent les chiens.', capacity: '', sort: 6 },
    ],
    fares: [
      { id: 'fare-phone-fr', locale: 'fr', label: 'Centrale', value: '56 51 13 40', note: 'Appelez pour réserver et les tarifs', sort: 1 },
      { id: 'fare-calc-fr', locale: 'fr', label: 'Calculatrice', value: 'En ligne', note: 'Vérifiez le prix avant le trajet', sort: 2 },
      { id: 'fare-app-fr', locale: 'fr', label: 'App', value: 'Snappy Taxi', note: 'Réservez via l\'application', sort: 3 },
    ],
    gallery: frenchGallery,
    quickLinks: [
      { id: 'ql-book-fr', locale: 'fr', title: 'Réserver un taxi', description: 'Allez directement à la réservation.', href: settings.booking_url, label: 'Réserver', sort: 1 },
      { id: 'ql-calc-fr', locale: 'fr', title: 'Calculatrice tarifaire', description: 'Obtenez une estimation avant le trajet.', href: settings.fare_calculator_url, label: 'Ouvrir calculatrice', sort: 2 },
      { id: 'ql-vy-fr', locale: 'fr', title: 'Vy Taxi', description: 'Réservez via Vy.', href: 'https://www.vy.no/reis-med-vy/taxi', label: 'Vy Taxi', sort: 3 },
    ],
  },
  es: {
    settings,
    source: 'fallback',
    navigation: [
      { id: 'nav-home-es', locale: 'es', label: 'Inicio', href: '/es', sort: 1 },
      { id: 'nav-om-oss-es', locale: 'es', label: 'Sobre nosotros', href: '/es/om-oss', sort: 2 },
      { id: 'nav-services-es', locale: 'es', label: 'Servicios', href: '/es/tenester', sort: 3 },
      { id: 'nav-takstar-es', locale: 'es', label: 'Tarifas', href: '/es/takstar', sort: 4 },
      { id: 'nav-maxi-taxi-es', locale: 'es', label: 'Maxi Taxi', href: '/es/maxi-taxi', sort: 6 },
      { id: 'nav-gallery-es', locale: 'es', label: 'Galería', href: '/es/galleri', sort: 8 },
      { id: 'nav-ris-ros-es', locale: 'es', label: 'Comentarios', href: '/es/ris-ros', sort: 9 },
      { id: 'nav-contact-es', locale: 'es', label: 'Contacto', href: '/es/kontakt', sort: 10 },
    ],
    pages: [
      { id: 'home-es', locale: 'es', slug: 'home', eyebrow: 'Empresa de taxis local en Voss', title: 'Conduce seguro con nosotros, desde Voss.', summary: 'Voss Taxi ofrece sedanes, minivans, maxi-taxis, minibuses y transporte en silla de ruedas.', hero_image: settings.hero_media, blocks: [{ type: 'rich_text', title: 'Reserva con confianza', body: 'Tenemos vehículos para todos los tipos de viajes y te ayudaremos a ir de forma segura.' }, { type: 'rich_text', title: 'Reserva por aplicación', body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)' }, { type: 'cta', title: 'Reserva por teléfono', body: 'Llama a la central de taxis o verifica los precios.', href: settings.booking_url, label: 'Reserva un taxi' }] },
      { id: 'services-es', locale: 'es', slug: 'tenester', eyebrow: 'Servicios', title: 'Vehículos para todo tipo de viaje.', summary: 'Transporte para grupos, equipaje, usuarios de sillas de ruedas, turistas.', blocks: [] },
      { id: 'fares-es', locale: 'es', slug: 'takstar', eyebrow: 'Tarifas', title: 'Tarifas claras y estimaciones rápidas.', summary: 'Usa la calculadora o llama a la central.', blocks: [] },
      { id: 'gallery-es', locale: 'es', slug: 'galleri', eyebrow: 'Galería', title: 'Voss Taxi en la carretera.', summary: 'Una pequeña selección de la flota y el servicio de taxi diario en Voss.', blocks: [{ type: 'rich_text', title: 'Fotos de nuestro día a día', body: '![](https://cms.vosstaxi.no/uploads/20180820_124458_56fb61303c.jpg)\n\n![](https://cms.vosstaxi.no/uploads/20180716_133738_76af7f0d1e.jpg)\n\n![](https://cms.vosstaxi.no/uploads/20200531_042738_da124eacd3.jpg)' }, { type: 'contact_form' }] },
      { id: 'contact-es', locale: 'es', slug: 'kontakt', eyebrow: 'Contacto', title: 'Contacta con Voss Taxi.', summary: 'Llama a la central, envía un correo o encuéntranos en Uttrågata.', blocks: [] },
      { id: 'maxi-taxi-es', locale: 'es', slug: 'maxi-taxi', eyebrow: 'Voss Taxi', title: 'Maxi Taxi', summary: '', blocks: [{ type: 'rich_text', title: 'Maxi Taxi', body: '### Transporte en silla de ruedas y Maxi-Taxi 🚐\n\n**Voss Taxi tiene una larga experiencia en transporte de pacientes y sillas de ruedas.**\n\nRealizamos transportes en silla de ruedas diariamente.' }] },
      { id: 'ris-ros-es', locale: 'es', slug: 'ris-ros', eyebrow: 'Comentarios', title: 'Comentarios', summary: '', blocks: [{ type: 'rich_text', title: 'Comentarios', body: 'Aquí puede enviarnos quejas formales o elogios.\n\n## Enviar una queja\n\nSi desea presentar una queja formal, debe presentarse por escrito.' }, { type: 'contact_form' }] },
    ],
    services: [
      { id: 'service-es-1', locale: 'es', title: 'AEROPUERTO', description: 'Te llevamos al aeropuerto de Flesland y te recogemos allá.', capacity: '1-16 Pasajeros', sort: 1 },
      { id: 'service-es-2', locale: 'es', title: 'SILLA DE RUEDAS', description: 'Voss Taxi tiene vehículos con espacio para sillas de ruedas.', capacity: 'Hasta 2 sillas de ruedas', sort: 2 },
      { id: 'service-es-3', locale: 'es', title: 'OBJETOS PERDIDOS', description: '¿Perdiste algo? Contáctanos.', capacity: '', sort: 3 },
      { id: 'service-es-4', locale: 'es', title: 'ASIENTOS INFANTILES', description: 'Tenemos asientos de bebé con IsoFix y asientos infantiles.', capacity: '', sort: 4 },
      { id: 'service-es-5', locale: 'es', title: 'BICICLETA', description: 'También podemos transportar bicicletas.', capacity: '', sort: 5 },
      { id: 'service-es-6', locale: 'es', title: 'PERRO GUÍA', description: 'Todos nuestros taxis y conductores aceptan perros.', capacity: '', sort: 6 },
    ],
    fares: [
      { id: 'fare-phone-es', locale: 'es', label: 'Central', value: '56 51 13 40', note: 'Llama para reservar y tarifas', sort: 1 },
      { id: 'fare-calc-es', locale: 'es', label: 'Calculadora', value: 'En línea', note: 'Verifica el precio antes del viaje', sort: 2 },
      { id: 'fare-app-es', locale: 'es', label: 'App', value: 'Snappy Taxi', note: 'Reserva via la aplicación', sort: 3 },
    ],
    gallery: spanishGallery,
    quickLinks: [
      { id: 'ql-book-es', locale: 'es', title: 'Reserva un taxi', description: 'Ve directamente a la reserva.', href: settings.booking_url, label: 'Reservar', sort: 1 },
      { id: 'ql-calc-es', locale: 'es', title: 'Calculadora de tarifas', description: 'Obtén una estimación antes del viaje.', href: settings.fare_calculator_url, label: 'Abrir calculadora', sort: 2 },
      { id: 'ql-vy-es', locale: 'es', title: 'Vy Taxi', description: 'Reserva via Vy.', href: 'https://www.vy.no/reis-med-vy/taxi', label: 'Vy Taxi', sort: 3 },
    ],
  },
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
            body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Bestill Taxi i VY appen\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
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
            type: 'contact_form'
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

![](https://cms.vosstaxi.no/uploads/DJI_0168_af2b600165.JPG)

![](https://cms.vosstaxi.no/uploads/20240514_203506_53aa74368f.jpg)

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

I tillegg er da kun dei opplysningar som du sjølv oppgjev til oss igjennom appen, som lagrast. Me vil ikkje be om opplysningar som me ikkje treng for å kunna oppfylla våre forplittelsar ovanfor deg.

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
      },
      {
        id: 'page-generell-informasjon-no',
        locale: 'no',
        slug: 'generell-informasjon',
        title: 'Taxi/drosje',
        eyebrow: 'Reglar og rettar',
        blocks: [
          {
            type: 'rich_text',
            body: `# Taxi/drosje

Klage først til taxien, dersom ho er forseinka eller køyrer feil. Blir de ikkje einige, kan du ta saken inn til Forbrukartilsynet.

## På denne sida

- Kan du velje den drosjen du ønskjer?
- Kva kan du krevje dersom taxien køyrer feil?
- Kva kan du krevje dersom taxien er forseinka eller ikkje kjem?
- Korleis går du fram for å klage?

## Kan du velje den drosjen du ønskjer?

Det er fritt val av taxi i Noreg. Du kan velje den bilen eller det selskapet du ønskjer – også i drosjeköen.

## Kva kan du krevje dersom taxien køyrer feil?

Dersom drosjesjåføren køyrer feil kan du be han om å stoppe taksameeteret, og dersom det viser seg at sjåføren ikkje har valt den raskaste vegen, vil du kunne krevje prisavslag. Dette bør du aller helst gjere på staden. Dersom du ikkje når fram, bør du så snart som mogleg ta dette opp skriftleg med taxisentralen.

## Kva kan du krevje dersom taxien er forseinka eller ikkje kjem?

Du har krav på erstatning for økonomiske tap som oppstår dersom taxien er forseinka eller ikkje kjem. Hugs at du er ansvarleg for å begrense eventuelle økonomiske tap, ved til dømes å bestille ein ny taxi eller velje eit anna transportmiddel.

I praksis betyr dette at dersom du har rekna rimelig tid, men ikkje rekk flyet fordi taxien ikkje dukka opp, vil du kunne krevje erstatning for ekstrakostnadane.

OBS! Kravet på erstatning fell bort dersom forsinkinga skyldar forhold utanfor selskapet sitt kontroll, slik som trafikkulykker eller ekstreme vêrforhold.

Nokre selskap har også ordningar som går utanfor dine lovpålagte rettar, så det kan vere lurt å sjekke transportvillkåra, dersom taxien ikkje kjem som avtalt.

## Korleis går du fram for å klage?

### Klage til taxien/taxisentralen

Om du har vore uheileg, bør det klagast skriftleg til taxisentralen så snart som mogleg. Det er viktig å få med opplysningar om den bestilte turen, og å dokumentere ekstrakostnadar du har hatt.

### Ta saken til mekling

Dersom du ikkje kjem til samstund med taxisentralen, kan du ta saken til Forbrukartilsynet.

### Ta saken inn til Forbrukartilsynet for mekling`
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
            body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Book Taxi in the VY app\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
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
        slug: 'tenester',
        eyebrow: 'Services',
        title: 'Vehicles for every kind of trip.',
        summary: 'Transport for groups, luggage, wheelchair users, tourists and everyday travel.',
        blocks: [],
      },
      {
        id: 'fares-en',
        locale: 'en',
        slug: 'takstar',
        eyebrow: 'Fares',
        title: 'Clear fares and quick estimates.',
        summary: 'Use the calculator or call dispatch for trips that need planning.',
        blocks: [],
      },
      {
        id: 'gallery-en',
        locale: 'en',
        slug: 'galleri',
        eyebrow: 'Gallery',
        title: 'Voss Taxi on the road.',
        summary: 'A small selection from the fleet and everyday taxi service in Voss.',
        blocks: [],
      },
      {
        id: 'contact-en',
        locale: 'en',
        slug: 'kontakt',
        eyebrow: 'Contact',
        title: 'Contact Voss Taxi.',
        summary: 'Call dispatch, send an email or find us in Uttrågata.',
        blocks: [],
      },
      {
        id: 'page-wheelchair-en',
        locale: 'en',
        slug: 'rullestol',
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
            type: 'contact_form'
          },
          {
            type: 'cta',
            title: 'General information',
            body: 'Rules, rights, and general information about taxis.',
            href: '/en/generell-informasjon',
            label: 'Read more'
          }
        ]
      },
      {
        id: 'generell-informasjon-en',
        locale: 'en',
        slug: 'generell-informasjon',
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
        id: 'generell-informasjon-de',
        locale: 'de',
        slug: 'generell-informasjon',
        title: 'Allgemeine Informationen',
        blocks: [
          {
            type: 'rich_text',
            body: `# Taxi/Droschke

Beschweren Sie sich zuerst beim Taxi, wenn es verspätet ist oder falsch fährt. Wenn Sie sich nicht einigen können, können Sie den Fall der Verbraucherbehörde (Forbrukertilsynet) melden.

## Auf dieser Seite

- Können Sie das Taxi wählen, das Sie möchten?
- Was können Sie verlangen, wenn das Taxi falsch fährt?
- Was können Sie verlangen, wenn das Taxi verspätet ist oder nicht ankommt?
- Wie gehen Sie vor, um sich zu beschweren?

## Können Sie das Taxi wählen, das Sie möchten?

In Norwegen besteht die freie Taxiwahl. Sie können das Auto oder das Unternehmen wählen, das Sie möchten – auch in der Taxiwarteschlange.

## Was können Sie verlangen, wenn das Taxi falsch fährt?

Wenn der Taxifahrer falsch fährt, können Sie ihn bitten, das Taxameter anzuhalten. Wenn sich herausstellt, dass der Fahrer nicht die schnellste Route gewählt hat, können Sie einen Preisnachlass verlangen. Dies sollten Sie idealerweise vor Ort tun. Wenn Sie nicht erfolgreich sind, sollten Sie dies so bald wie möglich schriftlich mit der Taxizentrale besprechen.

## Was können Sie verlangen, wenn das Taxi verspätet ist oder nicht ankommt?

Sie haben Anspruch auf Schadensersatz für finanzielle Verluste, die entstehen, wenn das Taxi verspätet ist oder nicht ankommt. Denken Sie daran, dass Sie dafür verantwortlich sind, etwaige finanzielle Verluste zu begrenzen, beispielsweise durch die Bestellung eines neuen Taxis oder die Wahl eines anderen Verkehrsmittels.

In der Praxis bedeutet dies, dass Sie Schadensersatz für die Zusatzkosten fordern können, wenn Sie angemessen geplant haben, aber Ihren Flug verpassen, weil das Taxi nicht auftauchte.

ACHTUNG! Der Schadensersatzanspruch entfällt, wenn die Verspätung auf Umstände zurückzuführen ist, die außerhalb der Kontrolle des Unternehmens liegen, wie z. B. Verkehrsunfälle oder extreme Wetterbedingungen.

Einige Unternehmen bieten auch Regelungen an, die über Ihre gesetzlichen Rechte hinausgehen. Es kann daher sinnvoll sein, die Transportbedingungen zu überprüfen, wenn das Taxi nicht wie vereinbart ankommt.

## Wie gehen Sie vor, um sich zu beschweren?

### Beschwerde beim Taxi/Taxizentrale

Wenn Sie Pech hatten, sollten Sie sich so bald wie möglich schriftlich an die Taxizentrale beschweren. Es ist wichtig, Informationen über die gebuchte Fahrt beizufügen und etwaige Zusatzkosten zu dokumentieren.

### Den Fall zur Vermittlung bringen

Wenn Sie sich mit der Taxizentrale nicht einigen können, können Sie den Fall der Verbraucherbehörde vorlegen.

### Den Fall bei der Verbraucherbehörde zur Vermittlung einreichen`
          }
        ]
      },
      {
        id: 'generell-informasjon-fr',
        locale: 'fr',
        slug: 'generell-informasjon',
        title: 'Informations générales',
        blocks: [
          {
            type: 'rich_text',
            body: `# Taxi

Plaignez-vous d'abord auprès du taxi s'il est en retard ou s'il prend une mauvaise route. Si vous ne pouvez pas vous mettre d'accord, vous pouvez porter l'affaire à l'autorité de protection des consommateurs (Forbrukertilsynet).

## Sur cette page

- Pouvez-vous choisir le taxi que vous voulez ?
- Que pouvez-vous exiger si le taxi prend une mauvaise route ?
- Que pouvez-vous exiger si le taxi est en retard ou n'arrive pas ?
- Comment procédez-vous pour vous plaindre ?

## Pouvez-vous choisir le taxi que vous voulez ?

Il existe un libre choix des taxis en Norvège. Vous pouvez choisir la voiture ou la compagnie que vous voulez – même dans la file d'attente des taxis.

## Que pouvez-vous exiger si le taxi prend une mauvaise route ?

Si le chauffeur de taxi prend une mauvaise route, vous pouvez lui demander d'arrêter le taximètre. S'il s'avère que le chauffeur n'a pas choisi le trajet le plus rapide, vous pouvez exiger une réduction de prix. Vous devriez idéalement le faire sur place. Si vous n'avez pas de succès, vous devriez soulever cette question par écrit auprès de la centrale de taxis dès que possible.

## Que pouvez-vous exiger si le taxi est en retard ou n'arrive pas ?

Vous avez le droit à une indemnisation pour les pertes financières qui surviennent si le taxi est en retard ou n'arrive pas. N'oubliez pas que vous êtes responsable de limiter les pertes financières éventuelles, par exemple en commandant un nouveau taxi ou en choisissant un autre moyen de transport.

En pratique, cela signifie que si vous avez prévu un délai raisonnable mais que vous manquez votre vol parce que le taxi ne s'est pas présenté, vous pouvez demander une indemnisation pour les frais supplémentaires.

ATTENTION ! Le droit à indemnisation disparaît si le retard est dû à des circonstances échappant au contrôle de l'entreprise, telles que les accidents de circulation ou les conditions météorologiques extrêmes.

Certaines entreprises proposent également des arrangements qui dépassent vos droits légaux. Il peut donc être judicieux de vérifier les conditions de transport si le taxi n'arrive pas comme convenu.

## Comment procédez-vous pour vous plaindre ?

### Plainte auprès du taxi/centrale de taxis

Si vous avez eu de la malchance, vous devez vous plaindre par écrit à la centrale de taxis dès que possible. Il est important d'inclure des informations sur le trajet réservé et de documenter les frais supplémentaires que vous avez engagés.

### Porter l'affaire à la médiation

Si vous ne pouvez pas vous mettre d'accord avec la centrale de taxis, vous pouvez porter l'affaire à l'autorité de protection des consommateurs.

### Porter l'affaire à l'autorité de protection des consommateurs pour la médiation`
          }
        ]
      },
      {
        id: 'generell-informasjon-es',
        locale: 'es',
        slug: 'generell-informasjon',
        title: 'Información general',
        blocks: [
          {
            type: 'rich_text',
            body: `# Taxi

Primero, quéjese al taxi si está retrasado o conduce de forma incorrecta. Si no pueden llegar a un acuerdo, puede llevar el caso a la autoridad de protección del consumidor (Forbrukertilsynet).

## En esta página

- ¿Puede elegir el taxi que desea?
- ¿Qué puede exigir si el taxi conduce de forma incorrecta?
- ¿Qué puede exigir si el taxi está retrasado o no llega?
- ¿Cómo procede para presentar una queja?

## ¿Puede elegir el taxi que desea?

Existe libre elección de taxis en Noruega. Puede elegir el coche o la empresa que desea – incluso en la fila de espera de taxis.

## ¿Qué puede exigir si el taxi conduce de forma incorrecta?

Si el taxista conduce de forma incorrecta, puede pedirle que detenga el taxímetro. Si resulta que el conductor no eligió la ruta más rápida, puede exigir una reducción de precio. Lo ideal es hacerlo en el acto. Si no tiene éxito, debe plantear esto por escrito con la central de taxis lo antes posible.

## ¿Qué puede exigir si el taxi está retrasado o no llega?

Tiene derecho a una indemnización por las pérdidas financieras que se produzcan si el taxi está retrasado o no llega. Recuerde que usted es responsable de limitar cualquier pérdida financiera, por ejemplo, pidiendo un nuevo taxi o eligiendo otro medio de transporte.

En la práctica, esto significa que si ha calculado un tiempo razonable pero pierde su vuelo porque el taxi no llegó, puede exigir una indemnización por los gastos adicionales.

¡ATENCIÓN! El derecho a indemnización caduca si el retraso se debe a circunstancias fuera del control de la empresa, como accidentes de tráfico o condiciones meteorológicas extremas.

Algunas empresas también ofrecen acuerdos que van más allá de sus derechos legales, por lo que puede ser prudente verificar las condiciones de transporte si el taxi no llega como se acordó.

## ¿Cómo procede para presentar una queja?

### Queja al taxi/central de taxis

Si ha tenido mala suerte, debe presentar una queja por escrito a la central de taxis lo antes posible. Es importante incluir información sobre el viaje reservado y documentar los gastos adicionales que ha incurrido.

### Llevar el caso a la mediación

Si no puede llegar a un acuerdo con la central de taxis, puede llevar el caso a la autoridad de protección del consumidor.

### Llevar el caso a la autoridad de protección del consumidor para la mediación`
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

![](https://cms.vosstaxi.no/uploads/1594031017144_00c7caf4_5ac3_4a54_ba3b_253f2a56aad7_4f98a48e94.jpg)

### Dei første haldeplassane

I dei første tiåra heldt drosjene til sentralt på Vossevangen. Gamle kjelder tyder på at drosjene ei tid stod ved Fiskartorget, og seinare bak Voss Bokhandel. Etter kvart vart Hestavangen eit viktig haldepunkt for drosjene.

Gamle bilete kan tyda på at drosjene var knytte til Hestavangen alt kring 1930-åra, sjølv om den faste brakka som mange hugsar, kom seinare.

![](https://cms.vosstaxi.no/uploads/1594033590475_920ec5d0_fa60_4b9c_b132_45045145a9f9_14ca3489ef.jpg)

### Brakka på Hestavangen

Etter krigen fekk drosjeeigarane, saman med Voss lastebilforening, avtale med Norsk Brændselolje/BP om drivstoff og eigen tank. Som del av denne avtalen fekk drosjesjåførane også husrom i form av ei brakke frå BP.

Denne brakka var først plassert nedom skulehaugen der som Voss parkeringshus heldt til i dag. Deretter vart ho flytta bort på Hestavangen tidleg på 1950-talet. Her vart ho plassert attmed huset til Arne Nilsen. Ho vart etter kvart eit fast samlingspunkt for drosjene på Voss – både som venterom, arbeidsplass og sosial møteplass for sjåførane.

![](https://cms.vosstaxi.no/uploads/IMG_20200706_0003_b681eecd88.jpg)

På 1960-talet kom det planar om nytt helsehus på området der brakka stod. I samband med dette vart det diskutert nye lokale for drosjene, og i 1968 vart brakka flytta vestover på plassen. Flyttinga skulle eigentleg vera mellombels, men slik gjekk det ikkje. Planane om nye lokale vart aldri løyste slik drosjene hadde sett føre seg, og brakka vart ståande i bruk heilt fram til 2014.

![](https://cms.vosstaxi.no/uploads/1594033950011_0dbdd0e0_d971_4beb_aff2_e793c9dbad3c_19c793f208.jpg)

For mange vossingar vart den raude og kvite taxibua eit kjent innslag i sentrum. Ho vart ein del av bybiletet, og er framleis eit syn mange knyter til drosjehistoria på Voss.

### Flytting

I 2014 flytta Voss Taxi inn i nye lokale ved Uttrågata 19, rett over gata frå den gamle bua. For sjåførane vart dette på mange måtar å koma heimatt – tilbake til området der drosjene i generasjonar hadde hatt sitt naturlege utgangspunkt.

Dei nye lokala gav betre arbeidsforhold, meir plass og eit oppvarma venterom for kundar. Samstundes vart den historiske tilknytinga til Hestavangen og Vossevangen teken vidare.

![](https://cms.vosstaxi.no/uploads/1594033487309_3673ee32_eb67_4713_8214_ebb1da48e841_f59ab126c6.jpg)

### Voss Taxi i dag

Voss Taxi har utvikla seg frå eit lokalt drosjeeigarlag til ein moderne taxisentral med døgnbemanning, digitale bestillingsløysingar og eit breitt transporttilbod.

I dag køyrer Voss Taxi både ordinære taxiturar, pasientreiser, skuletransport, rullestoltransport, maxitaxi, turistkøyring og faste transportoppdrag for offentlege og private kundar.

Sjølv om teknologien, bilane og organiseringa har endra seg mykje sidan 1930, er hovudoppgåva den same: å få folk trygt fram.

### Frå SA til AS

Voss Taxi har gjennom åra hatt fleire organisasjonsformer og namn. Frå starten som drosjeeigarlag vart verksemda seinare kjend som Voss Drosjebilsentral. I 2014 vart namnet Voss Taxi SA teke i bruk.

I 2026 vart arbeidet med ny selskapsstruktur sett i gang, og Voss Taxi AS vart etablert som eit nytt steg i utviklinga av sentralen. Målet er å skapa ei meir framtidsretta og robust organisering, samstundes som den lokale forankringa og eigarskapen hjå løyvehavarane vert vidareført.

Voss Taxi byggjer vidare på historia frå 1930 – med røter i lokalt eigarskap, praktisk samarbeid og trygg transport for folk på Voss.

![](https://cms.vosstaxi.no/uploads/1594031162280_775ca4e4_b462_442f_9e94_103488400b80_991d51b7bf.jpg)

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
