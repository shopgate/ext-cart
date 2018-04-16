const assert = require('assert')
const extractProductIds = require('../../../cart/extractProductIds')

describe('extractProductIds', () => {
  const input = {
    products: [
      {
        productId: 'SG1',
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
