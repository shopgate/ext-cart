const assert = require('assert')
const checkProducts = require('../../../cart/checkProducts')

describe('checkProducts', () => {
  it('succeeds when checkProducts gets valid input data', (done) => {
    const input = {
      productIds: ['SG1'],
      productsCollection: [
        {
          id: 'SG1'
        }
      ]
    }
    // noinspection JSCheckFunctionSignatures
    checkProducts({}, input, (err) => {
      assert.ifError(err)
      done()
    })
  })

  it('should return an error when products are missing', (done) => {
    const input = {
      productIds: ['SG1', 'SG2'],
      products: [
        {
          id: 'SG1'
        }
      ]
    }
    // noinspection JSCheckFunctionSignatures
    checkProducts({}, input, (err) => {
      assert.equal(err.code, 'EPRODUCTNOTFOUND')
      assert(err.message.endsWith('SG2'))
      done()
    })
  })
})
