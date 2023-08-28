#!/usr/bin/env node
import {streamRecording} from './recording-stream/streamRecording'
import fs from 'fs'
import commandLineArgs from 'command-line-args'
import axios from "axios";
import { AxiosCallback, ConsoleCallback } from "./types";

async function doStreamRecording(callback : AxiosCallback | ConsoleCallback, file : string, speed : number, url : string){
    fs.promises
      .readFile(file)
      .then(async (fileContent) => {
          await streamRecording(
            file,
            fileContent.toString(),
            callback,
            speed,
            url
          )

          process.exit(1)
      })
      .catch(() => console.error(`Unable to read file ${file}`))
}



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

    if(url){
        let callback: AxiosCallback = message => axios.post(url, {message})
        doStreamRecording(callback,file,speed,url)
    }else{
        let callback: ConsoleCallback = async message => {console.log(message)}
        doStreamRecording(callback,file,speed,url)
    }


} catch (e: any) {
    console.error(e.message)
    process.exit(1)
}
