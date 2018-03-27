/**
 * @param {SDKContext} context
 * @param {object} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage.device.get('cart', (err, cart) => {
    if (err) cb(err)

    return cb(null, {
      cartItems: cart
    })
  })
}