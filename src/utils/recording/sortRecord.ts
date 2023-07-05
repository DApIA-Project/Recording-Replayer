import { Recording } from '../../types'

export function sortRecord(recordingContent: string): string[] {
  let contentInArray: string[] = recordingContent.trim().split('\n')
  const sortKey = (line: string): Date => {
    const parts = line.split(',')
    if (line !== contentInArray[0]) {
      return new Date(`${parts[8]} ${parts[9]}`)
    } else {
      const partsFirstLine = contentInArray[0].split(',')
      return new Date(`${partsFirstLine[8]} ${partsFirstLine[9]}`)
    }
  }

  return [...contentInArray].sort(
    (a, b) => sortKey(a).getTime() - sortKey(b).getTime()
  )
}
