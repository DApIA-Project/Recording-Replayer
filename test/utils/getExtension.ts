import assert from 'assert'
import { getExtension } from '../../src/utils/getExtension'

describe('getExtension', () => {
  it('returns file extension', () => {
    assert.equal(getExtension('file.json'), 'json')
    assert.equal(getExtension('file.json.sbs'), 'sbs')
    assert.equal(getExtension('file..csv'), 'csv')
    assert.equal(getExtension('.gitignore'), 'gitignore')
  })

  it('lowers file extension cases', () => {
    assert.equal(getExtension('file.JSON'), 'json')
    assert.equal(getExtension('file.json.SbS'), 'sbs')
  })

  it('returns empty string if file does not have extension', () => {
    assert.equal(getExtension('file'), '')
  })
})
