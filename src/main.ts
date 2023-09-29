#!/usr/bin/env node
import { streamRecording } from './recording-stream/streamRecording'
import commandLineArgs from 'command-line-args'
import axios from 'axios'
import { ApiResponse, StreamCallback } from './types'
import { buildCsvJsonRecording } from './utils/buildCsvJsonRecording'

async function streamRecordingWrapper(
  callback: StreamCallback,
  file: string,
  speed: number
) {
  const recording = await buildCsvJsonRecording(file)
  await streamRecording(recording, callback, { speed })
}

try {
  const { file, url, speed } = commandLineArgs([
    { name: 'file', type: String },
    { name: 'url', type: String },
    { name: 'speed', type: Number },
  ])

  if (!file) {
    console.error('`--file` arg is mandatory')
    process.exit(1)
  }

  let callback: StreamCallback
  if (url) {
    callback = async (message): Promise<ApiResponse> => {
      try {
        return await axios.post(url, { message })
      } catch (e) {
        return {
          data: {
            message,
            error: 'error_from_server',
          },
        }
      }
    }
  } else {
    callback = async (message) => console.log(message)
  }

  if (callback) streamRecordingWrapper(callback, file, speed).then()
} catch (e: any) {
  console.error(e.message)
  process.exit(1)
}
