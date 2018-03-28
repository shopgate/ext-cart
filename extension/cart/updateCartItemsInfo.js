const {PRODUCT} = require('./consts')
/**
 * @param {SDKContext} context
 * @param {object} input
 * @param {CartItem[]} input.cartItems
 * @param {Object[]} input.products from getProducts pipeline
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const cartItems = input.cartItems
  const products = input.products

  cartItems.forEach(cartItem => {
    if (cartItem.type !== PRODUCT) {
      return
    }
    products.forEach((product) => {
      if (cartItem.productId === product.id) {
        // Append item info to cart item
        cartItem.product = {
          id: product.id,
          name: product.name,
          featuredImageUrl: product.featuredImageUrl,
          price: {
            unit: product.price.unitPrice,
            default: product.price.unitPrice * cartItem.quantity,
            special: product.price.unitPrice * cartItem.quantity
          },
          properties: [],
          appliedDiscounts: [],
          additionalInfo: []
        }
      }
    })
  })
  cb(null, {
    cartItems
  })
}
