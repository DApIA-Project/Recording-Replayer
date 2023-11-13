import assert from "assert";
import { sortRecordingByTimestamp } from "../../src/utils/sortRecordingByTimestamp";
import { groupMessagesByIcaoAndTimestamp } from "../../src/utils/groupMessagesByIcaoAndTimestamp";

describe('groupMessagesByIcaoAndTimestamp', () => {
  it('group many messages', () => {

    let messagesSorted = sortRecordingByTimestamp({
      name: 'recording',
      messages: [
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac49' },
        { timestamp: 1000002, icao24: '39ac45' },
        { timestamp: 1000001, icao24: '39ac49' },
        { timestamp: 1000000, icao24: '39ac46' },
      ],
    }).messages

    assert.deepStrictEqual(
      groupMessagesByIcaoAndTimestamp(messagesSorted),
      [
          [{ timestamp: 1000000, icao24: '39ac46' }],
          [{ timestamp: 1000001, icao24: '39ac49' }],
          [{ timestamp: 1000002, icao24: '39ac45' }],
          [{ timestamp: 1000008, icao24: '39ac49' }],
          [{ timestamp: 1000008, icao24: '39ac45' }, { timestamp: 1000008, icao24: '39ac45' }],
        ]
    )
  })

  it('group one message', () => {

    let messagesSorted = sortRecordingByTimestamp({
      name: 'recording',
      messages: [
        { timestamp: 1000008, icao24: '39ac45' },
      ],
    }).messages

    assert.deepStrictEqual(
      groupMessagesByIcaoAndTimestamp(messagesSorted),
      [
        [{ timestamp: 1000008, icao24: '39ac45' }],
      ]
    )
  })

  it('group all messages', () => {

    let messagesSorted = sortRecordingByTimestamp({
      name: 'recording',
      messages: [
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac45' },
      ],
    }).messages

    assert.deepStrictEqual(
      groupMessagesByIcaoAndTimestamp(messagesSorted),
      [
        [{ timestamp: 1000008, icao24: '39ac45' }, { timestamp: 1000008, icao24: '39ac45' }, { timestamp: 1000008, icao24: '39ac45' }, { timestamp: 1000008, icao24: '39ac45' }, { timestamp: 1000008, icao24: '39ac45' }, { timestamp: 1000008, icao24: '39ac45' }],
      ]
    )
  })

  it('message with no icao', () => {

    let messagesSorted = sortRecordingByTimestamp({
      name: 'recording',
      messages: [
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac49' },
        { timestamp: 1000002 },
        { timestamp: 1000001, icao24: '39ac49' },
        { timestamp: 1000000, icao24: '39ac46' },
      ],
    }).messages

    assert.deepStrictEqual(
      groupMessagesByIcaoAndTimestamp(messagesSorted),
      [
        [{ timestamp: 1000000, icao24: '39ac46' }],
        [{ timestamp: 1000001, icao24: '39ac49' }],
        [{ timestamp: 1000008, icao24: '39ac49' }],
        [{ timestamp: 1000008, icao24: '39ac45' }, { timestamp: 1000008, icao24: '39ac45' }],
      ]
    )
  })

  it('message with no timestamp', () => {

    let messagesSorted = sortRecordingByTimestamp({
      name: 'recording',
      messages: [
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac45' },
        { timestamp: 1000008, icao24: '39ac49' },
        { icao24: '39ac45' },
        { timestamp: 1000001, icao24: '39ac49' },
        { timestamp: 1000000, icao24: '39ac46' },
      ],
    }).messages

    assert.deepStrictEqual(
      groupMessagesByIcaoAndTimestamp(messagesSorted),
      [
        [{ timestamp: 1000000, icao24: '39ac46' }],
        [{ timestamp: 1000001, icao24: '39ac49' }],
        [{ timestamp: 1000008, icao24: '39ac49' }],
        [{ timestamp: 1000008, icao24: '39ac45' }, { timestamp: 1000008, icao24: '39ac45' }],
      ]
    )
  })
})
