import {sortRecordByDate, sortRecordByDateCSV} from '../utils/recording/sortRecordByDate'
import {getDelay} from '../utils/recording/getDelay'
import {sleep} from '../utils/sleep'
import { AxiosCallback, ConsoleCallback } from "../types";
import { convertCSVtoJSON } from "@dapia-project/data-converter/dist/src/CsvToJson";
import { convertSBStoJSON } from "@dapia-project/data-converter/dist/src/SbsToJson";
import { convertJSONtoCSV } from "@dapia-project/data-converter/dist/src/JsonToCsv";


async function doCallback(previousMessage : string | null, message : string, speed : number | undefined, callback : AxiosCallback | ConsoleCallback){
  const delay = previousMessage ? getDelay(previousMessage, message) : 0
  if (speed == undefined || speed <= 0) {
    await sleep(delay)
  } else {
    await sleep(delay / speed)
  }
  let resp = await callback(message)
  if(resp != undefined){
    console.log(resp.data.prediction)
  }

  return message
}

export async function streamRecording(
    file : string,
    recordingContent: string,
    callback: AxiosCallback | ConsoleCallback,
    speed: number | undefined,
    url : string | undefined
): Promise<void> {

    let previousMessage: string | null = null

    if(file.endsWith(".csv")){
      const lines = recordingContent.split("\n");
      const header = lines[0] + '\n'

      for (let message of sortRecordByDateCSV(recordingContent)) {
        if(url){
          message = header + message
          message = convertCSVtoJSON(message)
        }
        previousMessage = await doCallback(previousMessage,message,speed,callback)
      }
    }else{
      for (let message of sortRecordByDate(recordingContent)) {
        if(url){
          message = convertSBStoJSON(message)
          message = convertJSONtoCSV(message)
          message = convertCSVtoJSON(message)
        }
        previousMessage = await doCallback(previousMessage,message,speed,callback)
      }
    }



}
