class CartItemId {
  constructor (type, id) {
    this.type = type
    this.id = id
  }

  toString () {
    return `${this.type}_${this.id.toLowerCase()}`
  }
}

module.exports = CartItemId
