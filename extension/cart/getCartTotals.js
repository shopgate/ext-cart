const {PRODUCT, COUPON, COUPON_PERCENT, COUPON_FIXED} = require('../common/consts')

/**
 * Get cart totals information
 * @param {SDKContext} context
 * @param {Object} input
 * @param {CartItem[]} input.cartItems
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  const cartItems = input.cartItems

  let subTotal = cartItems
    .filter(item => item.type === PRODUCT)
    .map(item => item.product.price.special || item.product.price.default)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  const absDiscount = cartItems
    .filter(item => item.type === COUPON)
    .filter(item => item.coupon.savedPrice.type === COUPON_FIXED)
    .map(item => item.coupon.savedPrice.value)
    .reduce(
      (sum, amount) => sum + amount,
      0
    )

  // Extract absolute discounts
  subTotal -= absDiscount

  const relativeDiscount = cartItems
    .filter(item => item.type === COUPON)
    .filter(item => item.coupon.savedPrice.type === COUPON_PERCENT)
    .map(item => item.coupon.savedPrice.value)
    .reduce(
      (sum, percent) => sum + (subTotal * (percent / 100)),
      0
    )

  // Extract relative discounts
  subTotal -= relativeDiscount

  const totals = []
  totals.push({
    label: null,
    amount: subTotal,
    type: 'subTotal'
  })
  if (relativeDiscount || absDiscount) {
    totals.push({
      label: null,
      amount: -(absDiscount + relativeDiscount),
      type: 'discounts'
    })
  }
  totals.push({
    label: null,
    amount: subTotal,
    type: 'grandTotal'
  })

  return cb(null, {
    currency: context.config.currency,
    totals
  })
}
