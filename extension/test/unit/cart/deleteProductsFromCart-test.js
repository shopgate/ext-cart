const assert = require('assert')
const deleteProductsFromCart = require('../../../cart/deleteProductsFromCart')
const {PRODUCT, COUPON} = require('../../../cart/consts')

describe('deleteProductsFromCart', () => {
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
      quantity: 1,
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

  it('Should remove product from cart', (done) => {
    const input = {
      CartItemIds: ['qwerty123']
    }
    const expectedCart = [
      cart[1] // coupon
    ]
    context.storage.device.set = (key, newCartArg, cb) => {
      assert.equal(key, 'cart')
      assert.deepEqual(newCartArg, expectedCart)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    deleteProductsFromCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })
})
