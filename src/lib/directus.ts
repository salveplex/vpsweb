import type { Locale, SiteData, StrapiResponse, StrapiPage, CmsPage } from '../types'
import { fallbackByLocale } from '../content/fallback'
import { modernPages } from '../content/modern'

export function assetUrl(baseUrl: string, media?: string) {
  if (!media) return ''
  if (/^https?:\/\//i.test(media)) return media
  return `${baseUrl.replace(/\/+$/, '')}/assets/${media}`
}

export async function fetchSiteData(locale: Locale): Promise<SiteData> {
  const fallback = fallbackByLocale[locale]

  try {
    const apiUrl = import.meta.env.VITE_STRAPI_API_URL || 'https://cms.vosstaxi.no'
    const localeParam = locale === 'en' ? 'en' : 'no'
    const res = await fetch(`${apiUrl}/api/pages?populate=*&locale=${localeParam}`)
    if (!res.ok) throw new Error('Strapi network error')
    const json = (await res.json()) as StrapiResponse<StrapiPage>

    if (json.data && json.data.length > 0) {
      const strapiPages: CmsPage[] = json.data
        .filter(item => item.slug !== 'pakker' && item.slug !== 'om-oss' && item.slug !== 'maxi-taxi' && item.slug !== 'trygt-heim')
        .map((item) => {
        return {
          id: item.id.toString(),
          locale,
          slug: item.slug,
          title: item.title,
          eyebrow: item.eyebrow || 'Voss Taxi SA',
          summary: item.summary || '',
          status: 'published',
          blocks: [{ type: 'rich_text' as const, body: item.content }],
        }

      })

      const finalPages = [...strapiPages]

      const overrides = locale === 'no' ? modernPages : []
      for (const override of overrides) {
        const idx = finalPages.findIndex(p => p.slug === override.slug)
        if (idx !== -1) {
          finalPages[idx] = override
        } else {
          finalPages.push(override)
        }
      }

      for (const fp of fallback.pages) {
        if (!finalPages.find(p => p.slug === fp.slug)) {
          finalPages.push(fp)
        }
      }

      return {
        ...fallback,
        pages: finalPages,
        source: 'directus',
      }
    }

    return {
      ...fallback,
      source: 'fallback',
      error: 'Strapi returned no pages',
    }
  } catch (error) {
    return {
      ...fallback,
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Could not load Strapi content',
    }
  }
}
