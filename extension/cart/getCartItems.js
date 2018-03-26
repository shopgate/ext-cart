/**
 * @param {SDKContext} context
 * @param {object} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  context.storage.device.get('cart', cart, (err) => {
    if (err) cb(err)


    const isOrderable = true
    const isTaxIncluded = false
    const currency = context.config.currency
    const messages = []
    const text = {
      legalText: context.config.legalText,
      legalInfo: context.config.legalInfo
    }
    const cartItems = [
      mapProduct({})
    ]
    const totals = [
      {
        label: null,
        amount: 0,
        type: 'subTotal'
      },
      {
        label: null,
        amount: 0,
        type: 'grandTotal'
      }
    ]
    const flags = {
      orderable: isOrderable,
      taxIncluded: isTaxIncluded,
      coupons: false
    }

    return cb(null, {
      isOrderable,
      isTaxIncluded,
      currency,
      messages,
      text,
      cartItems,
      totals,
      flags
    })
  })
}

function mapProduct(product) {
  return {
    id: '75681198',
    quantity: 3,
    type: 'product',
    product: {
      id: '999',
      name: 'Product with many Properties - 4 -',
      featuredImageUrl: 'https://img-cdn.shopgate.com/30289/1/c4b8c005d76ba2f8ed85510ea33608a0bfc59832dfc463f728ef2b742ac54f5f',
      price: {
        unit: 199,
        default: 597,
        special: null
      },
      properties: [],
      appliedDiscounts: [],
      additionalInfo: []
    },
    coupon: null,
    messages: []
  }
}

function mapCoupon(coupon) {
  return {
    code: this.code,
    description: this.description,
    label: this.label,
    savedPrice: {
      value: 0.00,
      type: 'fixed' // percentage
    }
  }
}