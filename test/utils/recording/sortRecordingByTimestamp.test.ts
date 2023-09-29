import { sortRecordingByTimestamp } from '../../../src/utils/recording/sortRecordingByTimestamp'
import assert from 'assert'

describe('sortRecordingByTimestamp', () => {
  it('sorts recording by timestamp', () => {
    assert.deepStrictEqual(
      sortRecordingByTimestamp({
        name: 'recording',
        messages: [
          { timestamp: 1000008 },
          { timestamp: 1000005 },
          { timestamp: 1000006 },
          { timestamp: 1000002 },
          { timestamp: 1000001 },
          { timestamp: 1000000 },
        ],
      }),
      {
        name: 'recording',
        messages: [
          { timestamp: 1000000 },
          { timestamp: 1000001 },
          { timestamp: 1000002 },
          { timestamp: 1000005 },
          { timestamp: 1000006 },
          { timestamp: 1000008 },
        ],
      }
    )
  })
})
