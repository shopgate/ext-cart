/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage.device.get('cart', (err, cart) => {
    if (err) cb(err)

    cb(null, {
      cartItems: cart || [],
      messages: []
    })
  })
}
