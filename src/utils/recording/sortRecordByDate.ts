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

export function sortRecordByDateCSV(recordingContent: string): string[] {
  const sortKey = (line: string): number => {
    const parts = line.split(',')
    return parseInt(parts[0])
  }

  const messages = recordingContent
    .trim()
    .split('\n')
    .filter((message) => !isNaN(sortKey(message)))
  return messages.sort((a, b) => sortKey(a) - sortKey(b))
}
