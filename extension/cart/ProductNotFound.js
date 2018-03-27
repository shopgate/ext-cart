class ProductNotFound extends Error {
  constructor(productId) {
    super(`Product not found: ${productId.join(', ')}`)
    this.code = 'EPRODUCTNOTFOUND'
  }
}

module.exports = ProductNotFound
