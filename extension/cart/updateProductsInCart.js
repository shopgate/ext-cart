/**
 * @typedef {Object} UpdateCartItem
 * @property {string} CartItemId
 * @property {number} quantity
 */

/**
 * @param {SDKContext} context
 * @param {object} input
 * @param {UpdateCartItem[]} input.CartItem
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  /** @type {Cart} cart */
  context.storage.device.get('cart', (err, cart) => {
    if (err) cb(err)

    if (!cart) {
      return cb()
    }

    // 1. Update quantity
    cart.forEach(cartItem => {
      input.CartItem.forEach(item => {
        if (item.CartItemId === cartItem.id) {
          cartItem.quantity = item.quantity
          cartItem.product.price.default = cartItem.quantity * cartItem.product.price.unit
        }
      })
    })

    // 2. Remove items with zero quantity
    cart = cart.filter(item => item.quantity > 0)

    context.storage.device.set('cart', cart, (err) => {
      if (err) cb(err)
      cb()
    })
  })
}
