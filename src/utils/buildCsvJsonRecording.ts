import { Recording } from '../types'
import fs from 'fs'
import { csvToJson, sbsToCsv } from '@dapia-project/data-converter/dist/src'
import { getExtension } from './getExtension'

export async function buildCsvJsonRecording(file: string): Promise<Recording> {
  const buffer = await fs.promises.readFile(file)
  const recording: Recording = {
    name: file,
    messages: [],
  }
  switch (getExtension(file)) {
    case 'csv':
      recording.messages = csvToJson(buffer.toString())
      break
    case 'sbs':
      recording.messages = csvToJson(sbsToCsv(buffer.toString(),true))
      break
    default:
      throw new Error('File must be have .csv or .sbs extension')
  }
  return recording
}
