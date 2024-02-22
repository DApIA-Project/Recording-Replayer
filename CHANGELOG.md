# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased](https://github.com/DApIA-Project/Recording-Streamer/compare/v2.2.0...main)

### Info

### Added

### Changed

### Deprecated

### Removed

### Fixed

## [v2.4.0](https://github.com/DApIA-Project/Recording-Streamer/compare/v2.3.1...v2.4.0)

### Added

- You can now transmit a .csv file with the drone header presented in the Data-Converter README here:
  https://github.com/DApIA-Project/Data-Converter/blob/main/README.md

### Fixed

- Modify version of  library Data-Converter and modify method names.

## [v2.3.1](https://github.com/DApIA-Project/Recording-Streamer/compare/v2.3.0...v2.3.1)

### Fixed

- Modify version of  library Data-Converter

## [v2.3.0](https://github.com/DApIA-Project/Recording-Streamer/compare/v2.2.1...v2.3.0)

### Added

- Added function `groupMessagesByIcaoAndTimestamp` grouping messages according to their timestamp and icao.

### Changed

- Changed the way messages are sent. We go from sending a message to sending a message board.


## [v2.2.1](https://github.com/DApIA-Project/Recording-Streamer/compare/v2.2.0...v2.2.1)

### Changed

- Change elements that we received : from `prediction, error` to `message, prediction, error and truth`

## [v2.2.0](https://github.com/DApIA-Project/Recording-Streamer/compare/v2.1.1...v2.2.0)

### Added

- Add recordings examples in `./examples`
- Use now `@dapia-project/data-converter` version `3.0.0`

## [v2.1.1](https://github.com/DApIA-Project/Recording-Streamer/compare/v2.1.0...v2.1.1)

### Changed

- Dependencies to DataConverter version

## [v2.1.0](https://github.com/DApIA-Project/Recording-Streamer/compare/v2.0.0...v2.1.0)

### Changed

- When the URL parameter is used, a conversion to JSON is performed.

## [v2.0.0](https://github.com/DApIA-Project/Recording-Streamer/compare/v1.3.0...v2.0.0)

### Changed

- Command line without options does a print
- `streamRecording` header

### Removed

- `-p` or `--print` option

## [v1.3.0](https://github.com/DApIA-Project/Recording-Streamer/compare/v1.2.0...v1.3.0)

### Added

- Ability to change the speed of sending messages with the `--speed` option

## [v1.2.0](https://github.com/DApIA-Project/Recording-Streamer/compare/v1.1.0...v1.2.0)

### Added

- Ability to send messages to an URL with the `--url` option

### Removed

- `--http` option

## [v1.1.0](https://github.com/DApIA-Project/Recording-Streamer/compare/v1.0.0...v1.1.0)

### Added

- Command line `recording-streamer`

## [v1.0.0](https://github.com/DApIA-Project/Recording-Streamer/compare/old...new)

### Info

- First version
- Send a stream of messages by time
- Sort a recording of messages by time

### Added

- Script `sortRecordByDate`
- Script `streamRecording`
