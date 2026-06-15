import type { SiteData } from '../types'
import { glassBlurredHeavyStyles, lineColor } from '../lib/styles'

export function Footer({ data }: { data: SiteData }) {
  return (
    <footer className="border-t px-4 py-10 md:px-6" style={{ ...lineColor, ...glassBlurredHeavyStyles }}>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="text-lg font-extrabold">{data.settings.site_name}</div>
          <div className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{data.settings.address}</div>
        </div>
      </div>
    </footer>
  )
}
