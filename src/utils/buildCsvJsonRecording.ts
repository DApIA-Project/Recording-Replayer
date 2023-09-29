import { Recording } from '../types'
import fs from 'fs'
import { csvToJson, sbsToCsv } from '@dapia-project/data-converter/dist/src'

export async function buildCsvJsonRecording(file: string): Promise<Recording> {
  const buffer = await fs.promises.readFile(file)
  const extension = file.split('.').slice(-1)[0]
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
