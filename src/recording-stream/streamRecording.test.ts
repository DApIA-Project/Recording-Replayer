import {describe} from "mocha";
import {Recording} from "../types";
import sinon from "sinon";
import {streamRecording} from "./streamRecording";
import {sleep} from "../utils/sleep";
import assert from "assert";

describe('streamRecording', () => {
    it('calls callback in delay', async () => {
        const recordingSize = 8
        const delayBetweenMessages = 100
        let content = ''

        for (let i = 0; i < recordingSize; i++) {
            content += `MSG,3,3,5022202,3b7b96,5022202,2022/07/02,12:47:23.000,2022/07/02,12:47:23.${i * delayBetweenMessages},DRAG66,1850.0,120.0,311.2759,43.4091,1.72415,128.0,,,,,\n`
        }

        const recordTest: Recording = {
            name: 'test',
            content
        }

        const spy = sinon.spy(() => null)
        streamRecording(recordTest, spy).then()
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
            content.push(`MSG,3,3,5022202,3b7b96,5022202,2022/07/02,12:47:23.000,2022/07/02,12:47:23.${i * delayBetweenMessages},DRAG66,1850.0,120.0,311.2759,43.4091,1.72415,128.0,,,,,`)
        }

        const recordTest: Recording = {
            name: 'test',
            content: content.join('\n')
        }

        const spy = sinon.spy(() => null)
        await streamRecording(recordTest, spy)
        assert.deepStrictEqual(
            spy.getCalls().map((call) => call.args),
            content.map(message => [message])
        )
    })
})
