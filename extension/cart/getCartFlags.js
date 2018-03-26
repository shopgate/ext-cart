/**
 * Get cart flags, like tax included, orderable, coupons, etc
 * @param {SDKContext} context
 * @param {object} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const flags = {
    orderable: true, // TODO implement orderable policy
    taxIncluded: false, // TODO implement tax policy
    coupons: context.config.hasCoupons
  }

  return cb(null, {
    isOrderable: true,
    isTaxIncluded: false,
    flags
  })
}
