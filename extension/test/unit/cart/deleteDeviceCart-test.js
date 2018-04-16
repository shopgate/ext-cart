const assert = require('assert')
const executeStep = require('../../../cart/deleteDeviceCart')

describe('deleteDeviceCart', () => {
  const context = {
    log: {
      error: () => {}
    },
    storage: {
      device: {
        del: async (key) => {
          assert.equal(key, 'cart')
        }
      },
      user: {
        del: async () => {
          assert.fail()
        }
      }
    }
  }

  it('Should call delete on device storage', async () => {
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context)
    } catch (err) {
      assert.ifError(err)
    }
  })
})
