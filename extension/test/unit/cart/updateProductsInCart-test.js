const assert = require('assert')
const updateProductsInCart = require('../../../cart/updateProductsInCart')

describe('updateProductsInCart', () => {
  const cart = [
    {
      id: 'qwerty123',
      quantity: 1,
      product: {
        price: {
          unit: 200,
          default: 200,
          special: null
        }
      }
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

  it('Should update products in cart', (done) => {
    const updatedCart = [
      {
        id: 'qwerty123',
        quantity: 2,
        product: {
          price: {
            unit: 200,
            default: 400,
            special: null
          }
        }
      }
    ]
    const input = {
      updateItems: [
        {
          CartItemId: 'qwerty123',
          quantity: 2
        }
      ],
      cartStorageName
    }
    context.storage[cartStorageName].set = (key, newCartArg, cb) => {
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
      updateItems: [
        {
          CartItemId: 'qwerty123',
          quantity: 0
        }
      ],
      cartStorageName
    }
    context.storage[cartStorageName].set = (key, newCart, cb) => {
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
