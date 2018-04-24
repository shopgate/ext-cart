const InternalError = require('../common/Error/InternalError')
const { PRODUCT, COUPON } = require('../common/consts')

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string} input.cartStorageName
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage[input.cartStorageName].get('cart', (err, cart) => {
    if (err) {
      context.log.error(err, `Failed to load a cart from ${input.cartStorageName} storage`)
      return cb(new InternalError())
    }

    // put products before coupons without touching the inner order of them
    const cartItems = !cart ? [] : cart.filter(
      item => item.type === PRODUCT
    ).concat(cart.filter(
      item => item.type === COUPON
    ))

    cb(null, {
      cartItems,
      messages: []
    })
  })
}
