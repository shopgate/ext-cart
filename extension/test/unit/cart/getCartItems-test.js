const assert = require('assert')
const getCartItems = require('../../../cart/getCartItems')
const {PRODUCT, COUPON} = require('../../../common/consts')

describe('getCartItems', () => {
  const cart = [
    {
      id: 'qwerty123',
      productId: 'QWERTY123',
      quantity: 1,
      type: PRODUCT
    },
    {
      id: '10off',
      productId: '10off',
      code: '10off',
      type: COUPON,
      quantity: 1
    }
  ]
  const context = {
    storage: {
      device: {
        get: (key, cb) => {
          assert.equal(key, 'cart')
          cb(null, cart)
        }
      }
    }
  }
  it('Should get cart items', (done) => {
    // noinspection JSCheckFunctionSignatures
    getCartItems(context, {}, (err, result) => {
      assert.ifError(err)
      assert.deepEqual(result.cartItems, cart)
      done()
    })
  })
})
