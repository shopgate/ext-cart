/**
 * @typedef {Object} UpdateCartItem
 * @property {string} CartItemId
 * @property {number} quantity
 */

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {UpdateCartItem[]} input.updateItems
 * @param {string} input.cartStorageName
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  /** @type {Cart} cart */
  context.storage[input.cartStorageName].get('cart', (err, cart) => {
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

    context.storage[input.cartStorageName].set('cart', cart, (err) => {
      cb(err || null)
    })
  })
}
