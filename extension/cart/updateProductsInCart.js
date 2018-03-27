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
    if(err) cb(err)

    if(!cart) {
      return cb()
    }

    // TODO IF quantity is zero, remove item
    cart.forEach(cartItem => {
      input.CartItem.forEach(item => {
        if (item.CartItemId === cartItem.id) {
          cartItem.quantity = item.quantity
        }
      })
    })

    context.storage.device.set('cart', cart, (err) => {
      if(err) cb(err)
      cb()
    })
  })
}
