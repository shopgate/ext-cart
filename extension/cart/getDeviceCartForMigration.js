const InternalError = require('../common/Error/InternalError')
const {PRODUCT} = require('../common/consts')

/**
 * @typedef {Object} GetCartItemsReturn
 * @property {AddCartItem[]} products
 */

/**
 * @param {SDKContext} context
 * @return {?GetCartItemsReturn}
 */
module.exports = async (context) => {
  const cartStorageKey = 'cart'
  // load current cart from device
  let cart
  try {
    cart = await context.storage.device.get(cartStorageKey)
  } catch (err) {
    context.log.error(err, `Failed loading '${cartStorageKey}' from device storage.`)
    throw new InternalError()
  }

  if (!cart) {
    return {products: null}
  }

  // Map device cart items of product type to input for addProducts pipeline
  const products = cart.filter(cartItem => cartItem.type === PRODUCT).map(cartItem => (
    {
      productId: cartItem.product.id,
      quantity: cartItem.quantity
    }
  ))
  return products.length ? {products} : {products: null}
}
