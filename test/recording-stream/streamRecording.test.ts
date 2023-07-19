import assert from 'assert'
import {streamRecording} from '../../src'
import {sleep} from '../../src/utils/sleep'
import {SinonSpy} from "sinon";
import sinon = require('sinon');

describe('streamRecording', () => {
    let spy: SinonSpy
    beforeEach(() => {
        spy = sinon.spy(async () => {
        });
    })

    it('calls callback in delay', async () => {
        const recordingSize = 8
        const delayBetweenMessages = 100
        let content = ''

        for (let i = 0; i < recordingSize; i++) {
            content += `MSG,3,3,5022202,3b7b96,5022202,2022/07/02,12:47:23.000,2022/07/02,12:47:23.${
                i * delayBetweenMessages
            },DRAG66,1850.0,120.0,311.2759,43.4091,1.72415,128.0,,,,,\n`
        }

        const recordTest = content

        streamRecording(recordTest, spy, null).then()
        sinon.assert.notCalled(spy)

        await sleep(1)
        sinon.assert.calledOnce(spy)

        for (let i = 1; i < recordingSize; i++) {
            await sleep(delayBetweenMessages)
            sinon.assert.callCount(spy, i + 1)
        }
    })

    it('calls callback with message', async () => {
        const recordingSize = 8
        const delayBetweenMessages = 100
        let content: string[] = []

        for (let i = 0; i < recordingSize; i++) {
            content.push(
                `MSG,3,3,5022202,3b7b96,5022202,2022/07/02,12:47:23.000,2022/07/02,12:47:23.${
                    i * delayBetweenMessages
                },DRAG66,1850.0,120.0,311.2759,43.4091,1.72415,128.0,,,,,`
            )
        }

        const recordTest = content.join('\n')

        await streamRecording(recordTest, spy, null)
        assert.deepStrictEqual(
            spy.getCalls().map((call) => call.args),
            content.map((message) => [message])
        )
    })
})
