const assert = require('assert')
const addProductsToCart = require('../../../cart/addProductsToCart')
const {PRODUCT} = require('../../../cart/consts')

describe('addProductsToCart', () => {
  const context = {
    storage: {
      device: {
        get: (key, cb) => {
          assert.equal(key, 'cart')
          cb(null, [])
        }
      }
    }
  }
  it('Should skip zero quantity products', (done) => {
    const input = {
      products: [
        {
          productId: 'SG1',
          quantity: 0
        }
      ]
    }
    const expectedCart = []
    context.storage.device.set = (key, newCartArg, cb) => {
      assert.equal(key, 'cart')
      assert.deepEqual(newCartArg, expectedCart)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    addProductsToCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })

  it('Should add product to a cart', (done) => {
    const input = {
      products: [
        {
          productId: 'SG1',
          quantity: 1
        }
      ]
    }
    const expectedCart = [
      {
        id: 'product_sg1',
        productId: 'SG1',
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
    addProductsToCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })

  it('Should update product quantity', (done) => {
    context.storage.device.get = (key, cb) => {
      assert.equal(key, 'cart')
      cb(null, [
        {
          id: 'product_sg1',
          productId: 'SG1',
          quantity: 1,
          type: PRODUCT
        }
      ])
    }
    const input = {
      products: [
        {
          productId: 'SG1',
          quantity: 2
        }
      ]
    }
    const expectedCart = [
      {
        id: 'product_sg1',
        productId: 'SG1',
        quantity: 2,
        type: PRODUCT
      }
    ]
    context.storage.device.set = (key, newCartArg, cb) => {
      assert.equal(key, 'cart')
      assert.deepEqual(newCartArg, expectedCart)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    addProductsToCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })
})
