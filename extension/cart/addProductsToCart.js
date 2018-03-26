/**
 * @typedef {Object} AddCartItem
 * @property {string} productId
 * @property {number} quantity
 * @property {string} type
 * @property {string} id
 * @property {CartItemOption[]} options
 */

/**
 * @param {SDKContext} context
 * @param {object} input
 * @param {AddCartItem[]} input.products
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage.device.get('cart', (err, cart) => {
    if (err) return cb(err)

    if (!cart) {
      cart = []
    }

    // add type property
    const addProducts = input.products.map(product => {
      product.type = 'product'
      return product
    })

    // Collect products to be added to a cart
    const productsToAdd = addProducts.filter(product => {
      return !cartHasProduct(cart, product)
    })
    // Collect products to be updated in a cart
    const productsToUpdate = addProducts.filter(product => {
      return cartHasProduct(cart, product)
    })

    // add new products to cart
    productsToAdd.map(product => addProductToCart(cart, product))

    // update products in cart
    productsToUpdate.map(product => updateProductInCart(cart, product))

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
function cartHasProduct(cart, product) {
  if (cart.length === 0) return false

  let existsInCart = false
  cart.forEach(cartItem => {
    if (cartItem.productId === product.productId) {
      existsInCart = true
    }
  })
  return existsInCart
}

/**
 * @param {Cart} cart
 * @param {AddCartItem} product
 */
function addProductToCart(cart, product) {
  product.id = getCartItemId(product)
  cart.push(product)
}

/**
 * @param {Cart} cart
 * @param {AddCartItem} product
 */
function updateProductInCart(cart, product) {
  cart.forEach(cartItem => {
    if (cartItem.productId === product.productId) {
      cartItem.quantity = product.quantity
    }
  })
}

/**
 * Use productId as CartItemId
 * @param {AddCartItem} product
 */
function getCartItemId(product) {
  return product.productId
}
