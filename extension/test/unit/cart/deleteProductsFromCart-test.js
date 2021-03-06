const assert = require('assert')
const deleteProductsFromCart = require('../../../cart/deleteProductsFromCart')
const {PRODUCT, COUPON} = require('../../../common/consts')

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
  const cartStorageName = 'device'

  it('Should remove product from cart', (done) => {
    const input = {
      cartItemIds: ['qwerty123'],
      cartStorageName
    }
    const expectedCart = [
      cart[1] // coupon
    ]
    context.storage[cartStorageName].set = (key, newCartArg, cb) => {
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
