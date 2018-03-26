const assert = require('assert')
const getCartFlags = require('../../../cart/getCartFlags')

describe('getCartFlags', () => {
  const context = {
    config: {
      hasCoupons: false,
    }
  }
  it('Should get cart flags', (done) => {
    // noinspection JSCheckFunctionSignatures
    getCartFlags(context, {}, (err, res) => {
      assert.ifError(err)
      assert.equal(res.isOrderable, true)
      assert.equal(res.isTaxIncluded, false)
      assert.equal(res.flags.orderable, true)
      assert.equal(res.flags.taxIncluded, false)
      assert.equal(res.flags.coupons, context.config.hasCoupons)
      done()
    })
  })
})
