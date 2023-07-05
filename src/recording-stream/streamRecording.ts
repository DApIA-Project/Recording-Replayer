import { MessageCallback, Recording } from '../types'
import { sortRecordByDate } from '../utils/recording/sortRecordByDate'
import { getDelay } from '../utils/recording/getDelay'
import { sleep } from '../utils/sleep'

export async function streamRecording(
  recordingContent: string,
  callback: MessageCallback
): Promise<void> {
  let previousMessage: string | null = null
  for (const message of sortRecordByDate(recordingContent)) {
    const delay = previousMessage ? getDelay(previousMessage, message) : 0
    await sleep(delay)
    callback(message)
    previousMessage = message
  }
}
