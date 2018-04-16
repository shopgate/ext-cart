const assert = require('assert')
const getCartNotes = require('../../../cart/getCartNotes')

describe('getCartNotes', () => {
  const context = {
    config: {
      legalText: 'legalText',
      legalInfo: 'legalInfo'
    }
  }
  it('Should get cart notes', (done) => {
    // noinspection JSCheckFunctionSignatures
    getCartNotes(context, {}, (err, res) => {
      assert.ifError(err)
      assert.equal(res.notes.legalText, context.config.legalText)
      assert.equal(res.notes.legalInfo, context.config.legalInfo)
      done()
    })
  })
})
