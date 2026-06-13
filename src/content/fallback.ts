import type { SiteData } from '../types'

const settings = {
  site_name: 'Voss Taxi SA',
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
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240522_130220.jpg?etag=%2239d36c-6652016f%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1160%2B870&extract=0%2B198%2B1160%2B395&quality=85',
}

const originalGalleryImages = [
  ['Bilpark på Voss', 'Voss Taxi bil', settings.hero_media],
  [
    'Maxi-taxi i drift',
    'Voss Taxi maxi-taxi',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20200101_010840(1).jpg?etag=%222c9cc5-5f08340e%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'På veg gjennom Voss',
    'Voss Taxi på oppdrag',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/IMG_20200706_0003.jpg?etag=%22b21ec-5f037055%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Voss Taxi-bil',
    'Taxi frå Voss Taxi',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1594033487309-3673ee32-eb67-4713-8214-ebb1da48e841.jpg?etag=%22b11b9-5f037056%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Bil frå originalside',
    'Voss Taxi-bil frå originalside',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/image.jpg?etag=%22958b-5f037053%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Voss Taxi på tur',
    'Taxi på veg',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/245964999_1744788882383292_7566790098835729105_n.jpg?etag=%22130d8-665865e0%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Rute og landskap',
    'Landskap ved Voss',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/TvindeFossen%2003.jpg?etag=%227fcb15-5f09c190%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Skjervefossen',
    'Skjervefossen ved Voss',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/SkjerveFossen%2003.jpg?etag=%2279e57d-5f09c169%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Bordalsgjelet',
    'Bordalsgjelet ved Voss',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Bordalsgjelet%2002.jpg?etag=%226cd4e7-5f09c189%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Transportmiljø på Voss',
    'Voss frå lufta',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/DJI_0168.JPG?etag=%226fb506-66495405%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Kveldskøyring',
    'Kveld på Voss',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240514_203506.jpg?etag=%225098a2-66495519%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Voss Taxi 2018',
    'Voss Taxi-bilde frå arkiv',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180820_124413.jpg?etag=%223970c3-5f083418%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Rute på Voss',
    'Voss Taxi arkivbilde',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/r-160-1.jpg?etag=%225e7f9-60204fc0%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Mai på Voss',
    'Transportbilde frå Voss',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185146.jpg?etag=%2290aac6-6648e92b%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Køyring i mai',
    'Voss Taxi arkivbilde',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185331___serialized1.jpg?etag=%226e206b-6648ea38%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Tur i distriktet',
    'Veg og landskap ved Voss',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180618_212754.jpg?etag=%223c5bfa-5f08341d%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1600%2B1000&quality=90',
  ],
  [
    'Studentrabatt',
    'Studentrabatt Voss Taxi',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/tinywow_Student%20rabatt_54313707_1.jpg?etag=%225280e-662d516c%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1200%2B1600&quality=90',
  ],
  [
    'Rullestoltransport',
    'Rullestol ikon',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/handicap-39397_960_720.png?etag=W%2F%2293ba-664bb5cc%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=900%2B900',
  ],
  [
    'Voss Taxi SA',
    'Voss Taxi logo',
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.3___serialized1.png?etag=W%2F%22b9762-66313ecf%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=543%2B308',
  ],
] as const

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
      { id: 'nav-services', locale: 'no', label: 'Tenester', href: '/tenester', sort: 2 },
      { id: 'nav-fares', locale: 'no', label: 'Takstar', href: '/takstar', sort: 3 },
      { id: 'nav-gallery', locale: 'no', label: 'Galleri', href: '/galleri', sort: 4 },
      { id: 'nav-contact', locale: 'no', label: 'Kontakt', href: '/kontakt', sort: 5 },
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
            type: 'cta',
            title: 'Bestill med telefon, app eller kalkulator',
            body: 'Ring sentralen, bruk Snappy Taxi eller sjekk pris i kalkulatoren før turen.',
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
        eyebrow: 'Ris og ros',
        title: 'Send oss ris, ros eller klage.',
        summary: 'Tilbakemeldingar hjelper oss å gjere tenesta betre.',
        blocks: [],
      },
    ],
    services: [
      {
        id: 'service-maxi-no',
        locale: 'no',
        title: 'Maxi-Taxi & rullestolbil',
        description: 'Minibussar med plass til inntil 16 passasjerar eller 2 rullestolar samtidig.',
        capacity: '16 passasjerar',
        image:
          'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/559860_626148540735602_1401260110_n-removebg-preview.png?etag=%22485f3-6654de34%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=214%2B214&extract=0%2B0%2B214%2B212',
        sort: 1,
      },
      {
        id: 'service-van-no',
        locale: 'no',
        title: 'Storbil / MiniVan',
        description: 'Storbilar med plass til 7-8 passasjerar og god bagasjeplass.',
        capacity: '7-8 passasjerar',
        sort: 2,
      },
      {
        id: 'service-car-no',
        locale: 'no',
        title: 'Personbil',
        description: 'Personbilar med plass til 4-6 passasjerar og bagasje.',
        capacity: '4-6 passasjerar',
        sort: 3,
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
      { id: 'nav-services-en', locale: 'en', label: 'Services', href: '/en/services', sort: 2 },
      { id: 'nav-fares-en', locale: 'en', label: 'Fares', href: '/en/fares', sort: 3 },
      { id: 'nav-gallery-en', locale: 'en', label: 'Gallery', href: '/en/gallery', sort: 4 },
      { id: 'nav-contact-en', locale: 'en', label: 'Contact', href: '/en/contact', sort: 5 },
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
            body: 'Use phone, app or fare calculator to plan your trip from Voss.',
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
        id: 'wheelchair-en',
        locale: 'en',
        slug: 'wheelchair',
        eyebrow: 'Wheelchair',
        title: 'Wheelchair-accessible transport.',
        summary: 'Contact us to plan safe wheelchair transport in Voss.',
        blocks: [],
      },
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
