import { Desktop, Moon, Sun } from '@phosphor-icons/react'
import type { ThemeMode } from '../lib/theme'

const iconWeight = 'light' as const
const themeLabels: Record<ThemeMode, string> = {
  system: 'System',
  light: 'Lys',
  dark: 'Mørk',
}

export function ThemeToggle({ mode, onChange }: { mode: ThemeMode; onChange: (mode: ThemeMode) => void }) {
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
