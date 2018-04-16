const InternalError = require('../common/Error/InternalError')

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
    if (err) {
      context.log.error(err, `Failed to load a cart from ${input.cartStorageName} storage`)
      return cb(new InternalError())
    }

    if (!cart) {
      return cb()
    }

    // find all items to update and remove the ones without quantity
    cart = cart.filter(cartItem => {
      let updateItem = input.updateItems.find(updateItem => cartItem.id === updateItem.CartItemId)
      if (updateItem) {
        cartItem.quantity = updateItem.quantity
        cartItem.product.price.default = cartItem.quantity * cartItem.product.price.unit

        // remove the item if the quantity is zero
        return cartItem.quantity > 0
      }

      // no update for this item
      return true
    })

    context.storage[input.cartStorageName].set('cart', cart, (err) => {
      if (err) {
        context.log.error(err, `Failed to save a cart to ${input.cartStorageName} storage`)
        return cb(new InternalError())
      }
      cb()
    })
  })
}
