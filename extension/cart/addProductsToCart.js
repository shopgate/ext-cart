const { PRODUCT } = require('../common/consts')
const InternalError = require('../common/Error/InternalError')
const EmptyInput = require('../common/Error/EmptyInput')
const CartItemId = require('./CartItemId')

/**
 * @typedef {Object} AddCartItemOption
 * @property {string} type select|input
 * @property {string} id
 * @property {string} value
 *
 * @typedef {Object} AddCartItem
 * @property {string} productId
 * @property {number} quantity
 * @property {string} id
 * @property {string} type
 * @property {AddCartItemOption[]} options
 */

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {AddCartItem[]} input.products
 * @param {string} input.cartStorageName
 * @param {Object[]} input.catalogProducts
 */
module.exports = async (context, input) => {
  const cartStorageKey = 'cart'

  // filter out products to add with zero quantity and sum up quantities of duplicated products
  const inputProducts = input.products.filter(product => product.quantity > 0)

  // don't do anything, if the input is empty
  if (!inputProducts.length) {
    context.log.info('Tried to add "no" products or only zero quantities to the cart.')
    throw new EmptyInput()
  }

  // load current cart
  let cart
  try {
    cart = await context.storage[input.cartStorageName].get(cartStorageKey)
  } catch (err) {
    context.log.error(err, `Failed loading '${cartStorageKey}' from '${input.cartStorageName}' storage.`)
    throw new InternalError()
  }

  // initialize cart if nonexistent
  if (!cart) {
    cart = []
  }

  // update products in cart first
  const productsToUpdate = inputProducts.filter(product => !!findProduct(cart, product))
  productsToUpdate.forEach(product => updateProductInCart(cart, product))

  // add new products to cart
  const productsToAdd = inputProducts.filter(product => !findProduct(cart, product))
  productsToAdd.forEach(product => {
    input.catalogProducts.forEach((productInfo) => {
      if (productInfo.id === product.productId) {
        addProductToCart(cart, product, productInfo)
      }
    })
  })

  // save new cart
  try {
    await context.storage[input.cartStorageName].set(cartStorageKey, cart)
  } catch (err) {
    context.log.error({err, cart}, `Failed saving '${cartStorageKey}' to '${input.cartStorageName}' storage`)
    throw new InternalError()
  }
}

/**
 * Check if the product exists in cart
 *
 * @param {Cart} cart
 * @param {AddCartItem} product
 * @return {CartItem}
 */
function findProduct (cart, product) {
  return cart.find(
    cartItem => cartItem.type === PRODUCT && cartItem.product.id === product.productId
  )
}

/**
 * @param {Cart} cart
 * @param {AddCartItem} product
 * @param {Object} productInfo single product from getProducts pipeline
 */
function addProductToCart (cart, product, productInfo) {
  const newCartItem = {
    id: getCartItemId(product),
    quantity: product.quantity,
    type: PRODUCT,
    product: {
      id: productInfo.id,
      name: productInfo.name,
      featuredImageUrl: productInfo.featuredImageUrl,
      price: {
        unit: productInfo.price.unitPrice,
        default: productInfo.price.unitPrice * product.quantity,
        special: productInfo.price.unitPriceStriked * product.quantity
      },
      properties: [
        /* @TODO get from product info and selected valiant and options */
      ],
      appliedDiscounts: [],
      additionalInfo: {
        availability: productInfo.availability
      }
    },
    coupon: null,
    messages: []
  }
  // noinspection JSCheckFunctionSignatures : price will be added later
  cart.push(newCartItem)
}

/**
 * @param {Cart} cart
 * @param {AddCartItem} product
 */
function updateProductInCart (cart, product) {
  const cartItem = findProduct(cart, product)
  if (cartItem) {
    cartItem.quantity += product.quantity
    cartItem.product.price.default = cartItem.quantity * cartItem.product.price.unit
  }
}

/**
 * Use productId as CartItemId
 * @param {AddCartItem} product
 */
function getCartItemId (product) {
  return new CartItemId(PRODUCT, product.productId).toString()
}
