import { MessageCallback } from '../types'
import { sortRecordByDate } from '../utils/recording/sortRecordByDate'
import { getDelay } from '../utils/recording/getDelay'
import { sleep } from '../utils/sleep'
import axios from 'axios';

export async function streamRecording(
  recordingContent: string,
  callback: MessageCallback,
  print : boolean,
  http : boolean,
  url : boolean
): Promise<void> {
  let previousMessage: string | null = null
  for (const message of sortRecordByDate(recordingContent)) {
    const delay = previousMessage ? getDelay(previousMessage, message) : 0
    await sleep(delay)
      if(!print && !http && !url){
          print=true
      }

      if(print){
          callback(message)
      }
      if (http) {
          try {
              await axios.post('http://localhost:3001/recording/stream', { message });
              console.log('Message envoyé au serveur avec succès');
          } catch (error) {
              console.error('Erreur lors de l\'envoi du message via HTTP :', error);
          }
      }

      previousMessage = message;

    previousMessage = message

  }
}
