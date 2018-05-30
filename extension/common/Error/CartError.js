class CartError extends Error {
  constructor (cause = {message: ''}) {
    super()

    this.cause = cause
    this.code = 'ECART'
    this.message = `Cart error: ${cause.message}`
  }
}

module.exports = CartError
