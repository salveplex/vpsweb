import type { Locale, SiteData, StrapiResponse, StrapiPage, CmsPage } from '../types'
import { fallbackByLocale } from '../content/fallback'
import { modernPages } from '../content/modern'
import { modernPagesEn } from '../content/modernEn'
import { modernPagesDe } from '../content/modernDe'
import { modernPagesFr } from '../content/modernFr'
import { modernPagesEs } from '../content/modernEs'
import { extraPagesEn } from '../content/extraEn'
import { extraPagesNo } from '../content/extraNo'

export function assetUrl(baseUrl: string, media?: string) {
  if (!media) return ''
  if (/^https?:\/\//i.test(media)) return media
  return `${baseUrl.replace(/\/+$/, '')}/assets/${media}`
}

export async function fetchSiteData(locale: Locale = 'no'): Promise<SiteData> {
  const fallback = fallbackByLocale[locale]
  let overrides: CmsPage[] = []
  if (locale === 'no') overrides = [...modernPages, ...extraPagesNo]
  else if (locale === 'en') overrides = [...modernPagesEn, ...extraPagesEn]
  else if (locale === 'de') overrides = [...modernPagesDe]
  else if (locale === 'fr') overrides = [...modernPagesFr]
  else if (locale === 'es') overrides = [...modernPagesEs]
  
  const patchedFallbackPages = [...fallback.pages]
  for (const override of overrides) {
    const idx = patchedFallbackPages.findIndex(p => p.slug === override.slug)
    if (idx !== -1) patchedFallbackPages[idx] = override
    else patchedFallbackPages.push(override)
  }
  const patchedFallback = { ...fallback, pages: patchedFallbackPages }

  try {
    const apiUrl = import.meta.env.VITE_STRAPI_API_URL || 'https://cms.vosstaxi.no'
    const localeParam = locale
    const res = await fetch(`${apiUrl}/api/pages?populate=*&locale=${localeParam}`)
    if (!res.ok) throw new Error('Strapi network error')
    const json = (await res.json()) as StrapiResponse<StrapiPage>

    if (json.data && json.data.length > 0) {
      const strapiPages: CmsPage[] = json.data
        .map((item) => {
        // Clean up legacy Markdown image query parameters that break the parser
        let cleanContent = item.content || ''
        cleanContent = cleanContent.replace(/\?etag=[^\)]+/g, '')
        cleanContent = cleanContent.replace(/&sourceContentType=[^\)]+/g, '')
        cleanContent = cleanContent.replace(/&ignoreAspectRatio/g, '')

        return {
          id: item.id.toString(),
          locale,
          slug: item.slug,
          title: item.title,
          eyebrow: item.eyebrow || 'Voss Taxi',
          summary: item.summary || '',
          status: 'published',
          blocks: [{ type: 'rich_text' as const, body: cleanContent }],
        }

      })

      const finalPages = [...strapiPages]

      for (const override of overrides) {
        const idx = finalPages.findIndex(p => p.slug === override.slug)
        if (idx === -1) {
          finalPages.push(override)
        } else {
          finalPages[idx] = override
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
      ...patchedFallback,
      source: 'fallback',
      error: 'Strapi returned no pages',
    }
  } catch (error) {
    return {
      ...patchedFallback,
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Could not load Strapi content',
    }
  }
}
