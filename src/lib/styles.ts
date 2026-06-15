export const glassCardStyles = {
  borderColor: 'var(--line)',
  background: 'var(--glass)',
} as const

export const glassCardStrongStyles = {
  borderColor: 'var(--line)',
  background: 'var(--glass-strong)',
} as const

export const glassBlurredStyles = {
  borderColor: 'var(--line)',
  background: 'color-mix(in srgb, var(--surface) 85%, transparent)',
  backdropFilter: 'blur(16px)',
} as const

export const glassBlurredHeavyStyles = {
  borderColor: 'var(--line)',
  background: 'color-mix(in srgb, var(--surface) 95%, transparent)',
  backdropFilter: 'blur(24px)',
} as const

export const accentColor = { color: 'var(--accent-strong)' } as const

export const mutedColor = { color: 'var(--muted)' } as const

export const lineColor = { borderColor: 'var(--line)' } as const
