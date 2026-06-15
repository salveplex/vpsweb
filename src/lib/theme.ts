export type ThemeMode = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

export function getInitialThemeMode(savedMode: string | null): ThemeMode {
  return savedMode === 'light' || savedMode === 'dark' || savedMode === 'system' ? savedMode : 'system'
}

export function resolveThemeMode(mode: ThemeMode, prefersDark: boolean): ResolvedTheme {
  if (mode === 'system') return prefersDark ? 'dark' : 'light'
  return mode
}
