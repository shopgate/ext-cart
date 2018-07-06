const assert = require('assert')
const updateProductsInCart = require('../../../cart/updateProductsInCart')
const { PRODUCT } = require('../../../common/consts')

describe('updateProductsInCart', () => {
  const cart = [
    {
      id: 'qwerty123',
      quantity: 1,
      type: PRODUCT,
      product: {
        id: 'SG1',
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
    const expectedUpdatedCart = [
      {
        id: 'qwerty123',
        quantity: 2,
        type: PRODUCT,
        product: {
          id: 'SG1',
          price: {
            unit: 200,
            default: 800,
            special: 400
          }
        }
      }
    ]
    const input = {
      catalogProducts: [
        {
          id: 'SG1',
          price: {
            unitPrice: 200,
            unitPriceStriked: 400
          }
        }
      ],
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
      assert.deepEqual(newCartArg, expectedUpdatedCart)
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
      catalogProducts: [
        {
          id: 'SG1',
          price: {
            unitPrice: 200,
            unitPriceStriked: 400
          }
        }
      ],
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
