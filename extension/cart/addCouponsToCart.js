/** @type {Array} */
const couponCodes = require('./couponCodes')
const {COUPON} = require('../common/consts')
const InternalError = require('../common/Error/InternalError')
const CartItemId = require('./CartItemId')

/**
 * Add coupons to a cart
 * Pay attention to extension config: allowMultipleCoupons
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string[]} input.couponCodes
 * @param {string} input.cartStorageName
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  /** @type {Cart} cart */
  context.storage[input.cartStorageName].get('cart', (err, cart) => {
    if (err) {
      context.log.error(err, `Failed to load a cart from ${input.cartStorageName} storage`)
      return cb(new InternalError())
    }

    if (!cart) {
      cart = []
    }

    const allowMultipleCoupons = context.config.allowMultipleCoupons
    const messages = []
    let cartChanged = false
    input.couponCodes.forEach(function loop (couponCode) {
      // forEach loop is stopped
      if (loop.stop) return

      const coupon = getCouponByCode(couponCode)
      if (coupon) {
        cartChanged = true

        if (!allowMultipleCoupons) {
          // remove previous coupon from a cart
          cart = cart.filter(item => item.type !== COUPON)
          cartChanged = true
        }

        const newCoupon = {
          id: new CartItemId(COUPON, couponCode).toString(),
          quantity: 1,
          type: COUPON,
          product: null,
          coupon: {
            code: coupon.code,
            description: null,
            label: 'Coupon',
            savedPrice: {
              value: coupon.value,
              type: coupon.type
            }
          },
          messages: []
        }

        cart.push(newCoupon)

        if (!allowMultipleCoupons) {
          // stop a loop to prevent multiple coupons
          loop.stop = true
        }
      } else {
        messages.push({
          code: 'EUNKNOWN',
          message: `Coupon ${couponCode} is invalid`,
          type: 'error'
        })
      }
    })

    if (!cartChanged) {
      return cb(null, {messages})
    }

    context.storage[input.cartStorageName].set('cart', cart, (err) => {
      if (err) {
        context.log.error(err, `Failed to save a cart to ${input.cartStorageName} storage`)
        return cb(new InternalError())
      }
      cb(null, {messages})
    })
  })
}

function getCouponByCode (code) {
  let coupon = null
  couponCodes.forEach(singleCoupon => {
    if (singleCoupon.code === code) {
      coupon = singleCoupon
    }
  })
  return coupon
}
