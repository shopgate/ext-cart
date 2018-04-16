const assert = require('assert')
const {PRODUCT, COUPON} = require('../../../common/consts')
const executeStep = require('../../../cart/getDeviceCartForMigration')

describe('getCartItemsForMigration', () => {
  const cart = [
    {
      id: 'qwerty123',
      productId: 'QWERTY123',
      quantity: 1,
      type: PRODUCT,
      product: {
        id: 'SG1'
      }
    },
    {
      id: 'off10',
      quantity: 1,
      type: COUPON
    }
  ]
  const context = {
    log: {
      error: () => {}
    },
    storage: {
      device: {
        get: async () => cart
      }
    }
  }

  it('Should return products, mapped for addProducts pipeline', async () => {
    const expectedProducts = [
      {
        productId: 'SG1',
        quantity: 1
      }
    ]

    try {
      // noinspection JSCheckFunctionSignatures
      /** @type {GetCartItemsReturn} */
      const actualProducts = await executeStep(context)
      assert.deepEqual(actualProducts.products, expectedProducts)
    } catch (err) {
      assert.ifError(err)
    }
  })
})
