/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {AddCartItem[]} input.products
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const productIds = input.products
    .map(product => product.productId)
  cb(null, {productIds})
}
