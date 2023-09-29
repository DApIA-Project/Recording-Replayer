#!/usr/bin/env node
import { streamRecording } from './recording-stream/streamRecording'
import fs from 'fs'
import commandLineArgs from 'command-line-args'
import axios from 'axios'
import { ApiResponse, Recording, StreamCallback } from './types'
import { csvToJson, sbsToCsv } from '@dapia-project/data-converter/dist/src'

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

async function buildCsvJsonRecording(file: string): Promise<Recording> {
  const buffer = await fs.promises.readFile(file)
  const extension = file.split('.')[-1]
  const recording: Recording = {
    name: file,
    messages: [],
  }
  switch (extension) {
    case 'csv':
      recording.messages = csvToJson(buffer.toString())
      break
    case 'sbs':
      recording.messages = csvToJson(sbsToCsv(buffer.toString()))
      break
    default:
      throw new Error('File must be have .csv or .sbs extension')
  }
  return recording
}
