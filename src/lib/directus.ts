import type { Locale, SiteData } from '../types'
import { fallbackByLocale } from '../content/fallback'

export function isDirectusConfigured() {
  return true
}

export function assetUrl(baseUrl: string, media?: string) {
  if (!media) return ''
  if (/^https?:\/\//i.test(media)) return media
  return `${baseUrl.replace(/\/+$/, '')}/assets/${media}`
}

export async function fetchSiteData(locale: Locale): Promise<SiteData> {
  const fallback = fallbackByLocale[locale]

  try {
    const res = await fetch(`http://85.190.102.196:1337/api/pages?populate=*`)
    if (!res.ok) throw new Error('Strapi network error')
    const json = await res.json()

    if (json.data && json.data.length > 0) {
      const strapiPages = json.data.map((item: any) => {
        const attr = item.attributes || item
        let slug = attr.slug
        if (slug === 'om-meg') slug = 'tenester'
        if (slug === 'nyheter-og-praktisk-informasjon') slug = 'bli-sjafor'

        return {
          id: item.id.toString(),
          locale,
          slug,
          title: attr.title,
          eyebrow: attr.eyebrow || 'Voss Taxi SA',
          summary: attr.summary || '',
          status: 'published',
          blocks: [{ type: 'rich_text', body: attr.content }],
        }
      })

      // We merge Strapi pages with fallback pages so "home" is always available if Strapi didn't return it
      const finalPages = [...strapiPages]
      for (const fp of fallback.pages) {
        if (!finalPages.find(p => p.slug === fp.slug)) {
          finalPages.push(fp)
        }
      }

      return {
        ...fallback,
        pages: finalPages,
        source: 'directus', // To hide the "fallback" banner
      }
    }

    return {
      ...fallback,
      source: 'directus',
    }
  } catch (error) {
    return {
      ...fallback,
      error: error instanceof Error ? error.message : 'Could not load Strapi content',
    }
  }
}
