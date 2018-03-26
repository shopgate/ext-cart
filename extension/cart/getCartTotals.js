/**
 * Get cart totals information
 * @param {SDKContext} context
 * @param {CartItem[]} input.cartItems
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const cartItems = input.cartItems
  const totals = {
    grandTotal: 0
  }

  return cb(null, {
    totals
  })
}
