import {
  ArrowRight,
  ArrowUpRight,
  Car,
  EnvelopeSimple,
  Gauge,
  MapPin,
  Phone,
  ShieldCheck,
  Timer,
  BookOpen,
  FileText,
  LockKey,
  ChatCircleDots,
  AirplaneTilt,
  Wheelchair,
  SuitcaseRolling,
  Baby,
  Bicycle,
  Dog,
  type Icon,
} from '@phosphor-icons/react'
import { useEffect, useMemo, useState, createContext, useContext, useCallback, useRef } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { ContactForm } from './components/ContactForm'
import { fallbackByLocale } from './content/fallback'
import { useUI } from './content/ui'
import heroVideo from './content/hero_bg.mp4'
import { assetUrl, fetchSiteData } from './lib/directus'
import { cleanGalleryImageUrl } from './lib/heroImages'
import { getRedirectTarget, parseRoute } from './lib/routes'
import { getInitialThemeMode, resolveThemeMode, type ThemeMode } from './lib/theme'
import { glassCardStyles, glassCardStrongStyles, glassBlurredStyles, accentColor, mutedColor, lineColor } from './lib/styles'
import { formatPhone, iconWeight } from './lib/shared'
import type { CmsPage, Locale, PageBlock, SiteData } from './types'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet-async'

import { StatusBanner } from './components/StatusBanner'
import { Marquee } from './components/Marquee'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Lightbox } from './components/Lightbox'

const LightboxContext = createContext<(url: string) => void>(() => {})

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
    return
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



function Hero({ data, page, locale }: { data: SiteData; page: CmsPage; locale: Locale }) {
  const isHome = page.slug === '' || page.slug === 'home'
  const t = useUI(locale)

  const signals = [
    ['24/7', t.dispatch],
    [t.wheelchairs, t.electricManual],
    ['Maxi', t.groups],
  ]

  return (
    <section
      className={`hero-stage relative ${isHome ? 'min-h-[75dvh]' : 'min-h-[25dvh]'}`}
    >
      <div className="hero-brand-mark" aria-hidden="true">VOSS</div>
      {isHome && (
        <div className="hero-route-line absolute bottom-10 left-1/2 hidden w-[min(76rem,calc(100%-3rem))] -translate-x-1/2 md:block" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className={`hero-grid relative z-10 mx-auto ${isHome ? 'flex min-h-[75dvh] flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(390px,500px)] lg:items-center' : 'flex min-h-[25dvh] flex-col justify-end'} max-w-[92rem] gap-8 px-4 pb-12 pt-28 md:px-8 md:pb-16`}>
        <div className="reveal max-w-6xl pb-4 text-white [--index:0]">
          <div className="hero-kicker mb-6 inline-flex w-fit items-center gap-2 rounded-[10px] border border-white/18 bg-white/10 px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/78 backdrop-blur-xl">
            <span className="size-2 rounded-full bg-taxi" />
            {page.eyebrow}
          </div>
          <h1 className="hero-title max-w-5xl text-balance font-extrabold">
            {page.title}
          </h1>
          <p className="mt-7 max-w-[58ch] text-pretty text-xl leading-8 text-white/78">{page.summary}</p>
          {isHome && (
            <>
              <div className="hero-command-row mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${data.settings.phone}`} className="hero-command hero-command-primary">
                  <span>{t.callNow}</span>
                  <span><Phone size={18} weight={iconWeight} /></span>
                </a>
                <a href={data.settings.booking_url} className="hero-command">
                  <span>{t.bookOnline}</span>
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
            </>
          )}
        </div>

        {isHome && (
          <aside className="hero-cockpit reveal [--index:1]">
            <div className="cockpit-topline">
              <span>{t.liveDispatch}</span>
              <span>{t.ready}</span>
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
                    {t.bookYourTrip}
                  </div>
                  <h2 className="mt-4 text-3xl font-extrabold leading-none tracking-[-0.035em]">
                    {t.taxiOnVoss}
                  </h2>
                </div>
                <span className="booking-orb">
                  <Timer size={22} weight={iconWeight} />
                </span>
              </div>
              <div className="mt-7 grid gap-3">
                <a href={`tel:${data.settings.phone}`} className="booking-action booking-action-primary">
                  <span>
                    <span className="block text-sm opacity-70">{t.callDispatch}</span>
                    <span className="block text-lg font-bold">{formatPhone(data.settings.phone_display)}</span>
                  </span>
                  <span className="booking-action-icon"><Phone size={20} weight={iconWeight} /></span>
                </a>
                <a href={data.settings.booking_url} className="booking-action">
                  <span>
                    <span className="block text-sm opacity-70">{t.onlineBooking}</span>
                    <span className="block font-bold">{t.startBooking}</span>
                  </span>
                  <span className="booking-action-icon"><ArrowUpRight size={20} weight={iconWeight} /></span>
                </a>
                <a href={data.settings.fare_calculator_url} className="booking-action">
                  <span>
                    <span className="block text-sm opacity-70">{t.fareEstimate}</span>
                    <span className="block font-bold">{t.checkPrice}</span>
                  </span>
                  <span className="booking-action-icon"><Gauge size={20} weight={iconWeight} /></span>
                </a>
              </div>
              <div className="booking-assurance mt-5">
                <ShieldCheck size={18} weight={iconWeight} />
                <span>{t.localDrivers}</span>
              </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}



function Services({ data, locale }: { data: SiteData; locale: Locale }) {
  const t = useUI(locale)
  return (
    <section className="fleet-section mx-auto max-w-[92rem] px-4 py-20 md:px-8 md:py-32">
      <div className="grid gap-12 md:grid-cols-[.72fr_1.28fr]">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]" style={accentColor}>{t.services}</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
            {t.fleetOverview}
          </h2>
        </div>
        <div className="fleet-list grid gap-3">
          {data.services.map((service, index) => {
            let ServiceIcon = Car
            if (service.id.includes('-1')) ServiceIcon = AirplaneTilt
            else if (service.id.includes('-2')) ServiceIcon = Wheelchair
            else if (service.id.includes('-3')) ServiceIcon = SuitcaseRolling
            else if (service.id.includes('-4')) ServiceIcon = Baby
            else if (service.id.includes('-5')) ServiceIcon = Bicycle
            else if (service.id.includes('-6')) ServiceIcon = Dog
            
            return (
              <article key={service.id} className="service-list-card reveal grid gap-5 rounded-[24px] border p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 md:grid-cols-[auto_1fr_auto]" style={{ '--index': index, ...glassCardStyles } as React.CSSProperties}>
                <span className="grid size-11 place-items-center rounded-md bg-taxi text-[#181511]">
                  <ServiceIcon size={20} weight={iconWeight} />
                </span>
                <div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-2 max-w-[68ch] leading-7" style={mutedColor}>{service.description}</p>
              </div>
              {service.capacity ? <div className="font-mono text-sm uppercase tracking-[0.14em]" style={accentColor}>{service.capacity}</div> : null}
            </article>
          )})}
        </div>
      </div>
    </section>
  )
}

function FaresAndLinks({ data, locale }: { data: SiteData; locale: Locale }) {
  const t = useUI(locale)
  return (
    <section className="border-y" style={{ ...lineColor, ...glassBlurredStyles }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[.9fr_1.1fr] md:px-6">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]" style={accentColor}>{t.fares}</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight">{t.fastChoices}</h2>
          <div className="mt-8 divide-y" style={lineColor}>
            {data.fares.map((fare) => (
              <div key={fare.id} className="grid grid-cols-[1fr_auto] gap-4 py-5">
                <div>
                  <h3 className="font-bold">{fare.label}</h3>
                  <p className="mt-1 text-sm" style={mutedColor}>{fare.note}</p>
                </div>
                <div className="font-mono" style={accentColor}>{fare.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {data.quickLinks.map((link, index) => (
            <a key={link.id} href={link.href} className="group flex min-h-44 flex-col justify-between rounded-[24px] border p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 active:translate-y-px" style={{ '--index': index, ...glassCardStyles } as React.CSSProperties}>
              <div>
                <div className="mb-5 flex justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.18em]" style={accentColor}>0{index + 1}</span>
                  <ArrowRight className="transition group-hover:translate-x-1" size={20} />
                </div>
                <h3 className="text-xl font-bold">{link.title}</h3>
                <p className="mt-2 text-pretty" style={mutedColor}>{link.description}</p>
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
  const visibleGallery = data.gallery.filter((item) => !failedImages.has(item.id) && !item.image.includes('2.3___serialized1.png'))
  const openLightbox = useContext(LightboxContext)

  const handleImageError = useCallback((itemId: string) => {
    setFailedImages((current) => new Set(current).add(itemId))
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-18 md:px-6 md:py-24">
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]" style={accentColor}>{locale === 'en' ? 'Gallery' : 'Galleri'}</p>
        <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight">
          {locale === 'en' ? 'Voss Taxi everyday life.' : 'Voss Taxi i kvardagen.'}
        </h2>
        <p className="muted mt-4 max-w-xl text-lg">
          {locale === 'en'
            ? 'A small selection of our cars, assignments, and the transport environment in Voss.'
            : 'Eit lite utval frå bilar, oppdrag og transportmiljøet på Voss.'}
        </p>
      </div>
      <div className="gallery-grid grid gap-4 md:grid-cols-4">
        {visibleGallery.map((item, index) => (
          <figure key={item.id} className="gallery-tile reveal overflow-hidden rounded-[18px] border flex flex-col" style={{ '--index': index, ...lineColor, background: 'var(--surface)' } as React.CSSProperties}>
            <img
              className="gallery-image h-full w-full cursor-pointer object-cover transition duration-500 hover:scale-[1.025]"
              src={cleanGalleryImageUrl(assetUrl(import.meta.env.VITE_STRAPI_API_URL || 'https://cms.vosstaxi.no', item.image))}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(cleanGalleryImageUrl(assetUrl(import.meta.env.VITE_STRAPI_API_URL || 'https://cms.vosstaxi.no', item.image)))
                }
              }}
              onClick={() => openLightbox(cleanGalleryImageUrl(assetUrl(import.meta.env.VITE_STRAPI_API_URL || 'https://cms.vosstaxi.no', item.image)))}
              onError={() => handleImageError(item.id)}
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
  const openLightbox = useContext(LightboxContext)
  if (!blocks.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <div className="grid gap-4">
        {blocks.map((block, index) => {
          if (block.type === 'rich_text') {
            return (
              <article key={`${block.type}-${index}`} className="rounded-[1.2rem] border p-8 shadow-lg backdrop-blur-2xl md:p-12" style={{ ...lineColor, background: 'color-mix(in srgb, var(--surface) 75%, transparent)' }}>
                {block.title ? <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">{block.title}</h2> : null}
                <div className="markdown-body max-w-[76ch] text-lg leading-relaxed md:text-xl" style={mutedColor}>
                  <ReactMarkdown
                    components={{
                      img: ({ src, alt }) => {
                        const isBadge = src && (src.includes('app-store') || src.includes('google-play'));
                        const displayAlt = alt && alt !== 'image' ? alt : '';
                        
                        if (isBadge) {
                           return (
                             <img
                               src={src || ''}
                               alt={displayAlt}
                               className="inline-block transition-transform hover:scale-[1.05]"
                               style={{ height: '56px', width: 'auto', margin: '0 16px 16px 0', borderRadius: '8px' }}
                               onError={(e) => { e.currentTarget.style.display = 'none'; }}
                             />
                           );
                        }
                        const optimizedSrc = cleanGalleryImageUrl(src || '');
                        return (
                          <span className="my-12 block">
                            <img
                              src={optimizedSrc}
                              alt={displayAlt}
                              tabIndex={0}
                              role="button"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (target.parentElement) {
                                  target.parentElement.style.display = 'none';
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  src && openLightbox(src)
                                }
                              }}
                              onClick={() => src && openLightbox(src)}
                              className="mx-auto cursor-pointer rounded-2xl border-[6px] object-cover shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02]"
                              style={{
                                borderColor: 'var(--surface)',
                                backgroundColor: 'var(--surface)',
                                display: 'block',
                                width: '100%',
                                height: 'auto',
                                maxWidth: '90%'
                              }}
                            />
                            {displayAlt ? <span className="mt-4 block text-center text-sm italic opacity-70">{displayAlt}</span> : null}
                          </span>
                        );
                      }
                    }}
                  >{block.body.replace(/<br\s*\/?>/gi, '\n\n')}</ReactMarkdown>
                </div>
              </article>
            )
          }

          if (block.type === 'cta') {
            return (
              <a key={`${block.type}-${index}`} href={block.href} className="group rounded-[8px] border p-6 transition" style={{ ...lineColor, background: 'var(--surface)' }}>
                <h2 className="text-2xl font-bold">{block.title}</h2>
                <p className="mt-3" style={mutedColor}>{block.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold" style={accentColor}>
                  {block.label}
                  <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                </span>
              </a>
            )
          }

          if (block.type === 'contact_form') {
            return <ContactForm key={`${block.type}-${index}`} />
          }

          return null
        })}
      </div>
    </section>
  )
}

function ContactPanel({ data, locale }: { data: SiteData; locale: Locale }) {
  return (
    <section className="border-t" style={{ ...lineColor, ...glassBlurredStyles }}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[.8fr_1.2fr] md:px-6">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]" style={accentColor}>{locale === 'en' ? 'Contact' : 'Kontakt'}</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight">{locale === 'en' ? 'Ready when you are.' : 'Klar når du er.'}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <ContactCard href={`tel:${data.settings.phone}`} icon={Phone} label={locale === 'en' ? 'Phone' : 'Telefon'} value={formatPhone(data.settings.phone_display)} />
          <ContactCard href="/kontakt" icon={EnvelopeSimple} label="E-post" value={data.settings.email} />
          <ContactCard href={data.settings.map_url} icon={MapPin} label={locale === 'en' ? 'Address' : 'Adresse'} value={data.settings.address} />
        </div>
      </div>
    </section>
  )
}

function ContactCard({ href, icon: IconComponent, label, value }: { href: string; icon: Icon; label: string; value: string }) {
  return (
    <a href={href} className="rounded-[20px] border p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 active:translate-y-px" style={{ ...glassCardStyles }}>
      <IconComponent size={24} weight={iconWeight} />
      <span className="mt-5 block text-sm" style={mutedColor}>{label}</span>
      <span className="block break-words font-bold">{value}</span>
    </a>
  )
}




function Page({ themeMode, setThemeMode }: { themeMode: ThemeMode; setThemeMode: (mode: ThemeMode) => void }) {
  const location = useLocation()
  const redirectTarget = getRedirectTarget(location.pathname)
  const route = parseRoute(location.pathname)
  const { data, loading } = useSiteData(route.locale)
  const page = useMemo(
    () => data.pages.find((candidate) => candidate.slug === route.slug || ((route.slug === 'galleri' || route.slug === 'gallery') && (candidate.slug === 'galleri' || candidate.slug === 'gallery'))) ?? data.pages.find((candidate) => candidate.slug === 'home') ?? fallbackByLocale[route.locale].pages[0],
    [data.pages, route.locale, route.slug],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const videoRef = useRef<HTMLVideoElement>(null)

  // Video autoplay is handled by HTML attributes
  // Random time feature commented out due to Firefox autoplay issues
  // useEffect(() => {
  //   const video = videoRef.current
  //   if (!video) return
  //
  //   const setRandomTime = () => {
  //     if (video.duration && !video.dataset.randomized) {
  //       video.dataset.randomized = "true"
  //       const maxStart = Math.max(0, video.duration - 20)
  //       video.currentTime = Math.random() * maxStart
  //     }
  //   }
  //
  //   video.addEventListener('play', setRandomTime, { once: true })
  //   return () => video.removeEventListener('play', setRandomTime)
  // }, [])

  if (location.pathname === '/umami' || location.pathname === '/statistikk') {
    window.location.replace('https://cloud.umami.is/analytics/eu/websites/b2606af9-4c2a-48f5-ba9d-9aa552c9ab0d')
    return <div className="fixed inset-0 flex items-center justify-center font-mono font-bold" style={{ background: 'var(--bg)' }}>Laster statistikk...</div>
  }

  if (redirectTarget) return <Navigate to={redirectTarget} replace />
  const isHome = route.slug === 'home'

  return (
    <>
      <Helmet>
        <html lang={route.locale} />
        <link rel="canonical" href={`https://vosstaxi.no${location.pathname}`} />
        <title>{page.seo_title || page.title || data.settings.site_name}</title>
        <meta name="description" content={page.seo_description || page.summary || ''} />
        <meta property="og:title" content={page.seo_title || page.title || data.settings.site_name} />
        <meta property="og:description" content={page.seo_description || page.summary || ''} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://vosstaxi.no${location.pathname}`} />
        <meta property="og:image" content="https://vosstaxi.no/images/app-store.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TaxiService',
            name: data.settings.site_name,
            telephone: data.settings.phone,
            email: data.settings.email,
            address: data.settings.address,
            url: 'https://vosstaxi.no',
            areaServed: 'Voss',
            priceRange: '$$'
          })}
        </script>
      </Helmet>
      <Header data={data} locale={route.locale} themeMode={themeMode} setThemeMode={setThemeMode} />
      <StatusBanner data={data} locale={route.locale} />
      {loading ? <LoadingSkeleton /> : null}
      
      <div className="fixed inset-0 -z-50 h-full w-full bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="hero-yellow-blade" aria-hidden="true" />

      <main id="main-content">
        {page.slug !== 'bestilling' && (
          <Hero page={page} data={data} locale={route.locale} />
        )}
        <div className="relative w-full rounded-t-[2.5rem] md:rounded-t-[4rem]">
          <div className="absolute inset-0 rounded-[inherit] main-content-bg" style={{ zIndex: -20 }} />
          <div className="relative z-10 pt-10">
            {isHome ? (
              <>
                <section className="mx-auto max-w-7xl px-4 pt-10 md:px-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Link to={route.locale === 'en' ? '/en/historia-var' : '/no/historia-var'} className="flex items-center gap-4 rounded-2xl border p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 active:scale-[0.98]" style={{ ...glassCardStyles }}>
                      <BookOpen size={28} weight={iconWeight} style={accentColor} />
                      <span className="text-base font-bold">{route.locale === 'en' ? 'Our History' : 'Historia vår'}</span>
                    </Link>
                    <Link to={route.locale === 'en' ? '/en/transportvilkar' : '/no/transportvilkar'} className="flex items-center gap-4 rounded-2xl border p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 active:scale-[0.98]" style={{ ...glassCardStyles }}>
                      <FileText size={28} weight={iconWeight} style={accentColor} />
                      <span className="text-base font-bold">{route.locale === 'en' ? 'Terms & Conditions' : 'Transportvilkår'}</span>
                    </Link>
                    <Link to={route.locale === 'en' ? '/en/personvern' : '/no/personvern'} className="flex items-center gap-4 rounded-2xl border p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 active:scale-[0.98]" style={{ ...glassCardStyles }}>
                      <LockKey size={28} weight={iconWeight} style={accentColor} />
                      <span className="text-base font-bold">{route.locale === 'en' ? 'Privacy Policy' : 'Personvern'}</span>
                    </Link>
                  </div>
                </section>
                <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
                  <article className="rounded-3xl border p-8 shadow-xl backdrop-blur-2xl transition-all duration-500 hover:shadow-2xl md:p-12" style={{ ...glassCardStrongStyles }}>
                    <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">{route.locale === 'en' ? 'Safety in Focus' : 'Tryggleik i fokus'}</h2>
                    <div className="markdown-body max-w-[76ch] text-lg leading-relaxed md:text-xl" style={mutedColor}>
                      <p>{route.locale === 'en' ? 'Our goal is that you feel safe and cared for when you travel with us. We have professional and experienced drivers and staff. All our cars are equipped with:' : 'Målet vårt er at du skal kunna føla deg trygg og ivaretatt når du sitt på med oss. Me har profesjonelle og erfarne sjåførar og tilsette. Samstundes som alle bilane våre har:'}</p>
                      <ul className="mt-4 list-disc pl-6 space-y-2">
                        <li>Taksameter (TDS - Transport Data Systems)</li>
                        <li>Betalingsterminalar for kortbetaling og TT</li>
                        <li>Minimum Euro6 motorar / Heil elektriske bilar</li>
                        <li>Periodiske køyretøykontrollar kvart år (PKK)</li>
                        <li>Drosjeforsikring og Løyvegaranti</li>
                        <li>Godkjend barnesikringsutstyr</li>
                        <li>Førstehjelpskurs og Gyldig Køyreseddel</li>
                        <li>Taushetsavtalar og Kompetansekrav (Løyvekurs)</li>
                        <li>Glattkøyringskurs</li>
                        <li>Lampe på taket, Logo & Løyvenummer</li>
                      </ul>
                    </div>
                  </article>
                </section>
                <PageBlocks blocks={page.blocks} />
                <Marquee />
              </>
            ) : (
              <SubPage slug={route.slug} page={page} data={data} locale={route.locale} />
            )}
          </div>
        </div>
      </main>
      <Footer data={data} />
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

  if (slug === 'kontakt' || slug === 'contact') {
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


function MessengerChat() {
  return (
    <a
      href="https://m.me/vosstaxi.no"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-taxi text-[#181511] shadow-lg shadow-taxi/20 transition-transform hover:scale-110 active:scale-95"
      aria-label="Chat med oss på Messenger"
    >
      <ChatCircleDots size={32} weight="fill" />
    </a>
  )
}

function AppRoutes() {
  const { mode, setMode } = useThemeMode()
  const [lightbox, setLightbox] = useState<string | null>(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const location = useLocation()

  useEffect(() => {
    // Auto-redirect for non-Norwegian browsers on root
    if (location.pathname === '/') {
      let hasChosen = false
      try {
        hasChosen = !!localStorage.getItem('hasChosenLanguage')
      } catch(e) {}
      
      if (!hasChosen) {
        const lang = navigator.language.toLowerCase()
        if (!lang.startsWith('no') && !lang.startsWith('nb') && !lang.startsWith('nn')) {
          window.location.replace('/en')
        }
      }
    }
  }, [location.pathname])

  return (
    <LightboxContext.Provider value={setLightbox}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-40 focus:rounded-md focus:bg-taxi focus:px-4 focus:py-3 focus:font-bold focus:text-[#181511]">
        Hopp til innhald
      </a>
      <div className="grain" aria-hidden="true" />
      <div>
        <Routes>
          <Route path="*" element={<Page themeMode={mode} setThemeMode={setMode} />} />
        </Routes>
      </div>
      <Lightbox src={lightbox} onClose={closeLightbox} />
      <MessengerChat />
    </LightboxContext.Provider>
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
