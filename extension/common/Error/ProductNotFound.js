class ProductNotFound extends Error {
  constructor (productId) {
    super()
    this.message = `Product not found: ${productId.join(', ')}`
    this.code = 'EPRODUCTNOTFOUND'
  }
}

module.exports = ProductNotFound
