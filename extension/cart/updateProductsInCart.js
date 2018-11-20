const InternalError = require('../common/Error/InternalError')
const { PRODUCT } = require('../common/consts')

/**
 * @typedef {Object} UpdateCartItem
 * @property {string} cartItemId
 * @property {number} quantity
 */

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {UpdateCartItem[]} input.updateItems
 * @param {Object[]} input.catalogProducts
 * @param {string} input.cartStorageName
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage[input.cartStorageName].get('cart', (err, cart) => {
    if (err) {
      context.log.error(err, `Failed to load a cart from ${input.cartStorageName} storage`)
      return cb(new InternalError())
    }

    /** @type {Cart} */
    if (!cart) {
      return cb()
    }

    // Filter out unknown entries
    const updateItems = input.updateItems.filter(item => {
      return !!cart.find(cartItem => cartItem.id === item.cartItemId)
    })

    // Update is empty
    if (!updateItems.length) {
      return cb()
    }

    cart = cart
      // 1. Update quantities for cart items by input
      .map(cartItem => {
        const updateItem = updateItems.find(updateItem => cartItem.id === updateItem.cartItemId)
        if (updateItem) {
          cartItem.quantity = updateItem.quantity
        }
        return cartItem
      })
      // 2. Update prices from catalogProducts
      .map(cartItem => {
        if (cartItem.type !== PRODUCT) {
          return cartItem
        }
        const catalogItem = input.catalogProducts.find(product => product.id === cartItem.product.id)
        if (!catalogItem) {
          // If catalog item not found, set to zero to filter out later
          cartItem.quantity = 0
        } else {
          let defaultPrice = catalogItem.price.unitPrice * cartItem.quantity
          let specialPrice = null
          if (catalogItem.price.unitPriceStriked) {
            defaultPrice = catalogItem.price.unitPriceStriked * cartItem.quantity
            specialPrice = catalogItem.price.unitPrice * cartItem.quantity
          }
          cartItem.product.price = {
            unit: catalogItem.price.unitPrice,
            default: defaultPrice,
            special: specialPrice
          }
        }
        return cartItem
      })
      // 3. Filter out items with zero quantity
      .filter(cartItem => cartItem.quantity > 0)

    context.storage[input.cartStorageName].set('cart', cart, (err) => {
      if (err) {
        context.log.error(err, `Failed to save a cart to ${input.cartStorageName} storage`)
        return cb(new InternalError())
      }
      cb()
    })
  })
}
