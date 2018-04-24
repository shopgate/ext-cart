const assert = require('assert')
const InternalError = require('../../../common/Error/InternalError')
const { COUPON_FIXED, COUPON_PERCENT } = require('../../../common/consts')
const getCartItems = require('../../../cart/getCartItems')
const {
  createCouponCartItem,
  createProductCartItem,
  createCbContext,
  createInput
} = require('../sdkHelper')

describe('getCartItems', () => {
  const cartStorageName = 'device'

  it('Should produce an internal error response if the storage fails', (done) => {
    // produce an error on storage get
    const getHandler = (key, cb) => {
      // error tpe is irrelevant here
      cb(new Error())
    }

    // noinspection JSCheckFunctionSignatures
    getCartItems(createCbContext(cartStorageName, [], null, getHandler), createInput(cartStorageName), (err) => {
      // an internal error object should be
      if (!err || !(err instanceof InternalError)) {
        assert.fail()
      }
      done()
    })
  })

  it('Should not fail on empty storage', (done) => {
    // noinspection JSCheckFunctionSignatures
    getCartItems(createCbContext(cartStorageName), createInput(cartStorageName), (err) => {
      // "null" is a valid response, because the cart might not exist, yet
      assert.ifError(err)
      done()
    })
  })

  it('Should use the correct storage key (cart)', (done) => {
    const getHandler = (key, cb) => {
      // produce an error, if the key is wrong
      if (key !== 'cart') {
        cb(new Error())
      }
      cb()
    }

    // noinspection JSCheckFunctionSignatures
    getCartItems(createCbContext(cartStorageName, null, null, getHandler), {cartStorageName}, (err) => {
      // should return an error or else the key was wrong
      assert.ifError(err)
      done()
    })
  })

  it('Should fetch cart from the correct storage', (done) => {
    const userStorageName = 'user'
    const userStorageCartItems = [createProductCartItem('user123', 1, 1, 1)]
    const userStorageContext = createCbContext(userStorageName, userStorageCartItems)
    const deviceStorageName = 'device'
    const deviceStorageCartItems = [createProductCartItem('device456', 2, 2, 2)]
    const deviceStorageContext = createCbContext(deviceStorageName, deviceStorageCartItems)

    /* eslint-disable handle-callback-err */ // callback error is handled in another test
    getCartItems(userStorageContext, createInput(userStorageName), (err, userStorageResult) => {
      getCartItems(deviceStorageContext, createInput(deviceStorageName), (err, deviceStorageResult) => {
        // both asserts required for this test
        assert.deepEqual(userStorageResult.cartItems, userStorageCartItems)
        assert.deepEqual(deviceStorageResult.cartItems, deviceStorageCartItems)
        done()
      })
    })
    /* eslint-enable handle-callback-err */
  })

  it('Should get all cart items', (done) => {
    const cartItems = [
      createProductCartItem('A-QWERTY123', 1, 1, 1),
      createProductCartItem('B-QWERTY123', 5, 6, 6),
      createCouponCartItem('10off', COUPON_FIXED, 10)
    ]

    /* eslint-disable handle-callback-err */ // callback error is handled in another test
    // noinspection JSCheckFunctionSignatures
    getCartItems(createCbContext(cartStorageName, cartItems), createInput(cartStorageName), (err, result) => {
      assert.deepEqual(result.cartItems, cartItems)
      done()
    })
    /* eslint-enable handle-callback-err */
  })

  it('Should put all cart items before the coupons and not touch the inner order', (done) => {
    const savedCartItems = [
      createProductCartItem('A', 1, 1, 1),
      createProductCartItem('B', 2, 2, 2),
      createCouponCartItem('10off-fixed', COUPON_FIXED, 10),
      createProductCartItem('X', 3, 3, 3),
      createCouponCartItem('5precent-off', COUPON_PERCENT, 5),
      createProductCartItem('A', 4, 4, 5)
    ]
    const expectedReturn = [
      createProductCartItem('A', 1, 1, 1),
      createProductCartItem('B', 2, 2, 2),
      createProductCartItem('X', 3, 3, 3),
      createProductCartItem('A', 4, 4, 5),
      createCouponCartItem('10off-fixed', COUPON_FIXED, 10),
      createCouponCartItem('5precent-off', COUPON_PERCENT, 5)
    ]

    /* eslint-disable handle-callback-err */ // callback error is handled in another test
    // noinspection JSCheckFunctionSignatures
    getCartItems(createCbContext(cartStorageName, savedCartItems), createInput(cartStorageName), (err, result) => {
      assert.deepEqual(result.cartItems, expectedReturn)
      done()
    })
    /* eslint-enable handle-callback-err */
  })
})
