![Recording Streamer Tests workflow](https://github.com/DApIA-Project/Recording-Streamer/actions/workflows/node-tests.yml/badge.svg)

# Recording-Streamer

Allows you to sort the messages of a recording according to time as well as to send a message stream according to time

## Setup

### Via NPM

It is necessary to install this library globally to use it.

```console
npm i -g @dapia-project/recording-streamer
```

### By updating package.json

In your `package.json`, add the following:

```json
{
  "dependencies": {
    "@dapia-project/recording-streamer": "^2.0.0"
  }
}
```

## Initialization

```shell
recording-streamer --file "path/to/myfile.sbs" [--options]
```

## Options

| option        | type    | mandatory | example                     |
| ------------- | ------- | --------- | --------------------------- |
| --file        | string  | yes       | --file "path/to/myfile.sbs" |
| --url         | string  | no        | --url "URL"                 |
| --speed       | number  | no        | --speed 2                   |

By default, the option print is enabled if no other is enabled. It is used to display in the console each message of the record.


### --file "file"

This option, which must be present, allows you to specify the file (record) to read.

### --url "URL"

This option contains a string which must be a URL.

### --speed NUMBER

This option contains a number, which is a record playback speed multiplier. Example: --speed 2 reads the record twice as fast.
