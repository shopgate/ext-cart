const assert = require('assert')
const { createInput, createContext } = require('../sdkHelper')
const InternalError = require('../../../common/Error/InternalError')
const executeStep = require('../../../cart/deleteCart')

describe('deleteCart', () => {
  const cartStorageName = 'user'

  it('Should delete the cart', async () => {
    const delHandler = async (key) => {
      assert.equal(key, 'cart')
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(createContext(cartStorageName, null, null, null, delHandler), createInput(cartStorageName))
    } catch (err) {
      // not subject of the test, should therefore not fail
      assert.ifError(err)
    }
  })

  it('Should throw an InternalError on storage issues', async () => {
    const delHandler = async (key) => {
      throw new Error()
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(createContext(cartStorageName, null, null, null, delHandler), createInput(cartStorageName))
      assert.fail()
    } catch (err) {
      // not subject of the test, should therefore not fail
      assert.ok(err instanceof InternalError)
    }
  })

  it('Should delete the correct storage key', async () => {
    let deleteKey
    const delHandler = async (key) => {
      deleteKey = key
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(createContext(cartStorageName, null, null, null, delHandler), createInput(cartStorageName))
      assert.equal(deleteKey, 'cart')
    } catch (err) {
      // not subject of the test, should therefore not fail
      assert.ifError(err)
    }
  })

  it('Should delete the cart from the correct storage', async () => {
    const storageName = {
      user: 'user',
      device: 'device'
    }

    // use mocked storage "set" functions (one for each storage)
    const context = {}
    const storageDestination = {}
    let currentStorage = storageName.user
    context[currentStorage] = createContext(storageName[currentStorage], null, null, null, async () => {
      storageDestination[currentStorage] = storageName[currentStorage]
    })
    currentStorage = storageName.device
    context[currentStorage] = createContext(storageName[currentStorage], null, null, null, async () => {
      storageDestination[currentStorage] = storageName[currentStorage]
    })

    // execute step twice (to test both storage destinations) to run the test
    try {
      currentStorage = storageName.user
      await executeStep(context[currentStorage], createInput(storageName[currentStorage]))
      currentStorage = storageName.device
      await executeStep(context[currentStorage], createInput(storageName[currentStorage]))

      // make sure the right destination storage were used
      assert(storageDestination.user === storageName.user && storageDestination.device === storageName.device)
    } catch (err) {
      // not subject of the test, should therefore not fail
      assert.ifError(err)
    }
  })
})
