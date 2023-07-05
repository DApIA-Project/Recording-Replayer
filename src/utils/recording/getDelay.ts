import {getTimeFromLine} from "./getTimeFromLine";

export function getDelay(previousLine: string, currentLine: string) {
    const previousTime = getTimeFromLine(previousLine);
    const currentTime = getTimeFromLine(currentLine);
    return currentTime - previousTime;
}
