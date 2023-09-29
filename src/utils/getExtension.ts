export function getExtension(fn: string): string {
  const segments = fn.split('.')
  if (segments.length <= 1) return ''
  return (segments.slice(-1)[0] || '').toLowerCase()
}
