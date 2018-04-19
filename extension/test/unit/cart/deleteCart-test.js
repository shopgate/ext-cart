const assert = require('assert')
const {PRODUCT, COUPON} = require('../../../common/consts')
const executeStep = require('../../../cart/deleteCart')

describe('deleteCart after checkout', () => {
  const cartStorageName = 'user'

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
    log: {
      error: () => {}
    },
    storage: {
      user: {}
    }
  }

  it('Should backup cart and remove original cart', async () => {
    context.storage.user.get = async (key) => {
      assert.equal(key, 'cart')
      return cart
    }
    context.storage.user.set = async (key, val) => {
      assert.equal(key, 'cart_bak')
      assert.deepEqual(val, cart)
    }
    context.storage.user.del = async (key) => {
      assert.equal(key, 'cart')
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context, {cartStorageName})
    } catch (err) {
      assert.ifError(err)
    }
  })
})
