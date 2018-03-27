const {PRODUCT} = require('./consts')
/**
 * @param {SDKContext} context
 * @param {object} input
 * @param {AddCartItem[]} input.products
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const productIds = input.products
    .filter(product => !product.type || product.type === PRODUCT)
    .map(product => product.productId)
  cb(null, {productIds})
}
