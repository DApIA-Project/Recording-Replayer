import { getDelay } from './utils/getDelay'
import { sleep } from './utils/sleep'
import { AxiosCallback, ConsoleCallback, Recording } from './types'
import { JsonMessage } from '@dapia-project/data-converter'
import { sortRecordingByTimestamp } from './utils/sortRecordingByTimestamp'
import { groupMessagesByIcaoAndTimestamp } from "./utils/groupMessagesByIcaoAndTimestamp";

type StreamRecordingOptions = {
  speed?: number
}

export async function streamRecording(
  recording: Recording,
  callback: AxiosCallback | ConsoleCallback,
  options: StreamRecordingOptions = {}
): Promise<void> {
  const { speed = 1 } = options
  if (speed <= 0) throw new Error('Speed cannot be negative or null')

  let previousMessage: JsonMessage | null = null
  let allMessages = sortRecordingByTimestamp(recording).messages
  let allMessageGrouped = groupMessagesByIcaoAndTimestamp(allMessages)

  for (const messageGrouped of allMessageGrouped) {
    const delay = previousMessage ? getDelay(previousMessage, messageGrouped[0]) : 0
    await sleep(delay / speed)
    const result = await callback(messageGrouped)

    if (result !== undefined) {
     const {message, prediction, error, truth } = result.data
      if (error) console.log(error)
      else if (prediction == truth) console.log("The flight is legit, it\'s a "+prediction)
      else console.log("ALERT ! The flight pretend to be "+truth+" but is a "+prediction + " : "+ message)



    }
    previousMessage = messageGrouped[0]
  }
}
