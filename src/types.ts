export type Locale = 'no' | 'en'

export type StrapiPage = {
  id: number
  documentId: string
  title: string
  slug: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  eyebrow?: string
  summary?: string
  hero_image?: string
}

export type StrapiResponse<T> = {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type SiteSettings = {
  id?: string
  site_name: string
  phone: string
  phone_display: string
  email: string
  address: string
  booking_url: string
  fare_calculator_url: string
  facebook_url: string
  instagram_url: string
  map_url: string
  app_store_url: string
  play_store_url: string
  hero_media?: string
}

export type NavigationItem = {
  id: string
  locale: Locale
  label: string
  href: string
  sort: number
  status?: 'published' | 'draft' | string
}

export type PageBlock =
  | { type: 'rich_text'; title?: string; body: string }
  | { type: 'feature_grid'; title?: string; items: Array<{ title: string; body: string }> }
  | { type: 'cta'; title: string; body: string; href: string; label: string }

export type CmsPage = {
  id: string
  locale: Locale
  slug: string
  title: string
  eyebrow?: string
  summary?: string
  hero_image?: string
  status?: 'published' | 'draft' | string
  blocks: PageBlock[]
  seo_title?: string
  seo_description?: string
  sort?: number
}

export type Service = {
  id: string
  locale: Locale
  title: string
  description: string
  capacity?: string
  image?: string
  sort: number
  status?: 'published' | 'draft' | string
}

export type Fare = {
  id: string
  locale: Locale
  label: string
  value: string
  note?: string
  sort: number
  status?: 'published' | 'draft' | string
}

export type GalleryItem = {
  id: string
  locale: Locale
  title: string
  image: string
  alt: string
  sort: number
  status?: 'published' | 'draft' | string
}

export type QuickLink = {
  id: string
  locale: Locale
  title: string
  description: string
  href: string
  label: string
  sort: number
  status?: 'published' | 'draft' | string
}

export type SiteData = {
  settings: SiteSettings
  navigation: NavigationItem[]
  pages: CmsPage[]
  services: Service[]
  fares: Fare[]
  gallery: GalleryItem[]
  quickLinks: QuickLink[]
  source: 'directus' | 'fallback'
  error?: string
}
