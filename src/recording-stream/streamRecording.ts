import { getDelay } from '../utils/recording/getDelay'
import { sleep } from '../utils/sleep'
import { AxiosCallback, ConsoleCallback, Recording } from '../types'
import { JsonMessage } from '@dapia-project/data-converter'

type StreamRecordingOptions = {
  speed?: number
}

export async function streamRecording(
  recording: Recording,
  callback: AxiosCallback | ConsoleCallback,
  { speed = 1 }: StreamRecordingOptions
): Promise<void> {
  if (speed <= 0) throw new Error('Speed cannot be negative or null')

  let previousMessage: JsonMessage | null = null
  for (const message of recording.messages) {
    const delay = previousMessage ? getDelay(previousMessage, message) : 0
    await sleep(delay / speed)
    const result = await callback(message)
    if (result?.data !== undefined) {
      const { prediction, error } = result?.data
      if (error) console.log(error)
      else if (prediction) console.log(prediction)
    }
    previousMessage = message
  }
}
