const InternalError = require('../common/Error/InternalError')

/**
 * @param {SDKContext} context
 */
module.exports = async (context) => {
  const cartStorageKey = 'cart'
  // load current cart from device
  try {
    await context.storage.device.del(cartStorageKey)
  } catch (err) {
    context.log.error(err, `Failed deleting '${cartStorageKey}' from device storage.`)
    throw new InternalError()
  }
}
