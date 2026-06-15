export const iconWeight = 'light' as const

export function formatPhone(p: string) {
  if (!p) return p
  if (p.includes('+47')) return p
  return `(+47) ${p}`
}
