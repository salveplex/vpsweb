import type { SiteData } from '../types'
import { settings, originalGalleryImages } from './shared'

const frGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image]: string[], index: number) => ({
  id: `gallery-original-fr-${index + 1}`,
  locale: 'fr',
  title,
  alt,
  image,
  sort: index + 1,
}))

export const fallbackFr: SiteData = {
  settings,
  source: 'fallback',
  navigation: [
    { id: 'nav-home-fr', locale: 'fr', label: 'Accueil', href: '/fr', sort: 1 },
    { id: 'nav-om-oss-fr', locale: 'fr', label: 'À propos de nous', href: '/fr/om-oss', sort: 2 },
    { id: 'nav-services-fr', locale: 'fr', label: 'Services', href: '/fr/tenester', sort: 3 },
    { id: 'nav-pakker-fr', locale: 'fr', label: 'Forfaits', href: '/fr/pakker', sort: 4 },
    { id: 'nav-maxi-taxi-fr', locale: 'fr', label: 'Maxi Taxi', href: '/fr/maxi-taxi', sort: 6 },
    { id: 'nav-bli-sjafor-fr', locale: 'fr', label: 'Devenir chauffeur', href: '/fr/bli-sjafor', sort: 7 },
    { id: 'nav-gallery-fr', locale: 'fr', label: 'Galerie', href: '/fr/galleri', sort: 8 },
    { id: 'nav-ris-ros-fr', locale: 'fr', label: 'Avis', href: '/fr/ris-ros', sort: 9 },
    { id: 'nav-contact-fr', locale: 'fr', label: 'Contact', href: '/fr/kontakt', sort: 10 },
  ],
  pages: [
    {
      id: 'home-fr',
      locale: 'fr',
      slug: 'home',
      eyebrow: 'Entreprise de taxis locale à Voss',
      title: 'Conduisez en toute sécurité avec nous, depuis Voss.',
      summary:
        'Voss Taxi offre des berlines, des monospaces, des maxi-taxis, des minibus et des transports en fauteuil roulant pour les habitants et les visiteurs.',
      hero_image: settings.hero_media,
      blocks: [
        {
          type: 'rich_text',
          title: 'Réservez en toute confiance',
          body: 'Nous avons des véhicules pour tous les types de trajets et vous aiderons à vous rendre en toute sécurité vers et depuis les gares, les hôtels, les chalets, les montagnes et les événements.',
        },
        {
          type: 'rich_text',
          title: 'Réservez par application',
          body: '### Snappy Taxi\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/snappy-taxi/id6479620974) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no)\n\n### Réservez un taxi dans l\'application VY\n\n[![](/images/app-store.png)](https://apps.apple.com/no/app/vy-nsb/id439655098) [![](/images/google-play.png)](https://play.google.com/store/apps/details?id=com.intele.nsbmob.app)'
        },
        {
          type: 'cta',
          title: 'Réservez par téléphone ou calculatrice',
          body: 'Appelez la centrale de taxis ou vérifiez les tarifs dans la calculatrice avant votre trajet.',
          href: settings.booking_url,
          label: 'Réserver un taxi',
        },
      ],
    },
    {
      id: 'services-fr',
      locale: 'fr',
      slug: 'tenester',
      eyebrow: 'Services',
      title: 'Véhicules pour tous les types de trajets.',
      summary: 'Transport pour les groupes, les bagages, les utilisateurs de fauteuils roulants, les touristes et les trajets quotidiens.',
      blocks: [],
    },
    {
      id: 'fares-fr',
      locale: 'fr',
      slug: 'takstar',
      eyebrow: 'Tarifs',
      title: 'Tarifs clairs et devis rapides.',
      summary: 'Utilisez la calculatrice ou appelez le centre de taxis pour les trajets qui nécessitent une planification.',
      blocks: [],
    },
    {
      id: 'gallery-fr',
      locale: 'fr',
      slug: 'galleri',
      eyebrow: 'Galerie',
      title: 'Voss Taxi sur la route.',
      summary: 'Une petite sélection de la flotte et du service de taxi quotidien à Voss.',
      blocks: [
        {
          type: 'rich_text',
          title: 'Photos de notre quotidien',
          body: `![](https://cms.vosstaxi.no/uploads/20180820_124458_56fb61303c.jpg)

![](https://cms.vosstaxi.no/uploads/20180716_133738_76af7f0d1e.jpg)

![](https://cms.vosstaxi.no/uploads/20200531_042738_da124eacd3.jpg)
`
        },
        {
          type: 'contact_form'
        }
      ]
    },
    {
      id: 'contact-fr',
      locale: 'fr',
      slug: 'kontakt',
      eyebrow: 'Contact',
      title: 'Contactez Voss Taxi.',
      summary: 'Appelez la centrale, envoyez un e-mail ou trouvez-nous à Uttrågata.',
      blocks: [],
    },
    {
      id: 'page-wheelchair-fr',
      locale: 'fr',
      slug: 'rullestol',
      title: 'Fauteuil roulant',
      blocks: [
        {
          type: 'rich_text',
          title: 'Fauteuil roulant',
          body: 'Nous avons des véhicules adaptés aux fauteuils roulants.'
        }
      ]
    },
    {
      id: 'page-ris-ros-fr',
      locale: 'fr',
      slug: 'ris-ros',
      title: 'Avis',
      blocks: [
        {
          type: 'rich_text',
          title: 'Avis',
          body: 'Ici, vous pouvez nous envoyer des réclamations formelles ou des éloges.\n\n## Soumettre une réclamation\n\nSi vous souhaitez soumettre une réclamation formelle, celle-ci doit être soumise par écrit en utilisant les options ci-dessous ou par e-mail à post@vosstaxi.no.\nNous vous enverrons une confirmation écrite dans les 14 jours confirmant la réception de la réclamation, ainsi que des informations sur le délai de traitement attendu.\n\nLes réclamations formelles seront traitées par écrit. La documentation relative à la réclamation est conservée par nos soins pendant trois ans après la fin du traitement de la réclamation.\n\n## Donnez-nous des éloges ou des critiques\n\nNous accueillons favorablement vos commentaires, avis et suggestions d\'amélioration. C\'est la meilleure aide que vous puissiez nous apporter pour devenir encore meilleur.'
        },
        {
          type: 'contact_form'
        },
        {
          type: 'cta',
          title: 'Informations générales',
          body: 'Règles, droits et informations générales sur les taxis.',
          href: '/fr/generell-informasjon',
          label: 'En savoir plus'
        }
      ]
    },
    {
      id: 'page-maxi-taxi-fr',
      locale: 'fr',
      slug: 'maxi-taxi',
      title: 'Maxi Taxi',
      eyebrow: 'Voss Taxi',
      summary: '',
      blocks: [
        {
          type: 'rich_text',
          title: 'Maxi Taxi',
          body: `### Transport en fauteuil roulant et Maxi-Taxi 🚐

**Voss Taxi a une longue expérience dans le transport des patients et des utilisateurs de fauteuils roulants. Nous effectuons des transports en fauteuil roulant quotidiennement et sommes un partenaire de transport fiable dans toute la région.**

Tous nos chauffeurs locaux sont formés et autorisés à gérer différents types d'utilisateurs de fauteuils roulants. Nous mettons toujours l'accent sur la sécurité et le confort des passagers pendant tout le trajet.

Nous effectuons chaque année un grand nombre de transports pour Helse Bergen et avons de nombreuses années d'expérience dans le transport de passagers ayant des besoins d'assistance particuliers. Cela nous rend partenaire de transport naturel et professionnel pour les établissements de soins privés, les centres pour personnes âgées et autres qui ont besoin d'un transport sûr pour les personnes âgées et celles ayant une mobilité réduite.

> 📞 **Nous sommes disponibles tous les jours – toute l'année.**
> Appelez (+47) 93 24 98 44 ou envoyez un e-mail à maxi@vosstaxi.no

---

### Notre flotte de véhicules pour transport en fauteuil roulant ♿

Nous disposons actuellement de:
- **2 minibus** spécialement équipés pour transporter un ou deux fauteuils roulants
- **3 x fourgonnettes 8 places pour fauteuils roulants**, tous équipés de rampes sûres et stables pour un embarquement facile et confortable

Voici quelques-uns de nos véhicules en service:

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
      id: 'service-fr-1',
      locale: 'fr',
      title: 'VERS L\'AÉROPORT',
      description: 'Si vous allez voler, nous vous conduisons vers et depuis l\'aéroport de Flesland. Appelez-nous ou envoyez-nous un e-mail pour plus d\'informations et un prix fixe.',
      capacity: '1-16 passagers',
      sort: 1,
    },
    {
      id: 'service-fr-2',
      locale: 'fr',
      title: 'FAUTEUIL ROULANT',
      description: 'Voss Taxi a une flotte de véhicules variée avec de la place pour les fauteuils roulants pliables, mais si vous avez besoin d\'un fauteuil roulant électrique ou de rester dans votre fauteuil roulant pendant le trajet, nous avons deux MaxiTaxis 16 places avec de la place pour 2 utilisateurs à la fois. Plus 3 fourgonnettes 8 places pour fauteuils roulants, toutes avec rampe pour embarquement facile.',
      capacity: 'Jusqu\'à 2 fauteuils roulants',
      sort: 2,
    },
    {
      id: 'service-fr-3',
      locale: 'fr',
      title: 'OBJETS TROUVÉS',
      description: 'Avez-vous perdu quelque chose? Contactez-nous. Nous recevons constamment des téléphones, des gants, des chapeaux, des sacs, des lunettes, des écharpes et des parapluies. Tous les objets trouvés dans nos voitures sont conservés à notre dépôt.',
      capacity: '',
      sort: 3,
    },
    {
      id: 'service-fr-4',
      locale: 'fr',
      title: 'SIÈGES D\'ENFANTS',
      description: 'Nous avons des sièges auto avec IsoFix et base de soutien pour enfants de tous âges. De plus, nous avons un grand choix de rehausseurs et de sièges d\'enfant.',
      capacity: '',
      sort: 4,
    },
    {
      id: 'service-fr-5',
      locale: 'fr',
      title: 'VÉLO?',
      description: 'Nous avons aussi la possibilité de transporter un vélo. Veuillez le signaler à l\'avance pour que nous apportions un support.',
      capacity: '',
      sort: 5,
    },
    {
      id: 'service-fr-6',
      locale: 'fr',
      title: 'CHIEN D\'ASSISTANCE',
      description: 'Tous nos véhicules et chauffeurs acceptent les chiens.',
      capacity: '',
      sort: 6,
    },
  ],
  fares: [
    { id: 'fare-phone-fr', locale: 'fr', label: 'Centrale', value: '56 51 13 40', note: 'Appelez pour réserver et connaître les tarifs', sort: 1 },
    { id: 'fare-calc-fr', locale: 'fr', label: 'Calculatrice', value: 'En ligne', note: 'Vérifiez le prix estimé avant votre trajet', sort: 2 },
    { id: 'fare-app-fr', locale: 'fr', label: 'Application', value: 'Snappy Taxi', note: 'Réservez via l\'application App Store ou Google Play', sort: 3 },
  ],
  gallery: frGallery,
  quickLinks: [
    { id: 'ql-book-fr', locale: 'fr', title: 'Réserver un taxi', description: 'Allez directement à la réservation.', href: settings.booking_url, label: 'Réserver', sort: 1 },
    { id: 'ql-calc-fr', locale: 'fr', title: 'Calculatrice de tarifs', description: 'Obtenez une estimation avant le trajet.', href: settings.fare_calculator_url, label: 'Ouvrir la calculatrice', sort: 2 },
    { id: 'ql-vy-fr', locale: 'fr', title: 'Vy Taxi', description: 'Réservez via Vy où c\'est possible.', href: 'https://www.vy.no/reis-med-vy/taxi', label: 'Vy Taxi', sort: 3 },
  ],
}
