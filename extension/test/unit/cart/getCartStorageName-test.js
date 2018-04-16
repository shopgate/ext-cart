const assert = require('assert')
const executeStep = require('../../../cart/getCartStorageName')

describe('getCartStorageName', () => {
  // shared test data
  const guestUserStorageName = 'device'
  const registeredUserStorageName = 'user'
  const guestUserContext = {
    meta: {
      userId: null
    }
  }
  const registeredUserContext = {
    meta: {
      userId: 1
    }
  }

  it('Should not return errors for guest users', async () => {
    try {
      assert.ok(await executeStep(guestUserContext))
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should not return errors for registered users', async () => {
    try {
      assert.ok(await executeStep(registeredUserContext))
    } catch (err) {
      assert.ifError(err)
    }
  })

  it(`Should return the name of the ${guestUserStorageName} storage for guest users`, async () => {
    assert.equal((await executeStep(guestUserContext)).cartStorageName, guestUserStorageName)
  })

  it(`Should return the name of the ${registeredUserStorageName} storage for registered users`, async () => {
    assert.equal((await executeStep(registeredUserContext)).cartStorageName, registeredUserStorageName)
  })
})
