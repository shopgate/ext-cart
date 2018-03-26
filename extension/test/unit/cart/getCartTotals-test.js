const assert = require('assert')
const getCartTotals = require('../../../cart/getCartTotals')

describe('getCartTotals', () => {
  const input = {
    cartItems: [
      {
        id: 1,
        productId: 'SG1',
        quantity: 1,
        type: 'product',
        price: 0
      }
    ]
  }
  it('Should get cart notes', (done) => {
    // noinspection JSCheckFunctionSignatures
    getCartTotals({}, input, (err, res) => {
      assert.ifError(err)
      assert.equal(res.totals.grandTotal, 0)
      done()
    })
  })
})
