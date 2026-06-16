import { List, Phone, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Locale, SiteData } from '../types'
import type { ThemeMode } from '../lib/theme'
import { formatPhone, iconWeight } from '../lib/shared'
import { ThemeToggle } from './ThemeToggle'
import logoImg from '../assets/logo.png'

export function Header({
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
  const location = useLocation()
  let alternate = '/'
  if (locale === 'en') {
    alternate = location.pathname.replace(/^\/en\/?/, '/')
  } else {
    alternate = location.pathname === '/' ? '/en' : `/en${location.pathname}`
  }
  alternate = alternate.replace(/\/\/+/g, '/')

  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-3 pt-3 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[18px] border px-3 py-3 backdrop-blur-2xl md:px-4" style={{ borderColor: 'rgba(255,255,255,.18)', background: 'rgba(18,17,15,.48)', color: '#fffaf0' }}>
        <Link to={locale === 'en' ? '/en' : '/'} className="group flex items-center gap-3">
          <img src={logoImg} alt="Voss Taxi" className="h-10 w-auto object-contain transition-transform duration-500 ease-[cubic-bezier(.32,.72,0,1)] group-hover:-translate-y-0.5 group-active:scale-[0.98]" />
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
                className="whitespace-nowrap rounded-[9px] px-3 py-1.5 text-[13.5px] font-semibold transition-[transform,background,color] duration-500 ease-[cubic-bezier(.32,.72,0,1)] active:scale-[0.98]"
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
            onClick={() => {
              try { localStorage.setItem('hasChosenLanguage', 'true') } catch (e) {}
            }}
            className="rounded-[10px] border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition active:scale-[0.98]"
            style={{ borderColor: 'rgba(255,255,255,.16)', color: 'rgba(255,255,255,.72)' }}
          >
            {locale === 'en' ? 'NO' : 'EN'}
          </Link>
          <a
            href={`tel:${data.settings.phone}`}
            className="group inline-flex items-center gap-3 rounded-[12px] bg-taxi py-1.5 pl-4 pr-1.5 text-sm font-bold text-[#181511] transition duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:bg-taxi-soft active:scale-[0.98]"
          >
            {formatPhone(data.settings.phone_display)}
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
              <Link 
                to={alternate} 
                onClick={() => { 
                  setMenuOpen(false); 
                  try { localStorage.setItem('hasChosenLanguage', 'true') } catch(e) {} 
                }} 
                className="rounded-md border px-4 py-3 font-mono text-sm uppercase" 
                style={{ borderColor: 'var(--line)', color: 'var(--accent-strong)' }}
              >
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
