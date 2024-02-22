import { Recording } from '../types'
import fs from 'fs'
import { openskyCsvToJson, sbsToOpenskyCsv } from '@dapia-project/data-converter/dist/src'
import { getExtension } from './getExtension'
import { getDataType } from "@dapia-project/data-converter/dist/src/utils/utils";
import { droneCsvToJson } from "@dapia-project/data-converter/dist/src/droneCsvToJson";
import { droneCsvToOpenskyCsv } from "@dapia-project/data-converter/dist/src/droneCsvToOpenskyCsv";

export async function buildCsvJsonRecording(file: string): Promise<Recording> {
  const buffer = await fs.promises.readFile(file)
  const recording: Recording = {
    name: file,
    messages: [],
  }
  switch (getExtension(file)) {
    case 'csv':
      if(getDataType(buffer.toString())==='drone'){
        recording.messages = openskyCsvToJson(droneCsvToOpenskyCsv(buffer.toString()))
      }else{
        recording.messages = openskyCsvToJson(buffer.toString())
      }

      break
    case 'sbs':
      recording.messages = openskyCsvToJson(sbsToOpenskyCsv(buffer.toString(),true))
      break
    default:
      throw new Error('File must be have .csv or .sbs extension')
  }
  return recording
}
