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
    const expectedCart = [
      {
        id: 'product_sg1',
        quantity: 1,
        type: PRODUCT,
        messages: [],
        product: {
          id: 'SG1',
          name: 'Simple Product',
          featuredImageUrl: 'https://fake.com',
          price: {
            unit: 200,
            default: 200,
            special: null
          },
          properties: [],
          appliedDiscounts: [],
          additionalInfo: []
        },
        coupon: null
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
          quantity: 1,
          type: PRODUCT,
          messages: [],
          product: {
            id: 'SG1',
            name: 'Simple Product',
            featuredImageUrl: 'https://fake.com',
            price: {
              unit: 200,
              default: 200,
              special: null
            },
            properties: [],
            appliedDiscounts: [],
            additionalInfo: []
          },
          coupon: null
        }
      ])
    }
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
        quantity: 2,
        type: PRODUCT,
        messages: [],
        product: {
          id: 'SG1',
          name: 'Simple Product',
          featuredImageUrl: 'https://fake.com',
          price: {
            unit: 200,
            default: 400,
            special: null
          },
          properties: [],
          appliedDiscounts: [],
          additionalInfo: []
        },
        coupon: null
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
