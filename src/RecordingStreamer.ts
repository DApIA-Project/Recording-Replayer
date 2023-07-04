
import {Recording} from "./types";

export function orderRecord(recording: Recording): string[] {
    let contentInArray: string[] = recording.content.trim().split('\n')
    const cleTri = (ligne: string): Date => {

        const parts = ligne.split(',')
        if (ligne !== contentInArray[0]) {
            return new Date(`${parts[8]} ${parts[9]}`);
        } else {
            const partsFirstLine = contentInArray[0].split(',')
            return new Date(`${partsFirstLine[8]} ${partsFirstLine[9]}`);
        }
    };

    return [...contentInArray].sort((a, b) => cleTri(a).getTime() - cleTri(b).getTime())
}

function getDelay(previousLine: string, currentLine: string) {
    const previousTime = getTimeFromLine(previousLine);
    const currentTime = getTimeFromLine(currentLine);
    return currentTime - previousTime;
}

function getTimeFromLine(line: string) {
    const parts = line.split(',');
    const date = new Date(`${parts[8]} ${parts[9]}`);
    return date.getTime();
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callbackRecordingByTime(recording: Recording, callback: (message: string) => void) {
    let previousMessage: string | null = null
    for (const message of orderRecord(recording)) {
        const delay = previousMessage ? getDelay(previousMessage, message) : 0;
        await sleep(delay);
        callback(message);
        previousMessage = message
    }
}

export async function streamRecording(recordings: Recording[]) {
    for (const recording of recordings) {
        await callbackRecordingByTime(recording, console.log)
    }
}
