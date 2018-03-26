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
      return cb()
    }

    const cartChanged = cart.filter(item => {
      if (item.type === 'coupon') {
        return !input.couponCodes.includes(item.productId)
      }
      return true
    })

    context.storage.device.set('cart', cartChanged, (err) => {
      if (err) return cb(err)
      cb()
    })
  })
}