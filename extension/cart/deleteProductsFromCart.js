const {PRODUCT} = require('../common/consts')
/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string[]} input.CartItemIds
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

    const newCart = cart.filter(item => {
      if (item.type !== PRODUCT) {
        return true
      }
      return !input.CartItemIds.includes(item.id)
    })

    context.storage[input.cartStorageName].set('cart', newCart, (err) => {
      if (err) cb(err)
      cb()
    })
  })
}
