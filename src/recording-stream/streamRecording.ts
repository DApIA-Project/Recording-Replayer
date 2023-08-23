import {sortRecordByDate, sortRecordByDateCSV} from '../utils/recording/sortRecordByDate'
import {getDelay} from '../utils/recording/getDelay'
import {sleep} from '../utils/sleep'
import { AxiosCallback, ConsoleCallback } from "../types";


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
    speed: number | undefined
): Promise<void> {

    let previousMessage: string | null = null

    if(file.endsWith(".csv")){
      for (const message of sortRecordByDateCSV(recordingContent)) {
        previousMessage = await doCallback(previousMessage,message,speed,callback)
      }
    }else{
      for (const message of sortRecordByDate(recordingContent)) {
        previousMessage = await doCallback(previousMessage,message,speed,callback)
      }
    }



}
