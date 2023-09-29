#!/usr/bin/env node
import commandLineArgs from 'command-line-args'
import axios from 'axios'
import { ApiResponse, StreamCallback } from './types'
import { streamFile } from './streamFile'

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

  if (callback) streamFile(callback, file, speed).then()
} catch (e: any) {
  console.error(e.message)
  process.exit(1)
}
