const InternalError = require('../common/Error/InternalError')

/**
 * This step is called after success checkout process
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string} input.cartStorageName
 */
module.exports = async (context, input) => {
  let cart

  // 1. Get a cart
  try {
    cart = await context.storage[input.cartStorageName].get('cart')
  } catch (err) {
    context.log.error(err, `Failed to load a cart from ${input.cartStorageName} storage`)
    throw new InternalError()
  }

  // 2. Backup a cart
  try {
    await context.storage[input.cartStorageName].set('cart_bak', cart)
  } catch (err) {
    context.log.error(err, `Failed to backup to ${input.cartStorageName} storage`)
    throw new InternalError()
  }

  // 3. Delete a cart
  try {
    await context.storage[input.cartStorageName].del('cart')
  } catch (err) {
    context.log.error(err, `Failed to delete a cart from ${input.cartStorageName} storage`)
    throw new InternalError()
  }
}
