const assert = require('assert')
const extractProductIds = require('../../../cart/extractProductIds')
const {PRODUCT, COUPON} = require('../../../cart/consts')

describe('extractProductIds', () => {
  const input = {
    products: [
      {
        id: 'product_1',
        productId: 'SG1',
        quantity: 1,
        type: PRODUCT
      },
      {
        id: 'coupon_10off',
        productId: '10off',
        code: '10off',
        type: COUPON,
        quantity: 1
      }
    ]
  }

  it('Should extract product Ids from input', (done) => {
    // noinspection JSCheckFunctionSignatures
    extractProductIds(context, input, (err, result) => {
      assert.ifError(err)
      assert.deepEqual(result.productIds, ['SG1'])
      done()
    })
  })
})
