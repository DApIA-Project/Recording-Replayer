import {Recording} from "../../types";

export function sortRecord(recording: Recording): string[] {
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
