const assert = require('assert')
const updateCartItemsInfo = require('../../../cart/updateCartItemsInfo')

describe('updateProductsInCart', () => {
  const input = {
    cartItems: [
      {
        id: 'product_sg1',
        productId: 'SG1',
        quantity: 2, // !! to check default price
        type: 'product'
      }
    ],
    productsCollection: [
      {
        id: 'SG1',
        name: 'Simple Product',
        active: true,
        description: 'Simple Product description',
        manufacturer: 'Shopgate',
        identifiers: {
          sku: '123466789-SG1'
        },
        tags: [],
        ageRating: 0,
        stock: {
          ignoreQuantity: false,
          quantity: 12,
          info: 'In stock',
          orderable: true,
          minOrderQuantity: 1,
          maxOrderQuantity: 10000
        },
        rating: {
          count: 0,
          average: 0,
          reviewCount: 0
        },
        flags: {
          hasChildren: false,
          hasVariants: false,
          hasOptions: false
        },
        baseProductId: null,
        availability: {
          text: 'In stock',
          state: 'ok'
        },
        featuredImageUrl: 'https://fake.com',
        type: 'simple',
        price: {
          currency: 'EUR',
          info: '',
          unitPrice: 200,
          unitPriceStriked: 0,
          unitPriceMin: 0,
          unitPriceNet: 200,
          unitPriceWithTax: 200,
          taxAmount: 0,
          taxPercent: 0,
          msrp: 0,
          tiers: [],
          unitPriceMax: 1000
        },
        highlight: false,
        liveshoppings: []
      }
    ]
  }

  it('Should update products in cart', (done) => {
    const expectedCartItems = [
      {
        id: 'product_sg1',
        productId: 'SG1',
        quantity: 2,
        type: 'product',
        product: {
          id: 'SG1',
          name: 'Simple Product',
          featuredImageUrl: "https://fake.com",
          price: {
            default: 400,
            special: 400,
            unit: 200
          },
          additionalInfo: [],
          appliedDiscounts: [],
          properties: []
        }
      }
    ]
    updateCartItemsInfo({}, input, (err, res) => {
      assert.ifError(err)
      assert.deepEqual(res.cartItems, expectedCartItems)
      done()
    })
  })
})
