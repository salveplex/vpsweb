import type { Locale, SiteData } from '../types'

export function StatusBanner({ data, locale }: { data: SiteData; locale: Locale }) {
  if (data.source === 'directus') return null

  const message = data.error
    ? locale === 'en'
      ? 'Could not connect to server. Showing local content.'
      : 'Siden kunne ikke koble til serveren. Viser lokalt innhold.'
    : locale === 'en'
      ? 'Using local fallback content until the CMS is configured.'
      : 'Viser lokalt innhold inntil innholdstjeneren er konfigurert.'

  return (
    <div className="border-b px-4 py-3 text-sm md:px-6" style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent-strong)' }}>
      <div className="mx-auto max-w-7xl">{message}</div>
    </div>
  )
}
