/**
 * @param {SDKContext} context
 * @param {object} input
 * @param {string[]} input.CartItemIds
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  /** @type {Cart} cart */
  context.storage.device.get('cart', (err, cart) => {
    if(err) cb(err)

    if(!cart) {
      return cb()
    }

    const newCart = cart.filter(item => {
      !input.CartItemIds.includes(item.id)
    })

    context.storage.device.set('cart', newCart, (err) => {
      if(err) cb(err)
      cb()
    })
  })
}