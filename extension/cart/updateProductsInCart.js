/**
 * @typedef {Object} UpdateCartItem
 * @property {string} CartItemId
 * @property {number} quantity
 */

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {UpdateCartItem[]} input.updateItems
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  /** @type {Cart} cart */
  context.storage.device.get('cart', (err, cart) => {
    if (err || !cart) {
      return cb(err || null)
    }

    // find all items to update and remove the ones without quantity
    cart = cart.filter(cartItem => {
      let updateItem = input.updateItems.find(updateItem => cartItem.id === updateItem.CartItemId)
      if (updateItem) {
        cartItem.quantity = updateItem.quantity
        cartItem.product.price.default = cartItem.quantity * cartItem.product.price.unit

        // remove the item if the quantity is zero
        return cartItem.quantity > 0 ? cartItem : null
      }

      // no update for this item
      return cartItem
    })

    context.storage.device.set('cart', cart, (err) => {
      cb(err || null)
    })
  })
}
