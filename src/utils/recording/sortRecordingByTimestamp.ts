import { Recording } from '../../types'

export function sortRecordingByTimestamp(recording: Recording): Recording {
  const messages = [...recording.messages]
  messages.sort(
    (a, b) => ((a.timestamp as number) || 0) - ((b.timestamp as number) || 0)
  )
  return { ...recording, messages }
}
