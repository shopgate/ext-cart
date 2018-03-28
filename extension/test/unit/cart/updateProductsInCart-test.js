const assert = require('assert')
const updateProductsInCart = require('../../../cart/updateProductsInCart')

describe('updateProductsInCart', () => {
  const cart = [
    {
      id: 'qwerty123',
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

  it('Should update products in cart', (done) => {
    const updatedCart = [
      {
        id: 'qwerty123',
        quantity: 2
      }
    ]
    const input = {
      CartItem: [
        {
          CartItemId: 'qwerty123',
          quantity: 2
        }
      ]
    }
    context.storage.device.set = (key, newCartArg, cb) => {
      assert.equal(key, 'cart')
      assert.deepEqual(newCartArg, updatedCart)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    updateProductsInCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })

  it('Should remove products with zero quantity', (done) => {
    const updatedCart = []
    const input = {
      CartItem: [
        {
          CartItemId: 'qwerty123',
          quantity: 0
        }
      ]
    }
    context.storage.device.set = (key, newCart, cb) => {
      assert.equal(key, 'cart')
      assert.deepEqual(newCart, updatedCart)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    updateProductsInCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })
})
