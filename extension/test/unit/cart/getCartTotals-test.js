const assert = require('assert')
const getCartTotals = require('../../../cart/getCartTotals')
const {PRODUCT, COUPON, COUPON_FIXED, COUPON_PERCENT} = require('../../../common/consts')

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
        quantity: 1,
        type: PRODUCT,
        product: {
          price: {
            default: 100
          }
        }
      },
      {
        id: '10off',
        type: COUPON,
        quantity: 1,
        coupon: {
          code: '10off',
          savedPrice: {
            type: COUPON_FIXED,
            value: 10
          }
        }
      },
      {
        id: '10percent',
        type: COUPON,
        quantity: 1,
        coupon: {
          code: '10percent',
          savedPrice: {
            type: COUPON_PERCENT,
            value: 10
          }
        }
      }
    ]
  }
  it('Should get cart totals', (done) => {
    // noinspection JSCheckFunctionSignatures
    getCartTotals(context, input, (err, res) => {
      assert.ifError(err)
      assert.equal(res.currency, 'EUR')
      assert.equal(res.totals[0].type, 'subTotal')
      assert.equal(res.totals[0].amount, 100)
      assert.equal(res.totals[1].type, 'discounts')
      assert.equal(res.totals[1].amount, -19)
      assert.equal(res.totals[2].type, 'grandTotal')
      assert.equal(res.totals[2].amount, 81)
      done()
    })
  })
})
