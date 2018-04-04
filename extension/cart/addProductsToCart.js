const {PRODUCT} = require('./consts')
/**
 * @typedef {Object} AddCartItem
 * @property {string} productId
 * @property {number} quantity
 * @property {string} id
 */

/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {AddCartItem[]} input.products
 * @param {Object[]} input.productsCollection
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage.device.get('cart', (err, cart) => {
    if (err) return cb(err)

    if (!cart) {
      cart = []
    }

    // Filter out zero quantity
    const addProducts = input.products.filter(product => product.quantity > 0)

    // Collect products to be added to a cart
    const productsToAdd = addProducts.filter(product => {
      return !cartHasProduct(cart, product)
    })
    // Collect products to be updated in a cart
    const productsToUpdate = addProducts.filter(product => {
      return cartHasProduct(cart, product)
    })

    // add new products to cart
    productsToAdd.forEach(product => {
      input.productsCollection.forEach((productInfo) => {
        if (productInfo.id === product.productId) {
          addProductToCart(cart, product, productInfo)
        }
      })
    })

    // update products in cart
    productsToUpdate.forEach(product => updateProductInCart(cart, product))

    context.storage.device.set('cart', cart, (err) => {
      if (err) cb(err)
      cb()
    })
  })
}

/**
 * Check if product exists in cart
 * @param {Cart} cart
 * @param {AddCartItem} product
 */
function cartHasProduct (cart, product) {
  if (cart.length === 0) return false

  let existsInCart = false
  cart.forEach(cartItem => {
    if (cartItem.type === PRODUCT && cartItem.product.id === product.productId) {
      existsInCart = true
    }
  })
  return existsInCart
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
        special: null
      },
      properties: [],
      appliedDiscounts: [],
      additionalInfo: []
    },
    coupon: null,
    messages: []
  }
  // noinspection JSCheckFunctionSignatures : price will be added later
  cart.unshift(newCartItem)
}

/**
 * @param {Cart} cart
 * @param {AddCartItem} product
 */
function updateProductInCart (cart, product) {
  cart.forEach(cartItem => {
    if (cartItem.type === PRODUCT && cartItem.product.id === product.productId) {
      cartItem.quantity += product.quantity
      cartItem.product.price.default = cartItem.quantity * cartItem.product.price.unit
    }
  })
}

/**
 * Use productId as CartItemId
 * @param {AddCartItem} product
 */
function getCartItemId (product) {
  return `product_${product.productId}`.toLowerCase()
}
