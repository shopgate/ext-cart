const assert = require('assert')
const getEventData = require('../../../event/getEventData')

describe('getEventData', () => {
  it('Return total of cart', (done) => {
    const input = {
      totals: [
        {
          amount: 23.99,
          type: 'grandTotal'
        }
      ]
    }

    getEventData({}, input, (err, result) => {
      assert.ifError(err)
      assert.equal(result.eventData.amount, 2399)
      done()
    })
  })

  it('Return zero when grand total not found', (done) => {
    // noinspection JSCheckFunctionSignatures
    getEventData({}, {}, (err, result) => {
      assert.ifError(err)
      assert.equal(result.eventData.amount, 0)
      done()
    })
  })
})
