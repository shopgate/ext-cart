const assert = require('assert')
const getCartTotals = require('../../../cart/getCartTotals')

describe('getCartTotals', () => {
  const context = {
    config: {
      currency: 'EUR'
    }
  }
  const input = {
    cartItems: [
      {
        id: 1,
        productId: 'SG1',
        quantity: 1,
        type: 'product',
        price: {
          default: 100
        }
      }
    ]
  }
  it('Should get cart totals', (done) => {
    // noinspection JSCheckFunctionSignatures
    getCartTotals(context, input, (err, res) => {
      assert.ifError(err)
      assert.equal(res.currency, 'EUR')
      assert.equal(res.totals.total, 100)
      assert.equal(res.totals.grandTotal, 100)
      done()
    })
  })
})
