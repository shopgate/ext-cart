/**
 * @param {SDKContext} context
 * @param {object} input
 * @param {CartItem[]} input.cartItems
 * @param {Object[]} input.productsCollection from getProducts pipeline
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const cartItems = input.cartItems
  const items = input.productsCollection

  // TODO: add item info, texts, price info, etc

  cb(null, {
    cartItems
  })
}

