const {COUPON} = require('../common/consts')
/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string[]} input.couponCodes
 * @param {string} input.cartStorageName
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  /** @type {Cart} cart */
  context.storage[input.cartStorageName].get('cart', (err, cart) => {
    if (err) cb(err)

    if (!cart) {
      return cb()
    }

    const cartChanged = cart.filter(item => {
      if (item.type === COUPON) {
        return !input.couponCodes.includes(`coupon_${item.coupon.code}`)
      }
      return true
    })

    context.storage[input.cartStorageName].set('cart', cartChanged, (err) => {
      if (err) return cb(err)
      cb()
    })
  })
}
