/** @type {Array} */
const couponCodes = require('./couponCodes')

/**
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

    const messages = []
    let cartChanged = false
    input.couponCodes.forEach(couponCode => {
      const coupon = getCouponByCode(couponCode)
      if (coupon) {
        cart.push({
          productId: couponCode,
          quantity: 1,
          type: 'coupon'
        })
        cartChanged = true
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


