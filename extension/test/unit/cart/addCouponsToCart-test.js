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
        code: coupon1.code,
        type: COUPON,
        description: coupon1.code,
        label: coupon1.code,
        productId: coupon1.code,
        quantity: 1,
        savedPrice: {
          type: coupon1.type,
          value: coupon1.value
        }
      },
      {
        id: `coupon_${coupon2.code}`.toLowerCase(),
        code: coupon2.code,
        type: COUPON,
        description: coupon2.code,
        label: coupon2.code,
        productId: coupon2.code,
        quantity: 1,
        savedPrice: {
          type: coupon2.type,
          value: coupon2.value
        }
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
        code: 'other coupon',
        type: COUPON,
        quantity: 1,
        savedPrice: {
          type: 'fixed',
          value: 10
        }
      }
    ]
    // only first coupon is applied
    const expectedCart = [
      cart[0],
      {
        id: `coupon_${coupon1.code}`.toLowerCase(),
        code: coupon1.code,
        type: COUPON,
        description: coupon1.code,
        label: coupon1.code,
        productId: coupon1.code,
        quantity: 1,
        savedPrice: {
          type: coupon1.type,
          value: coupon1.value
        }
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
