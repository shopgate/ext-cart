const {COUPON} = require('../common/consts')
const InternalError = require('../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string[]} input.cartItemIds
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
      return cb()
    }

    const cartChanged = cart.filter(item => {
      if (item.type === COUPON) {
        return !input.cartItemIds.includes(item.id)
      }
      return true
    })

    context.storage[input.cartStorageName].set('cart', cartChanged, (err) => {
      if (err) {
        context.log.error(err, `Failed to save a cart to ${input.cartStorageName} storage`)
        return cb(new InternalError())
      }
      cb()
    })
  })
}
