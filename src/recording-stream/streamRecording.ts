import { MessageCallback } from '../types'
import { sortRecordByDate } from '../utils/recording/sortRecordByDate'
import { getDelay } from '../utils/recording/getDelay'
import { sleep } from '../utils/sleep'
import axios from 'axios';

export async function streamRecording(
  recordingContent: string,
  callback: MessageCallback,
  print : boolean,
  url : string | null,
  speed : number | null
): Promise<void> {
  let previousMessage: string | null = null
  for (const message of sortRecordByDate(recordingContent)) {
    const delay = previousMessage ? getDelay(previousMessage, message) : 0
      if(speed == null || speed<=0){
          await sleep(delay)
      }else{
          await sleep(delay/speed)
      }

      if(!print && (url == null)){
          print=true
      }

      if(print){
          callback(message)
      }
      if (url != null) {
          try {
              await axios.post(url, { message });
              console.log('Message envoyé au serveur avec succès');
          } catch (error) {
              console.error('Erreur lors de l\'envoi du message via HTTP :', error);
          }
      }

      previousMessage = message;

    previousMessage = message

  }
}
