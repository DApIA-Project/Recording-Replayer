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
    "@dapia-project/recording-streamer" : "^1.2.0"
  }
}
```

## Initialization

```shell
recording-streamer --file "path/to/myfile.sbs" [--options]
```
## Options

| option        | type    | mandatory | example                 |
|---------------|---------|-----------|-------------------------|
| --file        | string  | yes       | --file "path/to/myfile.sbs" |
| --print or -p | boolean | default   | --print                 |
| --url         | string  | no        | --url "URL"             |



