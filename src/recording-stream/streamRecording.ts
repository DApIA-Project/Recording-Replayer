import {MessageCallback} from '../types'
import {sortRecordByDate, sortRecordByDateCSV} from '../utils/recording/sortRecordByDate'
import {getDelay} from '../utils/recording/getDelay'
import {sleep} from '../utils/sleep'

export async function streamRecording(
    recordingContent: string,
    callback: MessageCallback,
    speed: number | undefined
): Promise<void> {

    let previousMessage: string | null = null
    for (const message of sortRecordByDateCSV(recordingContent)) {
        const delay = previousMessage ? getDelay(previousMessage, message) : 0
        if (speed == undefined || speed <= 0) {
            await sleep(delay)
        } else {
            await sleep(delay / speed)
        }
        await callback(message)
        previousMessage = message
    }
}
