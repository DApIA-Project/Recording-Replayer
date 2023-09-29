import { JsonMessage } from '@dapia-project/data-converter'

export function getDelay(
  previousMessage: JsonMessage,
  currentMessage: JsonMessage
) {
  if (
    previousMessage.timestamp === undefined ||
    currentMessage.timestamp === undefined
  )
    return 0
  return (
    (currentMessage.timestamp as number) - (previousMessage.timestamp as number)
  )
}
