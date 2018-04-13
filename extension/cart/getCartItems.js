/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string} input.cartStorageName
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage[input.cartStorageName].get('cart', (err, cart) => {
    if (err) cb(err)

    cb(null, {
      cartItems: cart || [],
      messages: []
    })
  })
}
