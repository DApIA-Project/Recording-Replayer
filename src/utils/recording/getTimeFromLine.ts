export function getTimeFromLine(line: string) {
  const parts = line.split(',')
  const date = new Date(`${parts[8]} ${parts[9]}`)
  return date.getTime()
}
