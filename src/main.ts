#!/usr/bin/env node
import {streamRecording} from './recording-stream/streamRecording'
import fs from 'fs'
import commandLineArgs from 'command-line-args'
import axios from "axios";
import {MessageCallback} from "./types";

try {
    const options = commandLineArgs([
        {name: 'file', type: String},
        {name: 'url', type: String},
        {name: 'speed', type: Number},
    ])

    const {file, url, speed} = options

    if (!file) {
        console.error('`--file` arg is mandatory')
        process.exit(1)
    }

    let callback: MessageCallback = url
        ? message => axios.post(url, {message})
        : async message => {console.log(message)}

    fs.promises
        .readFile(file)
        .then(async (fileContent) => {
            await streamRecording(
                fileContent.toString(),
                callback,
                speed
            )

            process.exit(1)
        })
        .catch(() => console.error(`Unable to read file ${file}`))
} catch (e: any) {
    console.error(e.message)
    process.exit(1)
}
