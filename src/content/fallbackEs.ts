import type { SiteData } from '../types'
import { settings, originalGalleryImages } from './shared'

const esGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image]: string[], index: number) => ({
  id: `gallery-original-es-${index + 1}`,
  locale: 'es',
  title,
  alt,
  image,
  sort: index + 1,
}))

export const fallbackEs: SiteData = {
  settings,
  source: 'fallback',
  navigation: [
    { id: 'nav-home-es', locale: 'es', label: 'Inicio', href: '/es', sort: 1 },
    { id: 'nav-om-oss-es', locale: 'es', label: 'Sobre nosotros', href: '/es/om-oss', sort: 2 },
    { id: 'nav-services-es', locale: 'es', label: 'Servicios', href: '/es/tenester', sort: 3 },
    { id: 'nav-pakker-es', locale: 'es', label: 'Paquetes', href: '/es/pakker', sort: 4 },
    { id: 'nav-maxi-taxi-es', locale: 'es', label: 'Maxi Taxi', href: '/es/maxi-taxi', sort: 6 },
    { id: 'nav-bli-sjafor-es', locale: 'es', label: 'Convertirse en conductor', href: '/es/bli-sjafor', sort: 7 },
    { id: 'nav-gallery-es', locale: 'es', label: 'Galería', href: '/es/galleri', sort: 8 },
    { id: 'nav-ris-ros-es', locale: 'es', label: 'Comentarios', href: '/es/ris-ros', sort: 9 },
    { id: 'nav-contact-es', locale: 'es', label: 'Contacto', href: '/es/kontakt', sort: 10 },
  ],
  pages: [
    {
      id: 'home-es',
      locale: 'es',
      slug: 'home',
      eyebrow: 'Empresa de taxis local en Voss',
      title: 'Conduce seguro con nosotros, desde Voss.',
      summary:
        'Voss Taxi ofrece sedanes, minivans, maxi-taxis, minibuses y transporte en silla de ruedas para habitantes y visitantes.',
      hero_image: settings.hero_media,
      blocks: [
        {
          type: 'rich_text',
          title: 'Reserva con confianza',
          body: 'Tenemos vehículos para todos los tipos de viajes y te ayudaremos a ir de forma segura hacia y desde estaciones, hoteles, cabañas, montañas y eventos.',
        },
        {
          type: 'rich_text',
          title: 'Reserva por aplicación',
          body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Reserva un taxi en la aplicación VY\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
        },
        {
          type: 'cta',
          title: 'Reserva por teléfono o calculadora',
          body: 'Llama a la central de taxis o verifica los precios en la calculadora antes de tu viaje.',
          href: settings.booking_url,
          label: 'Reserva un taxi',
        },
      ],
    },
    {
      id: 'services-es',
      locale: 'es',
      slug: 'tenester',
      eyebrow: 'Servicios',
      title: 'Vehículos para todo tipo de viaje.',
      summary: 'Transporte para grupos, equipaje, usuarios de sillas de ruedas, turistas y viajes cotidianos.',
      blocks: [],
    },
    {
      id: 'fares-es',
      locale: 'es',
      slug: 'takstar',
      eyebrow: 'Tarifas',
      title: 'Tarifas claras y estimaciones rápidas.',
      summary: 'Usa la calculadora o llama a la central para viajes que requieren planificación.',
      blocks: [],
    },
    {
      id: 'gallery-es',
      locale: 'es',
      slug: 'galleri',
      eyebrow: 'Galería',
      title: 'Voss Taxi en la carretera.',
      summary: 'Una pequeña selección de la flota y el servicio de taxi diario en Voss.',
      blocks: [],
    },
    {
      id: 'contact-es',
      locale: 'es',
      slug: 'kontakt',
      eyebrow: 'Contacto',
      title: 'Contacta con Voss Taxi.',
      summary: 'Llama a la central, envía un correo electrónico o encuéntranos en Uttrågata.',
      blocks: [],
    },
    {
      id: 'page-wheelchair-es',
      locale: 'es',
      slug: 'rullestol',
      title: 'Silla de ruedas',
      blocks: [
        {
          type: 'rich_text',
          title: 'Silla de ruedas',
          body: 'Tenemos vehículos adaptados para sillas de ruedas.'
        }
      ]
    },
    {
      id: 'page-ris-ros-es',
      locale: 'es',
      slug: 'ris-ros',
      title: 'Comentarios',
      blocks: [
        {
          type: 'rich_text',
          title: 'Comentarios',
          body: 'Aquí puede enviarnos quejas formales o elogios.\n\n## Enviar una queja\n\nSi desea presentar una queja formal, debe presentarse por escrito utilizando las opciones a continuación o por correo electrónico a post@vosstaxi.no.\nLe enviaremos una confirmación escrita dentro de 14 días de que se ha recibido la queja, junto con información sobre el tiempo de procesamiento esperado.\n\nLas quejas formales serán respondidas por escrito. La documentación relacionada con la queja se mantiene con nosotros durante tres años después de que se haya completado el procesamiento de la queja.\n\n## Denos elogios o críticas\n\nAgradecemos sus opiniones, comentarios y sugerencias de mejora. Esta es la mejor ayuda que puede darnos en nuestros esfuerzos por ser aún mejor.'
        },
        {
          type: 'contact_form'
        },
        {
          type: 'cta',
          title: 'Información general',
          body: 'Reglas, derechos e información general sobre taxis.',
          href: '/es/generell-informasjon',
          label: 'Más información'
        }
      ]
    },
    {
      id: 'page-maxi-taxi-es',
      locale: 'es',
      slug: 'maxi-taxi',
      title: 'Maxi Taxi',
      eyebrow: 'Voss Taxi',
      summary: '',
      blocks: [
        {
          type: 'rich_text',
          title: 'Maxi Taxi',
          body: `### Transporte en silla de ruedas y Maxi-Taxi 🚐

**Voss Taxi tiene una larga experiencia en transporte de pacientes y usuarios de sillas de ruedas. Realizamos transportes en silla de ruedas diariamente y somos un socio de transporte confiable en toda la región.**

Todos nuestros conductores locales están capacitados y autorizados para trabajar con diferentes tipos de usuarios de sillas de ruedas. Siempre priorizamos la seguridad y comodidad de los pasajeros durante todo el viaje.

Realizamos cada año un gran número de transportes para Helse Bergen y contamos con muchos años de experiencia transportando pasajeros con necesidades de asistencia especial. Esto nos convierte en un socio de transporte natural y profesional también para instituciones de cuidado privadas, centros para personas mayores y otros que necesitan transporte seguro para personas mayores y con movilidad reducida.

> 📞 **Estamos disponibles todos los días – todo el año.**
> Llama al (+47) 93 24 98 44 o envía un correo electrónico a maxi@vosstaxi.no

---

### Nuestra flota de vehículos para transporte en silla de ruedas ♿

Actualmente contamos con:
- **2 minibuses** especialmente equipados para transportar uno o dos sillas de ruedas
- **3 x furgonetas de 8 plazas para sillas de ruedas**, todos equipados con rampas seguras y sólidas para un embarque fácil y cómodo

Aquí puede ver algunos de nuestros vehículos en servicio:

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
      id: 'service-es-1',
      locale: 'es',
      title: 'AL AEROPUERTO',
      description: 'Si vas a volar, te llevamos hacia y desde el aeropuerto de Flesland. Llámanos o envíanos un correo para más información y un precio fijo.',
      capacity: '1-16 pasajeros',
      sort: 1,
    },
    {
      id: 'service-es-2',
      locale: 'es',
      title: 'SILLA DE RUEDAS',
      description: 'Voss Taxi tiene una flota variada de vehículos con espacio para sillas de ruedas plegables, pero si necesitas una silla de ruedas eléctrica o necesitas permanecer en tu silla durante el viaje, tenemos dos MaxiTaxis de 16 plazas con espacio para 2 usuarios simultáneamente. Más 3 furgonetas de 8 plazas para sillas de ruedas, todas con rampa para fácil acceso.',
      capacity: 'Hasta 2 sillas de ruedas',
      sort: 2,
    },
    {
      id: 'service-es-3',
      locale: 'es',
      title: 'OBJETOS PERDIDOS',
      description: 'Perdiste algo? Contáctanos. Constantemente recibimos teléfonos, guantes, sombreros, bolsas, gafas, bufandas y paraguas. Todos los objetos encontrados en nuestros vehículos se conservan en nuestro depósito.',
      capacity: '',
      sort: 3,
    },
    {
      id: 'service-es-4',
      locale: 'es',
      title: 'ASIENTOS DE SEGURIDAD INFANTIL',
      description: 'Tenemos asientos de auto con IsoFix y base de soporte para niños de todas las edades. Además, tenemos una amplia selección de elevadores y asientos de seguridad infantil.',
      capacity: '',
      sort: 4,
    },
    {
      id: 'service-es-5',
      locale: 'es',
      title: 'BICICLETA?',
      description: 'También tenemos la posibilidad de transportar una bicicleta. Por favor, avísanos con anticipación para que podamos traer un soporte.',
      capacity: '',
      sort: 5,
    },
    {
      id: 'service-es-6',
      locale: 'es',
      title: 'PERRO DE ASISTENCIA',
      description: 'Todos nuestros vehículos y conductores aceptan perros.',
      capacity: '',
      sort: 6,
    },
  ],
  fares: [
    { id: 'fare-phone-es', locale: 'es', label: 'Central', value: '56 51 13 40', note: 'Llama para reservar y preguntar por tarifas', sort: 1 },
    { id: 'fare-calc-es', locale: 'es', label: 'Calculadora', value: 'En línea', note: 'Verifica el precio estimado antes de tu viaje', sort: 2 },
    { id: 'fare-app-es', locale: 'es', label: 'Aplicación', value: 'Snappy Taxi', note: 'Reserva a través de la aplicación App Store o Google Play', sort: 3 },
  ],
  gallery: esGallery,
  quickLinks: [
    { id: 'ql-book-es', locale: 'es', title: 'Reserva un taxi', description: 'Ve directamente a la reserva.', href: settings.booking_url, label: 'Reservar', sort: 1 },
    { id: 'ql-calc-es', locale: 'es', title: 'Calculadora de tarifas', description: 'Obtén una estimación antes del viaje.', href: settings.fare_calculator_url, label: 'Abrir calculadora', sort: 2 },
    { id: 'ql-vy-es', locale: 'es', title: 'Vy Taxi', description: 'Reserva a través de Vy donde sea posible.', href: 'https://www.vy.no/reis-med-vy/taxi', label: 'Vy Taxi', sort: 3 },
  ],
}
