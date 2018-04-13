/**
 * @param {SDKContext} context
 */
module.exports = async (context) => {
  return { cartStorageName: context.meta.userId ? 'user' : 'device' }
}
