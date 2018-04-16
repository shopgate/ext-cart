const InternalError = require('../common/Error/InternalError')

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string} input.cartStorageName
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage[input.cartStorageName].get('cart', (err, cart) => {
    if (err) {
      context.log.error(err, `Failed to load a cart from ${input.cartStorageName} storage`)
      return cb(new InternalError())
    }

    cb(null, {
      cartItems: cart || [],
      messages: []
    })
  })
}
