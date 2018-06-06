const CartError = require('./../common/Error/CartError')
/**
 * @typedef {Object} CartGetCheckoutTotalsInput
 * @property {Object[]} cartTotals
 * @property {Object[]} totals
 */

/**
 * @param {SDKContext} context
 * @param {CartGetCheckoutTotalsInput} input
 * @returns {Promise<{totals: Object[]}>}
 */
module.exports = async (context, input) => {
  if (!Array.isArray(input.totals)) {
    context.log.warn(input, 'Checkout totals is malformed')
    throw new CartError('Checkout totals is malformed')
  }

  const cartTotals = input.cartTotals
  const totals = input.totals

  // calculate sub total for items
  const discounts = cartTotals.find(total => total.type === 'discounts')
  const subTotal = cartTotals.find(total => total.type === 'subTotal')

  totals.push({
    id: 'subtotal',
    label: 'Subtotal',
    amount: subTotal.amount
  })

  if (discounts) {
    totals.push({
      id: 'discounts',
      label: 'Discounts',
      amount: discounts.amount
    })
  }

  return {
    totals
  }
}
