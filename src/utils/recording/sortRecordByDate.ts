export function sortRecordByDate(recordingContent: string): string[] {
  const sortKey = (line: string): Date => {
    const parts = line.split(',')
    return new Date(`${parts[8]} ${parts[9]}`)
  }

  const messages = recordingContent
    .trim()
    .split('\n')
    .filter((message) => !isNaN(sortKey(message).getTime()))
  return messages.sort((a, b) => sortKey(a).getTime() - sortKey(b).getTime())
}
