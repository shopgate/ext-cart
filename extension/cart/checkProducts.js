const ProductNotFound = require('./ProductNotFound')

/**
 * Check if all products from getProducts step are present before adding them to a cart
 * @param {SDKContext} context
 *
 * @param {Object} input
 * @param {Array} input.productIds
 * @param {Array} input.products
 *
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const products = input.products || []
  const notFoundProductIds = input.productIds.filter(productId => {
    let hasProduct = false
    products.forEach((product) => {
      if (product.id === productId) {
        hasProduct = true
      }
    })
    return !hasProduct
  })
  // some products are not found, throw error
  if (notFoundProductIds.length) {
    return cb(new ProductNotFound(notFoundProductIds))
  }
  cb(null)
}
