import { streamRecording } from "./recording-stream/streamRecording";
import fs from "fs";
import commandLineArgs from "command-line-args";

try {
  const options = commandLineArgs([
    { name: "file", type: String },
    { name: "print", alias: "p", type: Boolean },
    { name: "http", type: Boolean },
    { name: "url", type: String }
  ]);

  const { file } = options;

  if(!file) {
    console.error('`--file` arg is mandatory');
    process.exit(1);
  }

  fs.promises
    .readFile(file)
    .then(async (fileContent) => {
      await streamRecording(fileContent.toString(), console.log);
      process.exit(1);
    })
    .catch(() => console.error(`Unable to read file ${file}`));
} catch (e: any) {
  console.error(e.message);
  process.exit(1);
}
