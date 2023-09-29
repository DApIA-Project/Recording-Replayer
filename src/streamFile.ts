import { StreamCallback } from './types'
import { buildCsvJsonRecording } from './utils/buildCsvJsonRecording'
import { streamRecording } from './streamRecording'

export async function streamFile(
  callback: StreamCallback,
  file: string,
  speed: number
) {
  const recording = await buildCsvJsonRecording(file)
  await streamRecording(recording, callback, { speed })
}
