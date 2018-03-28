const assert = require('assert')
const addCouponsToCart = require('../../../cart/addCouponsToCart')
const {PRODUCT, COUPON} = require('../../../cart/consts')
const couponCodes = require('../../../cart/couponCodes')

describe('addCouponsToCart', () => {
  const cart = [
    {
      id: 'qwerty123',
      productId: 'QWERTY123',
      quantity: 1,
      type: PRODUCT
    }
  ]
  const context = {
    config: {
      allowMultipleCoupons: true
    },
    storage: {
      device: {
        get: (key, cb) => {
          assert.equal(key, 'cart')
          cb(null, cart)
        }
      }
    }
  }
  it('Should add multiple coupons to a cart', (done) => {
    const coupon1 = couponCodes[0]
    const coupon2 = couponCodes[1]
    const input = {
      couponCodes: [coupon1.code, coupon2.code]
    }
    const expectedCart = [
      cart[0],
      {
        id: `coupon_${coupon1.code}`.toLowerCase(),
        quantity: 1,
        type: COUPON,
        product: null,
        coupon: {
          code: coupon1.code,
          description: null,
          label: 'Coupon',
          savedPrice: {
            type: coupon1.type,
            value: coupon1.value
          }
        },
        messages: []
      },
      {
        id: `coupon_${coupon2.code}`.toLowerCase(),
        quantity: 1,
        type: COUPON,
        product: null,
        coupon: {
          code: coupon2.code,
          description: null,
          label: 'Coupon',
          savedPrice: {
            type: coupon2.type,
            value: coupon2.value
          }
        },
        messages: []
      }
    ]
    context.storage.device.set = (key, newCartArg, cb) => {
      assert.equal(key, 'cart')
      assert.deepEqual(newCartArg, expectedCart)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    addCouponsToCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })

  it('Should apply only the first coupon to a cart', (done) => {
    context.config.allowMultipleCoupons = false
    const coupon1 = couponCodes[0]
    const coupon2 = couponCodes[1]
    const input = {
      couponCodes: [coupon1.code, coupon2.code]
    }
    const cartWithCoupon = [
      cart[0],
      {
        id: 'other coupon',
        type: COUPON
      }
    ]
    // only first coupon is applied
    const expectedCart = [
      cart[0],
      {
        id: `coupon_${coupon1.code}`.toLowerCase(),
        quantity: 1,
        type: COUPON,
        product: null,
        coupon: {
          code: coupon1.code,
          description: null,
          label: 'Coupon',
          savedPrice: {
            type: coupon1.type,
            value: coupon1.value
          }
        },
        messages: []
      }
    ]
    context.storage.device.get = (key, cb) => {
      assert.equal(key, 'cart')
      cb(null, cartWithCoupon)
    }
    context.storage.device.set = (key, newCartArg, cb) => {
      assert.equal(key, 'cart')
      assert.deepEqual(newCartArg, expectedCart)
      cb()
    }
    // noinspection JSCheckFunctionSignatures
    addCouponsToCart(context, input, (err) => {
      assert.ifError(err)
      done()
    })
  })
})
