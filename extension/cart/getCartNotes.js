/**
 * Get cart information notes for customer, like legal notes, etc
 * @param {SDKContext} context
 * @param {object} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const notes = {
    legalText: context.config.legalText,
    legalInfo: context.config.legalInfo
  }

  return cb(null, {
    notes
  })
}
