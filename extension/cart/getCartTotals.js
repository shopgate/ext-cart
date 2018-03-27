/**
 * Get cart totals information
 * @param {SDKContext} context
 * @param {Object} input
 * @param {CartItem[]} input.cartItems
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const cartItems = input.cartItems

  const total = cartItems
    .map(item => item.price.default)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )
  const totals = {
    total: total,
    grandTotal: total
  }

  return cb(null, {
    totals
  })
}
