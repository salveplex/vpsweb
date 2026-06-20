import { useState, useRef, useEffect } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import type { Locale } from '../types'

const flags = {
  no: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16" width="22" height="16" className="rounded-sm shrink-0">
      <rect width="22" height="16" fill="#ba0c2f" />
      <rect width="22" height="4" y="6" fill="#fff" />
      <rect width="4" height="16" x="6" fill="#fff" />
      <rect width="22" height="2" y="7" fill="#00205b" />
      <rect width="2" height="16" x="7" fill="#00205b" />
    </svg>
  ),
  en: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="22" height="16" className="rounded-sm shrink-0 object-cover">
      <clipPath id="en-clip"><rect width="60" height="30" /></clipPath>
      <g clipPath="url(#en-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  ),
  de: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="22" height="16" className="rounded-sm shrink-0">
      <rect width="5" height="3" fill="#FFCE00" />
      <rect width="5" height="2" fill="#DD0000" />
      <rect width="5" height="1" fill="#000000" />
    </svg>
  ),
  fr: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="22" height="16" className="rounded-sm shrink-0">
      <rect width="3" height="2" fill="#ED2939" />
      <rect width="2" height="2" fill="#fff" />
      <rect width="1" height="2" fill="#002395" />
    </svg>
  ),
  es: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="22" height="16" className="rounded-sm shrink-0">
      <rect width="3" height="2" fill="#c60b1e" />
      <rect width="3" height="1" y="0.5" fill="#ffc400" />
    </svg>
  )
}

const names = {
  no: 'Norsk',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español'
}

export function LanguageDropdown({ 
  locale, 
  onChange 
}: { 
  locale: Locale, 
  onChange: (l: Locale) => void 
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-[10px] border px-3 py-1.5 transition outline-none cursor-pointer active:scale-[0.98]"
        style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
        aria-label="Velg språk"
        type="button"
      >
        {flags[locale]}
        <CaretDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div 
          className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-[14px] border shadow-xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2"
          style={{ borderColor: 'var(--line)', background: 'var(--glass-strong)' }}
        >
          <div className="grid p-1">
            {(Object.keys(flags) as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => {
                  onChange(l)
                  setOpen(false)
                }}
                className={`flex items-center gap-3 rounded-[9px] px-3 py-2 text-sm text-left transition ${locale === l ? 'font-bold' : 'opacity-80'}`}
                style={{
                  background: locale === l ? 'var(--surface-soft)' : 'transparent',
                  color: 'var(--text)'
                }}
              >
                {flags[l]}
                {names[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
