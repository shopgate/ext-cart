const {PRODUCT, COUPON, COUPON_PERCENT, COUPON_FIXED} = require('./consts')

/**
 * Get cart totals information
 * @param {SDKContext} context
 * @param {Object} input
 * @param {CartItem[]} input.cartItems
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const cartItems = input.cartItems

  const subTotal = cartItems
    .filter(item => item.type === PRODUCT)
    .map(item => item.product.price.default)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  let total = subTotal

  const couponsFixed = cartItems
    .filter(item => item.type === COUPON)
    .filter(item => item.coupon.savedPrice.type === COUPON_FIXED)
    .map(item => item.coupon.savedPrice.value)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )
  total -= couponsFixed

  const couponsPercent = cartItems
    .filter(item => item.type === COUPON)
    .filter(item => item.coupon.savedPrice.type === COUPON_PERCENT)
    .map(item => item.coupon.savedPrice.value)
    .reduce(
      (sum, percent) => sum + (total * (percent / 100)),
      0
    )
  total -= couponsPercent

  const totals = []
  totals.push({
    label: null,
    amount: subTotal,
    type: 'subTotal'
  })
  if (couponsPercent || couponsFixed) {
    totals.push({
      label: null,
      amount: couponsPercent + couponsFixed,
      type: 'discounts'
    })
  }
  totals.push({
    label: null,
    amount: total,
    type: 'grandTotal'
  })

  return cb(null, {
    currency: context.config.currency,
    totals
  })
}
