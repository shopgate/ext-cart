const assert = require('assert')
const deleteCouponsFromCart = require('../../../cart/deleteCouponsFromCart')
const {PRODUCT, COUPON} = require('../../../cart/consts')
const couponCodes = require('../../../cart/couponCodes')

describe('deleteCouponsFromCart', () => {
  const coupon = couponCodes[0]
  const cart = [
    {
      id: 'qwerty123',
      productId: 'QWERTY123',
      quantity: 1,
      type: PRODUCT
    },
    {
      code: coupon.code,
      type: COUPON,
      productId: coupon.code,
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
  it('Should remove coupon from cart', (done) => {
    const input = {
      couponCodes: [coupon.code]
    }
    const expectedCart = [
      {
        id: 'qwerty123',
        productId: 'QWERTY123',
        quantity: 1,
        type: PRODUCT
      }
    ]
    context.storage.device.set = (key, newCartArg, cb) => {
      assert.equal(key, 'cart')
      assert.deepEqual(newCartArg, expectedCart)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    deleteCouponsFromCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })
})
