import type { Locale } from '../types'

const legacyRedirects: Record<string, string> = {
  '/Hjem/om/': '/om',
  '/Hjem/om/prosjekter': '/historia-var',
  '/Hjem/om/transportvilk-r': '/transportvilkar',
  '/Hjem/om/hittegods': '/hittegods',
  '/Hjem/om-meg': '/tenester',
  '/Hjem/pakker': '/pakker',
  '/Hjem/om-oss': '/takstar',
  '/Hjem/kontakt': '/kontakt',
  '/Hjem/galleri': '/galleri',
  '/Hjem/nyheter-og-praktisk-informasjon': '/bli-sjafor',
  '/Hjem/maxi-taxi': '/rullestol',
  '/Hjem/ris-ros/': '/ris-ros',
  '/Hjem/ris-ros/klage-sj-f-r': '/ris-ros',
  '/Hjem/ris-ros/klage-utf-rt-oppdrag/': '/ris-ros',
  '/Hjem/ris-ros/generelle-klager': '/ris-ros',
  '/Hjem/ris-ros/ros': '/ris-ros',
  '/Hjem/ris-ros/generell-informasjon': '/ris-ros',
  '/home/': '/en',
  '/home/about/': '/en/about',
  '/home/about/history': '/en/history',
  '/home/about/person': '/en/person',
  '/home/about/transport': '/en/transport-terms',
  '/home/contact': '/en/contact',
  '/home/fares': '/en/fares',
  '/home/gallery-1': '/en/gallery',
  '/home/services': '/en/services',
  '/home/tourists': '/en/tourists',
  '/home/wheelchair': '/en/wheelchair',
}

export function getRedirectTarget(pathname: string) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'
  return legacyRedirects[pathname] ?? legacyRedirects[cleanPath] ?? legacyRedirects[`${cleanPath}/`]
}

export function localizeSlug(slug: string, locale: Locale) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '')
  if (!cleanSlug) {
    return locale === 'no' ? '/' : `/${locale}`
  }

  return locale === 'no' ? `/${cleanSlug}` : `/${locale}/${cleanSlug}`
}

export function parseRoute(pathname: string): { locale: Locale; slug: string } {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '')
  if (!cleanPath) {
    return { locale: 'no', slug: 'home' }
  }

  const parts = cleanPath.split('/')
  const validLocales = ['en', 'de', 'fr', 'es'] as const
  if (validLocales.includes(parts[0] as any)) {
    return { locale: parts[0] as Locale, slug: parts[1] ?? 'home' }
  }
  
  if (parts[0] === 'no') {
    return { locale: 'no', slug: parts[1] ?? 'home' }
  }
  
  return { locale: 'no', slug: parts[0] }
}
