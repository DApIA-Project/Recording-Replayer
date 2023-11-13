import assert from 'assert'
import { streamRecording } from '../../src'
import { sleep } from '../../src/utils/sleep'
import { SinonSpy } from 'sinon'
import { JsonMessage } from '@dapia-project/data-converter'
import sinon = require('sinon')

describe('streamRecording', () => {
  let spy: SinonSpy

  beforeEach(() => {
    spy = sinon.spy(async () => {})
  })

  it('delays callback', async () => {
    const recordingSize = 8
    const messages: JsonMessage[] = []

    for (let i = 0; i < recordingSize; i++) {
      messages.push({ timestamp: 1000000 + i , icao24 : '39ac45'})
    }

    streamRecording(
      {
        name: 'recording.csv',
        messages,
      },
      spy
    ).then()
    sinon.assert.notCalled(spy)

    await sleep(1)
    sinon.assert.calledOnce(spy)

    for (let i = 1; i < recordingSize; i++) {
      await sleep(1001)
      sinon.assert.callCount(spy, i + 1)
    }
  })

  it('applies speed options to delay', async () => {
    const recordingSize = 8
    const messages: JsonMessage[] = []

    for (let i = 0; i < recordingSize; i++) {
      messages.push({ timestamp: 1000000 + i , icao24 : '39ac45'})
    }

    streamRecording(
      {
        name: 'recording.csv',
        messages,
      },
      spy,
      { speed: 2 }
    ).then()
    sinon.assert.notCalled(spy)

    await sleep(1)
    sinon.assert.calledOnce(spy)

    for (let i = 1; i < recordingSize; i++) {
      await sleep(501)
      sinon.assert.callCount(spy, i + 1)
    }
  })

  it('calls callback with message', async () => {
    const messages = [
      { timestamp: 1000000 , icao24 : '39ac45'},
      { timestamp: 1000002 , icao24 : '39ac45'},
      { timestamp: 1000003 , icao24 : '39ac45'},
      { timestamp: 1000004 , icao24 : '39ac45'},
    ]
    await streamRecording(
      {
        name: 'recording.csv',
        messages: messages,
      },
      spy
    )
    assert.deepStrictEqual(
      spy.getCalls().map((call) => call.args),
      messages.map((message) => [[message]])
    )
  })
})
