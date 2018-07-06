/**
 * @param {SDKContext} context
 * @param {{cartItems: Object[], updateItems: Object[]}} input
 * @return {Promise<{productIds: string[]}>}
 */
module.exports = async (context, input) => {
  const updateIds = input.updateItems.map(item => item.CartItemId)

  const productIds = input.cartItems
    .filter(cartItem => updateIds.includes(cartItem.id))
    .map(cartItem => cartItem.product.id)

  return {
    productIds
  }
}
