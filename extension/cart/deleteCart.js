const InternalError = require('../common/Error/InternalError')

/**
 * This step is called after success checkout process
 *
 * @param {SDKContext} context
 * @param {Object} input
 * @param {string} input.cartStorageName
 * @returns {Promise<undefined>}
 */
module.exports = async (context, input) => {
  try {
    await context.storage[input.cartStorageName].del('cart')
  } catch (err) {
    context.log.error(err, `Failed to delete a cart from ${input.cartStorageName} storage`)
    throw new InternalError()
  }
}
