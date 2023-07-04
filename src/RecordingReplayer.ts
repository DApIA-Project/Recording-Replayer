import {Recording} from "./types";

export function orderRecord(recording : Recording) : string[] {
    let contentInArray : string[] = recording.content.trim().split('\n')
    const cleTri = (ligne: string): Date => {

        const parts = ligne.split(',')
        if (ligne !== contentInArray[0]) {
            const date = new Date(`${parts[8]} ${parts[9]}`);
            return date;
        } else {
            const partsFirstLine = contentInArray[0].split(',')
            return new Date(`${partsFirstLine[8]} ${partsFirstLine[9]}`);
        }
    };

    const contentOrderedInArray : string[] = [...contentInArray].sort((a,b) => cleTri(a).getTime() - cleTri(b).getTime())

    return contentOrderedInArray
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

export async function printRecordingByTime(orderedRecord: string[]) {
    for (let j = 0; j < orderedRecord.length; j++) {
        const delay = j > 0 ? getDelay(orderedRecord[j-1], orderedRecord[j]) : 0;
        await sleep(delay);
        console.log(orderedRecord[j]);
    }
}

export function recordingReplayer(recordings : Recording[]) {
    for (const recording of recordings) {
        let orderedRecordInArray : string[] = orderRecord(recording)
        printRecordingByTime(orderedRecordInArray)
    }
}