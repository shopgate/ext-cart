/** @type {Array} */
const couponCodes = require('./couponCodes')
const {COUPON} = require('./consts')

/**
 * Add coupons to a cart
 * Pay attention to extension config: allowMultipleCoupons
 *
 * @param {SDKContext} context
 * @param {object} input
 * @param {string[]} input.couponCodes
 * @param {function} cb
 */
module.exports = function (context, input, cb) {

  /** @type {Cart} cart */
  context.storage.device.get('cart', (err, cart) => {
    if (err) cb(err)

    if (!cart) {
      cart = []
    }

    const allowMultipleCoupons = context.config.allowMultipleCoupons
    const messages = []
    let cartChanged = false
    input.couponCodes.forEach(function loop(couponCode) {
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

        cart.push({
          id: `coupon_${couponCode}`.toLowerCase(),
          productId: couponCode,
          quantity: 1,
          type: COUPON,
          code: coupon.code,
          description: coupon.code,
          label: coupon.code,
          savedPrice: {
            value: coupon.value,
            type: coupon.type
          }
        })

        if (!allowMultipleCoupons) {
          // stop a loop to prevent multiple coupons
          loop.stop = true
        }

      } else {
        messages.push(`Coupon ${couponCode} is invalid`)
      }
    })

    if (!cartChanged) {
      return cb(null, {messages})
    }

    context.storage.device.set('cart', cart, (err) => {
      if (err) return cb(err)
      cb(null, {messages})
    })
  })
}

function getCouponByCode(code) {
  let coupon = null
  couponCodes.forEach(singleCoupon => {
    if (singleCoupon.code === code) {
      coupon = singleCoupon
    }
  })
  return coupon
}