import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Car,
  Desktop,
  DeviceMobile,
  EnvelopeSimple,
  Gauge,
  List,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Timer,
  Sun,
  X,
} from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { fallbackByLocale } from './content/fallback'
import heroVideo from './content/vosstaxicomp.mp4'
import { assetUrl, fetchSiteData } from './lib/directus'
import { cleanGalleryImageUrl, collectHeroImages, optimizeHeroImageUrl } from './lib/heroImages'
import { getRedirectTarget, parseRoute } from './lib/routes'
import { getInitialThemeMode, resolveThemeMode, type ThemeMode } from './lib/theme'
import type { CmsPage, Locale, PageBlock, SiteData } from './types'
import ReactMarkdown from 'react-markdown'

const iconWeight = 'light' as const
const themeLabels: Record<ThemeMode, string> = {
  system: 'System',
  light: 'Lys',
  dark: 'Mørk',
}

function readStoredThemeMode() {
  try {
    return localStorage.getItem('theme-mode')
  } catch {
    return null
  }
}

function writeStoredThemeMode(mode: ThemeMode) {
  try {
    localStorage.setItem('theme-mode', mode)
  } catch {
    // Browsers can block localStorage in strict privacy contexts.
  }
}

function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialThemeMode(readStoredThemeMode()))

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const resolved = resolveThemeMode(mode, media.matches)
      document.documentElement.dataset.theme = resolved
      document.documentElement.style.colorScheme = resolved
    }

    applyTheme()
    writeStoredThemeMode(mode)
    media.addEventListener?.('change', applyTheme)

    return () => media.removeEventListener?.('change', applyTheme)
  }, [mode])

  return { mode, setMode }
}

function useSiteData(locale: Locale) {
  const [data, setData] = useState<SiteData>(() => fallbackByLocale[locale])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchSiteData(locale)
      .then((nextData) => {
        if (!cancelled) setData(nextData)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [locale])

  return { data, loading }
}

function ThemeToggle({ mode, onChange }: { mode: ThemeMode; onChange: (mode: ThemeMode) => void }) {
  const options: Array<{ mode: ThemeMode; icon: typeof Desktop }> = [
    { mode: 'system', icon: Desktop },
    { mode: 'light', icon: Sun },
    { mode: 'dark', icon: Moon },
  ]

  return (
    <div className="grid grid-cols-3 rounded-full border p-1" style={{ borderColor: 'var(--line)', background: 'var(--glass)' }}>
      {options.map((option) => (
        <button
          key={option.mode}
          type="button"
          className="grid size-9 place-items-center rounded-full transition-[transform,background,color] duration-500 ease-[cubic-bezier(.32,.72,0,1)] active:scale-[0.96]"
          style={{
            background: mode === option.mode ? 'var(--surface)' : 'transparent',
            color: mode === option.mode ? 'var(--text)' : 'var(--muted)',
          }}
          aria-label={`Velg ${themeLabels[option.mode]} tema`}
          aria-pressed={mode === option.mode}
          onClick={() => onChange(option.mode)}
          title={themeLabels[option.mode]}
        >
          <option.icon size={17} weight={iconWeight} />
        </button>
      ))}
    </div>
  )
}

function Header({
  data,
  locale,
  themeMode,
  setThemeMode,
}: {
  data: SiteData
  locale: Locale
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const alternate = locale === 'en' ? '/' : '/en'
  const location = useLocation()

  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-3 pt-3 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[18px] border px-3 py-3 backdrop-blur-2xl md:px-4" style={{ borderColor: 'rgba(255,255,255,.18)', background: 'rgba(18,17,15,.48)', color: '#fffaf0' }}>
        <Link to={locale === 'en' ? '/en' : '/'} className="group flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-[12px] bg-taxi text-[#181511] transition-transform duration-500 ease-[cubic-bezier(.32,.72,0,1)] group-hover:-translate-y-0.5 group-active:scale-[0.98]">
            <Car size={24} weight="fill" />
          </span>
          <span>
            <span className="block text-lg font-extrabold tracking-tight">Voss Taxi</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: 'var(--accent-strong)' }}>SA</span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-[12px] border border-white/10 bg-white/8 p-1 lg:flex" aria-label="Hovudmeny">
          {data.navigation.map((item) => {
            const active = location.pathname === item.href
            return (
              <Link
                key={item.id}
                to={item.href}
                className="rounded-[9px] px-4 py-2 text-sm font-semibold transition-[transform,background,color] duration-500 ease-[cubic-bezier(.32,.72,0,1)] active:scale-[0.98]"
                style={{
                  background: active ? 'var(--surface)' : 'transparent',
                  color: active ? 'var(--text)' : 'rgba(255,255,255,.72)',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle mode={themeMode} onChange={setThemeMode} />
          <Link
            to={alternate}
            className="rounded-[10px] border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition active:scale-[0.98]"
            style={{ borderColor: 'rgba(255,255,255,.16)', color: 'rgba(255,255,255,.72)' }}
          >
            {locale === 'en' ? 'NO' : 'EN'}
          </Link>
          <a
            href={`tel:${data.settings.phone}`}
            className="group inline-flex items-center gap-3 rounded-[12px] bg-taxi py-1.5 pl-4 pr-1.5 text-sm font-bold text-[#181511] transition duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:bg-taxi-soft active:scale-[0.98]"
          >
            {data.settings.phone_display}
            <span className="grid size-8 place-items-center rounded-full bg-[#181511]/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <Phone size={16} weight={iconWeight} />
            </span>
          </a>
        </div>

        <button
          className="relative grid size-11 place-items-center rounded-full border lg:hidden"
          style={{ borderColor: 'rgba(255,255,255,.18)' }}
          type="button"
          aria-label={menuOpen ? 'Lukk meny' : 'Opne meny'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <List size={22} />}
        </button>
      </div>

      {menuOpen ? (
        <div className="mt-3 rounded-[2rem] border p-4 shadow-[0_26px_90px_-48px_var(--shadow)] backdrop-blur-2xl lg:hidden" style={{ borderColor: 'var(--line)', background: 'var(--glass-strong)' }}>
          <nav className="grid gap-2">
            {data.navigation.map((item, index) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="reveal rounded-[1.3rem] border px-4 py-3 font-semibold"
                style={{ '--index': index, borderColor: 'var(--line)' } as React.CSSProperties}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3">
              <Link to={alternate} onClick={() => setMenuOpen(false)} className="rounded-md border px-4 py-3 font-mono text-sm uppercase" style={{ borderColor: 'var(--line)', color: 'var(--accent-strong)' }}>
                {locale === 'en' ? 'Norsk' : 'English'}
              </Link>
              <ThemeToggle mode={themeMode} onChange={setThemeMode} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function Hero({ page, data, locale }: { page: CmsPage; data: SiteData; locale: Locale }) {
  const heroImages = useMemo(
    () =>
      [
        ...new Set(
          collectHeroImages({
            pageHero: page.hero_image,
            settingsHero: data.settings.hero_media,
            galleryImages: data.gallery.map((item) => item.image),
          }).map((image) => optimizeHeroImageUrl(assetUrl(import.meta.env.VITE_DIRECTUS_URL ?? '', image))),
        ),
      ],
    [data.gallery, data.settings.hero_media, page.hero_image],
  )
  const activeHeroImage = heroImages[0]
  const signals = locale === 'en'
    ? [
        ['24/7', 'Dispatch'],
        ['6 min', 'Voss centre'],
        ['Maxi', 'Groups'],
      ]
    : [
        ['24/7', 'Sentral'],
        ['6 min', 'Voss sentrum'],
        ['Maxi', 'Grupper'],
      ]

  return (
    <section
      className="hero-stage relative min-h-[100dvh] overflow-hidden"
      style={{ '--hero-poster': `url("${activeHeroImage}")` } as React.CSSProperties}
    >
      <div className="hero-brand-mark" aria-hidden="true">VOSS</div>
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={activeHeroImage}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-yellow-blade" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--bg))]" />
      <div className="hero-route-line absolute bottom-10 left-1/2 hidden w-[min(76rem,calc(100%-3rem))] -translate-x-1/2 md:block" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="hero-grid relative mx-auto grid min-h-[100dvh] max-w-[92rem] items-center gap-8 px-4 pb-12 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(390px,500px)] md:px-8 md:pb-16">
        <div className="reveal max-w-6xl pb-4 text-white [--index:0]">
          <div className="hero-kicker mb-6 inline-flex w-fit items-center gap-2 rounded-[10px] border border-white/18 bg-white/10 px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/78 backdrop-blur-xl">
            <span className="size-2 rounded-full bg-taxi" />
            {page.eyebrow}
          </div>
          <h1 className="hero-title max-w-5xl text-balance font-extrabold">
            {page.title}
          </h1>
          <p className="mt-7 max-w-[58ch] text-pretty text-xl leading-8 text-white/78">{page.summary}</p>
          <div className="hero-command-row mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${data.settings.phone}`} className="hero-command hero-command-primary">
              <span>{locale === 'en' ? 'Call now' : 'Ring nå'}</span>
              <span><Phone size={18} weight={iconWeight} /></span>
            </a>
            <a href={data.settings.booking_url} className="hero-command">
              <span>{locale === 'en' ? 'Book online' : 'Bestill på nett'}</span>
              <span><ArrowUpRight size={18} weight={iconWeight} /></span>
            </a>
          </div>
          <div className="hero-signal-grid mt-9 grid max-w-2xl grid-cols-3 gap-2">
            {signals.map(([value, label], index) => (
              <div key={label} className="hero-signal reveal" style={{ '--index': index + 2 } as React.CSSProperties}>
                <span>{value}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-cockpit reveal [--index:1]">
          <div className="cockpit-topline">
            <span>{locale === 'en' ? 'Live dispatch' : 'Live sentral'}</span>
            <span>{locale === 'en' ? 'Ready' : 'Klar'}</span>
          </div>
          <div className="cockpit-map" aria-hidden="true">
            <span className="map-node map-node-a" />
            <span className="map-node map-node-b" />
            <span className="map-node map-node-c" />
          </div>
          <div className="booking-panel">
            <div className="booking-panel-core">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--accent-strong)' }}>
                  {locale === 'en' ? 'Book your trip' : 'Bestill tur'}
                </div>
                <h2 className="mt-4 text-3xl font-extrabold leading-none tracking-[-0.035em]">
                  {locale === 'en' ? 'Taxi on Voss, without waiting.' : 'Taxi på Voss, uten ventestøy.'}
                </h2>
              </div>
              <span className="booking-orb">
                <Timer size={22} weight={iconWeight} />
              </span>
            </div>
            <div className="mt-7 grid gap-3">
              <a href={`tel:${data.settings.phone}`} className="booking-action booking-action-primary">
                <span>
                  <span className="block text-sm opacity-70">{locale === 'en' ? 'Call dispatch' : 'Ring sentralen'}</span>
                  <span className="block text-lg font-bold">{data.settings.phone_display}</span>
                </span>
                <span className="booking-action-icon"><Phone size={20} weight={iconWeight} /></span>
              </a>
              <a href={data.settings.booking_url} className="booking-action">
                <span>
                  <span className="block text-sm opacity-70">{locale === 'en' ? 'Online booking' : 'Bestilling på nett'}</span>
                  <span className="block font-bold">{locale === 'en' ? 'Start booking' : 'Start bestilling'}</span>
                </span>
                <span className="booking-action-icon"><ArrowUpRight size={20} weight={iconWeight} /></span>
              </a>
              <a href={data.settings.fare_calculator_url} className="booking-action">
                <span>
                  <span className="block text-sm opacity-70">{locale === 'en' ? 'Fare estimate' : 'Priskalkulator'}</span>
                  <span className="block font-bold">{locale === 'en' ? 'Check price' : 'Sjekk pris'}</span>
                </span>
                <span className="booking-action-icon"><Gauge size={20} weight={iconWeight} /></span>
              </a>
            </div>
            <div className="booking-assurance mt-5">
              <ShieldCheck size={18} weight={iconWeight} />
              <span>{locale === 'en' ? 'Local drivers, known roads and pre-booked trips.' : 'Lokale sjåførar, kjende vegar og førehandstinging.'}</span>
            </div>
            </div>
          </div>
          <div className="cockpit-footer">
            <span>Voss stasjon</span>
            <span>Bavallen</span>
            <span>Fleischer's</span>
          </div>
        </aside>
      </div>
    </section>
  )
}

function BookingStrip({ data, locale }: { data: SiteData; locale: Locale }) {
  const items = [
    { icon: Phone, label: locale === 'en' ? 'Call dispatch' : 'Ring sentralen', value: data.settings.phone_display, href: `tel:${data.settings.phone}` },
    { icon: Gauge, label: locale === 'en' ? 'Fare estimate' : 'Priskalkulator', value: locale === 'en' ? 'Open calculator' : 'Opne kalkulator', href: data.settings.fare_calculator_url },
    { icon: CalendarCheck, label: locale === 'en' ? 'Book online' : 'Bestill på nett', value: locale === 'en' ? 'Start booking' : 'Start bestilling', href: data.settings.booking_url },
  ]

  return (
    <section className="booking-strip px-4 md:px-6">
      <div className="booking-strip-shell mx-auto grid max-w-[92rem] gap-3 rounded-[30px] border p-2 md:grid-cols-[1.2fr_.9fr_.9fr]" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
        {items.map((item, index) => (
          <a key={item.label} href={item.href} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[1.45rem] p-5 transition duration-700 ease-[cubic-bezier(.32,.72,0,1)] hover:-translate-y-1 active:scale-[0.985]" style={{ background: index === 0 ? 'var(--accent)' : 'var(--surface)', color: index === 0 ? 'var(--accent-ink)' : 'var(--text)' }}>
            <span className="grid size-12 place-items-center rounded-full" style={{ background: index === 0 ? 'rgba(24,21,17,.12)' : 'var(--surface-soft)' }}>
              <item.icon size={21} weight={iconWeight} />
            </span>
            <span>
              <span className="block text-sm opacity-70">{item.label}</span>
              <span className="block font-bold">{item.value}</span>
            </span>
            <span className="grid size-9 place-items-center rounded-full bg-current/8 transition duration-700 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <ArrowRight size={19} />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Services({ data, locale }: { data: SiteData; locale: Locale }) {
  return (
    <section className="fleet-section mx-auto max-w-[92rem] px-4 py-20 md:px-8 md:py-32">
      <div className="grid gap-12 md:grid-cols-[.72fr_1.28fr]">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--accent-strong)' }}>{locale === 'en' ? 'Services' : 'Tenester'}</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
            {locale === 'en' ? 'A cleaner overview of the fleet.' : 'Eit ryddigare overblikk over bilparken.'}
          </h2>
        </div>
        <div className="fleet-list grid gap-3">
          {data.services.map((service, index) => (
            <article key={service.id} className="service-list-card reveal grid gap-5 rounded-[18px] border p-5 transition md:grid-cols-[auto_1fr_auto]" style={{ '--index': index, borderColor: 'var(--line)', background: 'var(--surface)' } as React.CSSProperties}>
              <span className="grid size-11 place-items-center rounded-md bg-taxi text-[#181511]">
                <Car size={20} weight={iconWeight} />
              </span>
              <div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-2 max-w-[68ch] leading-7" style={{ color: 'var(--muted)' }}>{service.description}</p>
              </div>
              {service.capacity ? <div className="font-mono text-sm uppercase tracking-[0.14em]" style={{ color: 'var(--accent-strong)' }}>{service.capacity}</div> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaresAndLinks({ data, locale }: { data: SiteData; locale: Locale }) {
  return (
    <section className="border-y" style={{ borderColor: 'var(--line)', background: 'var(--bg-elevated)' }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[.9fr_1.1fr] md:px-6">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--accent-strong)' }}>{locale === 'en' ? 'Fares' : 'Takstar'}</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight">{locale === 'en' ? 'Fast choices before the trip.' : 'Raske valg før turen.'}</h2>
          <div className="mt-8 divide-y" style={{ borderColor: 'var(--line)' }}>
            {data.fares.map((fare) => (
              <div key={fare.id} className="grid grid-cols-[1fr_auto] gap-4 py-5">
                <div>
                  <h3 className="font-bold">{fare.label}</h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{fare.note}</p>
                </div>
                <div className="font-mono" style={{ color: 'var(--accent-strong)' }}>{fare.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {data.quickLinks.map((link, index) => (
            <a key={link.id} href={link.href} className="group flex min-h-44 flex-col justify-between rounded-[8px] border p-5 transition hover:-translate-y-0.5 active:translate-y-px" style={{ '--index': index, borderColor: 'var(--line)', background: 'var(--surface)' } as React.CSSProperties}>
              <div>
                <div className="mb-5 flex justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--accent-strong)' }}>0{index + 1}</span>
                  <ArrowRight className="transition group-hover:translate-x-1" size={20} />
                </div>
                <h3 className="text-xl font-bold">{link.title}</h3>
                <p className="mt-2 text-pretty" style={{ color: 'var(--muted)' }}>{link.description}</p>
              </div>
              <span className="mt-6 font-mono text-xs uppercase tracking-[0.18em]">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery({ data, locale }: { data: SiteData; locale: Locale }) {
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set())
  const visibleGallery = data.gallery.filter((item) => !failedImages.has(item.id))

  return (
    <section className="mx-auto max-w-7xl px-4 py-18 md:px-6 md:py-24">
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--accent-strong)' }}>{locale === 'en' ? 'Gallery' : 'Galleri'}</p>
        <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight">{locale === 'en' ? 'Real Voss Taxi material.' : 'Ekte Voss Taxi-materiale.'}</h2>
      </div>
      <div className="gallery-grid grid gap-4 md:grid-cols-4">
        {visibleGallery.map((item, index) => (
          <figure key={item.id} className="gallery-tile reveal overflow-hidden rounded-[18px] border" style={{ '--index': index, borderColor: 'var(--line)', background: 'var(--surface)' } as React.CSSProperties}>
            <img
              className="gallery-image w-full object-cover transition duration-500 hover:scale-[1.025]"
              src={cleanGalleryImageUrl(assetUrl(import.meta.env.VITE_DIRECTUS_URL ?? '', item.image))}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              onError={() => setFailedImages((current) => new Set(current).add(item.id))}
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
  if (!blocks.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <div className="grid gap-4">
        {blocks.map((block, index) => {
          if (block.type === 'rich_text') {
            return (
              <article key={`${block.type}-${index}`} className="rounded-[8px] border p-6" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
                {block.title ? <h2 className="text-2xl font-bold">{block.title}</h2> : null}
                <div className="mt-3 max-w-[76ch] leading-8" style={{ color: 'var(--muted)' }}>
                  <ReactMarkdown>{block.body}</ReactMarkdown>
                </div>
              </article>
            )
          }

          if (block.type === 'cta') {
            return (
              <a key={`${block.type}-${index}`} href={block.href} className="group rounded-[8px] border p-6 transition" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
                <h2 className="text-2xl font-bold">{block.title}</h2>
                <p className="mt-3" style={{ color: 'var(--muted)' }}>{block.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold" style={{ color: 'var(--accent-strong)' }}>
                  {block.label}
                  <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                </span>
              </a>
            )
          }

          return null
        })}
      </div>
    </section>
  )
}

function ContactPanel({ data, locale }: { data: SiteData; locale: Locale }) {
  return (
    <section className="border-t" style={{ borderColor: 'var(--line)', background: 'var(--bg-elevated)' }}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[.8fr_1.2fr] md:px-6">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--accent-strong)' }}>{locale === 'en' ? 'Contact' : 'Kontakt'}</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight">{locale === 'en' ? 'Ready when Voss moves.' : 'Klar når Voss skal vidare.'}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <ContactCard href={`tel:${data.settings.phone}`} icon={Phone} label={locale === 'en' ? 'Phone' : 'Telefon'} value={data.settings.phone_display} />
          <ContactCard href={`mailto:${data.settings.email}`} icon={EnvelopeSimple} label="E-post" value={data.settings.email} />
          <ContactCard href={data.settings.map_url} icon={MapPin} label={locale === 'en' ? 'Address' : 'Adresse'} value={data.settings.address} />
        </div>
      </div>
    </section>
  )
}

function ContactCard({ href, icon: Icon, label, value }: { href: string; icon: typeof Phone; label: string; value: string }) {
  return (
    <a href={href} className="rounded-[8px] border p-5 transition hover:-translate-y-0.5 active:translate-y-px" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
      <Icon size={24} weight={iconWeight} />
      <span className="mt-5 block text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
      <span className="block break-words font-bold">{value}</span>
    </a>
  )
}

function Footer({ data, locale }: { data: SiteData; locale: Locale }) {
  return (
    <footer className="border-t px-4 py-10 md:px-6" style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="text-lg font-extrabold">{data.settings.site_name}</div>
          <div className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{data.settings.address}</div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var(--muted)' }}>
          <a className="hover:underline" href={data.settings.facebook_url}>Facebook</a>
          <a className="hover:underline" href={data.settings.instagram_url}>Instagram</a>
          <a className="hover:underline" href={data.settings.app_store_url}>App Store</a>
          <a className="hover:underline" href={data.settings.play_store_url}>Google Play</a>
          <span>{locale === 'en' ? 'Public transport links preserved.' : 'Eksisterande transportlenker er bevart.'}</span>
        </div>
      </div>
    </footer>
  )
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
      <div className="space-y-5">
        <div className="h-4 w-40 animate-pulse rounded bg-current opacity-10" />
        <div className="h-16 w-full animate-pulse rounded bg-current opacity-10" />
        <div className="h-24 w-2/3 animate-pulse rounded bg-current opacity-10" />
      </div>
      <div className="aspect-[4/3] animate-pulse rounded-lg bg-current opacity-10" />
    </div>
  )
}

function StatusBanner({ data }: { data: SiteData }) {
  if (data.source === 'directus') return null

  return (
    <div className="border-b px-4 py-3 text-sm md:px-6" style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent-strong)' }}>
      <div className="mx-auto max-w-7xl">
        {data.error
          ? `Directus content could not be loaded, using fallback content. ${data.error}`
          : 'Using local fallback content until VITE_DIRECTUS_URL is configured.'}
      </div>
    </div>
  )
}

function Page({ themeMode, setThemeMode }: { themeMode: ThemeMode; setThemeMode: (mode: ThemeMode) => void }) {
  const location = useLocation()
  const redirectTarget = getRedirectTarget(location.pathname)
  const route = parseRoute(location.pathname)
  const { data, loading } = useSiteData(route.locale)
  const page = useMemo(
    () => data.pages.find((candidate) => candidate.slug === route.slug) ?? data.pages.find((candidate) => candidate.slug === 'home') ?? fallbackByLocale[route.locale].pages[0],
    [data.pages, route.locale, route.slug],
  )

  if (redirectTarget) return <Navigate to={redirectTarget} replace />
  const isHome = route.slug === 'home'

  return (
    <>
      <Header data={data} locale={route.locale} themeMode={themeMode} setThemeMode={setThemeMode} />
      <StatusBanner data={data} />
      {loading ? <LoadingSkeleton /> : null}
      <main id="main-content">
        <Hero page={page} data={data} locale={route.locale} />
        {isHome ? (
          <>
            <BookingStrip data={data} locale={route.locale} />
            <PageBlocks blocks={page.blocks} />
            <FaresAndLinks data={data} locale={route.locale} />
            <Marquee />
          </>
        ) : (
          <SubPage slug={route.slug} page={page} data={data} locale={route.locale} />
        )}
      </main>
      <Footer data={data} locale={route.locale} />
    </>
  )
}

function SubPage({ slug, page, data, locale }: { slug: string; page: CmsPage; data: SiteData; locale: Locale }) {
  if (slug === 'tenester' || slug === 'services' || slug === 'rullestol' || slug === 'wheelchair') {
    return (
      <>
        <Services data={data} locale={locale} />
        <ContactPanel data={data} locale={locale} />
      </>
    )
  }

  if (slug === 'takstar' || slug === 'fares') {
    return (
      <>
        <FaresAndLinks data={data} locale={locale} />
        <PageBlocks blocks={page.blocks} />
        <ContactPanel data={data} locale={locale} />
      </>
    )
  }

  if (slug === 'galleri' || slug === 'gallery') {
    return (
      <>
        <Gallery data={data} locale={locale} />
        <ContactPanel data={data} locale={locale} />
      </>
    )
  }

  if (slug === 'kontakt' || slug === 'contact' || slug === 'ris-ros') {
    return (
      <>
        <ContactPanel data={data} locale={locale} />
        <PageBlocks blocks={page.blocks} />
      </>
    )
  }

  return (
    <>
      <PageBlocks blocks={page.blocks} />
      <ContactPanel data={data} locale={locale} />
    </>
  )
}

function Marquee() {
  return (
    <section className="overflow-hidden border-t py-4" style={{ borderColor: 'var(--line)' }}>
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em]" style={{ color: 'var(--muted)' }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <span key={index} className="flex gap-8">
            <span>Voss Taxi SA</span>
            <span>Trygg transport</span>
            <span>Maxi-taxi</span>
            <span>Rullestolbil</span>
            <span>Takstar</span>
            <span>Bestilling</span>
          </span>
        ))}
      </div>
    </section>
  )
}

function AppRoutes() {
  const { mode, setMode } = useThemeMode()
  const [mobilePreview, setMobilePreview] = useState(false)

  return (
    <>
      <button
        type="button"
        className="preview-toggle"
        aria-pressed={mobilePreview}
        onClick={() => setMobilePreview((enabled) => !enabled)}
      >
        <DeviceMobile size={18} weight={iconWeight} />
        {mobilePreview ? 'Avslutt mobilvisning' : 'Simuler mobil'}
      </button>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-40 focus:rounded-md focus:bg-taxi focus:px-4 focus:py-3 focus:font-bold focus:text-[#181511]">
        Hopp til innhald
      </a>
      <div className="grain" aria-hidden="true" />
      <div className={mobilePreview ? 'mobile-preview-stage' : undefined}>
        <div className={mobilePreview ? 'mobile-preview-device' : undefined}>
          <Routes>
            <Route path="*" element={<Page themeMode={mode} setThemeMode={setMode} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}
