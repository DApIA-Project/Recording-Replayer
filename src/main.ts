import { streamRecording } from './recording-stream/streamRecording'
import fs from 'fs'

if (process.argv.length < 3) {
  console.error('Usage: cmd <fileName>')
} else {
  const fileName = process.argv[2]
  fs.promises
    .readFile(fileName)
    .then((fileContent) => streamRecording(fileContent.toString(), console.log))
    .catch(() => console.error(`Unable to read file ${fileName}`))
}
