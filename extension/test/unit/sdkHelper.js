const { PRODUCT, COUPON } = require('../../common/consts')
const CartItemId = require('./../../cart/CartItemId')

function createAddProductItem (productId, quantity) {
  return {
    productId,
    quantity
  }
}

function createProductCartItem (productId, quantity, unitPrice, defaultPrice) {
  return {
    id: new CartItemId(PRODUCT, productId).toString(),
    quantity,
    type: PRODUCT,
    product: {
      id: productId,
      price: {
        unit: unitPrice,
        default: defaultPrice
      }
    }
  }
}

function createCouponCartItem (couponCode, couponType, couponValue) {
  return {
    id: new CartItemId(COUPON, couponCode).toString(),
    quantity: 1,
    type: COUPON,
    product: null,
    coupon: {
      code: couponCode,
      description: null,
      label: 'Coupon',
      savedPrice: {
        value: couponValue,
        type: couponType
      }
    }
  }
}

function createCatalogProduct (id, name, unitPrice) {
  return {
    id,
    name,
    featuredImageUrl: `https://www.examle.com/images/${id}.jpg`,
    price: {
      unitPrice
    }
  }
}

// factories for context mocks
function createInput (cartStorageName, products = null, catalogProducts = null) {
  if (!products) {
    products = []
  }

  return {
    cartStorageName,
    products,
    catalogProducts
  }
}

function createContext (storageName = 'user', storageGetResult = null, storageSetHandler = null, storageGetHandler = null) {
  function SDKContext () {}
  const context = new SDKContext()
  context.storage = {}
  context.log = {}
  context.log.info = () => {}
  context.log.error = () => {}
  context.storage[storageName] = {
    get: async () => {
      return storageGetResult
    },
    set: storageSetHandler
  }

  // can overwrite storage get method for special unit testing cases
  if (storageGetHandler && typeof storageGetHandler === 'function') {
    context.storage[storageName].get = storageGetHandler
  }

  const unusedStorage = storageName === 'user' ? 'device' : 'user'
  context.storage[unusedStorage] = {
    get: async () => null,
    set: async () => null
  }

  return context
}

function createCbContext (storageName = 'user', storageGetResult = null, storageSetHandler = null, storageGetHandler = null) {
  const getCbHandler = (key, cb) => {
    cb(null, storageGetResult)
  }
  const context = createContext(storageName, storageGetResult, storageSetHandler, storageGetHandler || getCbHandler)
  const unusedStorage = storageName === 'user' ? 'device' : 'user'
  context.storage[unusedStorage] = {
    get: (key, cb) => cb(),
    set: (key, cb) => cb()
  }
  return context
}

module.exports = {
  createAddProductItem,
  createProductCartItem,
  createCouponCartItem,
  createCatalogProduct,
  createInput,
  createContext,
  createCbContext
}
