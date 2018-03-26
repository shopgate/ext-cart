const assert = require('assert')
const updateCartItemsInfo = require('../../../cart/updateCartItemsInfo')

describe('updateProductsInCart', () => {
  const input = {
    cartItems: [
      {
        id: 1,
        productId: 'SG1',
        quantity: 1,
        type: 'product'
      }
    ],
    productsCollection: [
      {
        id: 'SG1',
        name: 'Simple product'
      }
    ]
  }

  it('Should update products in cart', (done) => {
    updateCartItemsInfo({}, input, (err, res) => {
      assert.ifError(err)
      assert.deepEqual(res.cartItems, input.cartItems)
      done()
    })
  })
})
