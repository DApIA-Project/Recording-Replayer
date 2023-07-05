import { MessageCallback, Recording } from '../types'
import { sortRecord } from '../utils/recording/sortRecord'
import { getDelay } from '../utils/recording/getDelay'
import { sleep } from '../utils/sleep'

export async function streamRecording(
  recording: Recording,
  callback: MessageCallback
): Promise<void> {
  let previousMessage: string | null = null
  for (const message of sortRecord(recording)) {
    const delay = previousMessage ? getDelay(previousMessage, message) : 0
    await sleep(delay)
    callback(message)
    previousMessage = message
  }
}
