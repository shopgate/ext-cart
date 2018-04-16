const assert = require('assert')
const executeStep = require('../../../cart/addProductsToCart')
const {PRODUCT} = require('../../../common/consts')
const CartItemId = require('./../../../cart/CartItemId')

describe('addProductsToCart', () => {
  // some generic test data
  const sampleProductId1 = 'test-product-id-1'
  const sampleProductId2 = 'test-product-id-2'
  const sampleProductId3 = 'test-product-id-3'
  const storageName = {
    user: 'user',
    device: 'device'
  }

  // helper functions to create test data
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
  function createInput (cartStorageName, products, catalogProducts) {
    if (!products) {
      products = []
    }

    return {
      cartStorageName,
      products,
      catalogProducts
    }
  }
  function createContext (storageName = 'user', storageGetResult, storageSetInput) {
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
      set: storageSetInput
    }

    return context
  }

  it('Should throw EmptyInput error, when no products on input', async () => {
    // products with zero quanity
    const addProductsList = [
      {
        productId: 'SG1',
        quantity: 0
      }
    ]

    // mock the step input (storage type is irrelevant here)
    const input = createInput('user', addProductsList)
    try {
      await executeStep(createContext(), input)
      assert.fail()
    } catch (err) {
      assert.equal(err.code, 'EEMPTY')
    }
  })

  it('Should calculate the correct cart item quantities', async () => {
    // all products are available to be added (only id is relevant now)
    const catalogProducts = [createCatalogProduct(sampleProductId1, '', 0)]

    // add one product from catalog
    const addProductsList = [createAddProductItem(catalogProducts[0].id, 1)]

    const initialCart = [createProductCartItem(catalogProducts[0].id, 1, catalogProducts[0].price.unitPrice)]
    const expectedCart = [
      // updated cart item
      createProductCartItem(
        initialCart[0].product.id,
        initialCart[0].quantity + addProductsList[0].quantity,
        initialCart[0].product.price.unit
      )
    ]

    // use mocked storage "set" function
    let savedCart
    let currentStorage = storageName.user
    const context = createContext(storageName[currentStorage], initialCart, async (key, updatedCart) => {
      savedCart = updatedCart
    })

    // execute step twice (to test both storage destinations) to run the test
    try {
      await executeStep(context, createInput(storageName[currentStorage], addProductsList, catalogProducts))

      // now check if both carts have the same item and quantities are equal
      assert.deepEqual(
        savedCart.map(cartItem => createProductCartItem(cartItem.product.id, cartItem.quantity, cartItem.product.price.unit)),
        expectedCart
      )
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should calculate the correct cart item price', async () => {
    // all products are available to be added (only id is relevant now)
    const catalogProducts = [createCatalogProduct(sampleProductId1, '', 14.99)]

    // add one product 5 times from catalog (twice)
    const addProductsList = [
      createAddProductItem(catalogProducts[0].id, 5),
      createAddProductItem(catalogProducts[0].id, 5)
    ]

    // expect 3 of those already being in the cart
    const initialCart = [createProductCartItem(catalogProducts[0].id, 3, catalogProducts[0].price.unitPrice, 3 * catalogProducts[0].price.unitPrice)]
    const expectedCart = [
      // updated cart item
      createProductCartItem(
        catalogProducts[0].id,
        5 + 5 + 3,
        initialCart[0].product.price.unit,
        (5 + 5 + 3) * initialCart[0].product.price.unit
      )
    ]

    // use mocked storage "set" function
    let savedCart
    let currentStorage = storageName.user
    const context = createContext(storageName[currentStorage], initialCart, async (key, updatedCart) => {
      savedCart = updatedCart
    })

    // execute step twice (to test both storage destinations) to run the test
    try {
      await executeStep(context, createInput(storageName[currentStorage], addProductsList, catalogProducts))

      // now check if both carts have the same item and quantities are equal
      assert.deepEqual(
        savedCart.map(cartItem => createProductCartItem(cartItem.product.id, cartItem.quantity, cartItem.product.price.unit, cartItem.product.price.default)),
        expectedCart
      )
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should support adding duplicated input products', async () => {
    // all products are available to be added (only id is relevant now)
    const catalogProducts = [createCatalogProduct(sampleProductId1, '', 0)]

    // add one product 5 times from catalog (twice)
    const addProductsList = [
      createAddProductItem(catalogProducts[0].id, 5),
      createAddProductItem(catalogProducts[0].id, 5)
    ]

    // expect 3 of those already being in the cart
    const initialCart = [createProductCartItem(catalogProducts[0].id, 3, catalogProducts[0].price.unitPrice)]
    const expectedCart = [
      // updated cart item
      createProductCartItem(
        catalogProducts[0].id,
        5 + 5 + 3,
        initialCart[0].product.price.unit
      )
    ]

    // use mocked storage "set" function
    let savedCart
    let currentStorage = storageName.user
    const context = createContext(storageName[currentStorage], initialCart, async (key, updatedCart) => {
      savedCart = updatedCart
    })

    // execute step twice (to test both storage destinations) to run the test
    try {
      await executeStep(context, createInput(storageName[currentStorage], addProductsList, catalogProducts))

      // now check if both carts have the same item and quantities are equal
      assert.deepEqual(
        savedCart.map(cartItem => createProductCartItem(cartItem.product.id, cartItem.quantity, cartItem.product.price.unit)),
        expectedCart
      )
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should read the current cart from the correct storage', async () => {
    // all products are available to be added (only id is relevant now)
    const catalogProducts = [
      createCatalogProduct(sampleProductId1, '', 0),
      createCatalogProduct(sampleProductId2, '', 0)
    ]

    // add one product from catalog
    const addProductsList = [createAddProductItem(catalogProducts[0].id, 1)]

    const initialCarts = {
      user: [
        createProductCartItem(catalogProducts[1].id, 1, catalogProducts[1].price.unitPrice)
      ],
      device: [
        createProductCartItem(catalogProducts[0].id, 1, catalogProducts[0].price.unitPrice)
      ]
    }
    const expectedCarts = {
      user: [
        // unchanged cart item (treat as "was already there")
        initialCarts.user[0],
        // newly added cart item
        createProductCartItem(
          addProductsList[0].productId,
          addProductsList[0].quantity,
          catalogProducts[0].price.unitPrice
        )
      ],
      device: [
        // updated cart item
        createProductCartItem(
          initialCarts.device[0].product.id,
          initialCarts.device[0].quantity + addProductsList[0].quantity,
          initialCarts.device[0].product.price.unit
        )
      ]
    }

    // use mocked storage "set" functions (one for each storage) and define different "get" returns
    const context = {}
    const savedCart = {}
    let currentStorage = storageName.user
    context[currentStorage] = createContext(storageName[currentStorage], initialCarts[currentStorage], async (key, updatedCart) => {
      savedCart[currentStorage] = updatedCart
    })
    currentStorage = storageName.device
    context[currentStorage] = createContext(storageName[currentStorage], initialCarts[currentStorage], async (key, updatedCart) => {
      savedCart[currentStorage] = updatedCart
    })

    // execute step twice (to test both storage destinations) to run the test
    try {
      currentStorage = storageName.user
      await executeStep(context[currentStorage], createInput(storageName[currentStorage], addProductsList, catalogProducts))
      currentStorage = storageName.device
      await executeStep(context[currentStorage], createInput(storageName[currentStorage], addProductsList, catalogProducts))

      // now check if both carts to be saved have the expected content
      const savedCarts = {
        user: savedCart.user.map(cartItem => createProductCartItem(cartItem.product.id, cartItem.quantity, cartItem.product.price.unit)),
        device: savedCart.device.map(cartItem => createProductCartItem(cartItem.product.id, cartItem.quantity, cartItem.product.price.unit))
      }
      assert.deepEqual(
        savedCarts,
        expectedCarts
      )
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should save the cart into the correct storage', async () => {
    // all products are available to be added (only id is relevant now)
    const catalogProducts = [createCatalogProduct(sampleProductId1, '', 0)]

    // add one product from catalog
    const addProductsList = [createAddProductItem(catalogProducts[0].id, 1)]

    // use mocked storage "set" functions (one for each storage)
    const context = {}
    const storageDestination = {}
    let currentStorage = storageName.user
    context[currentStorage] = createContext(storageName[currentStorage], [], async () => {
      storageDestination[currentStorage] = storageName[currentStorage]
    })
    currentStorage = storageName.device
    context[currentStorage] = createContext(storageName[currentStorage], [], async () => {
      storageDestination[currentStorage] = storageName[currentStorage]
    })

    // execute step twice (to test both storage destinations) to run the test
    try {
      currentStorage = storageName.user
      await executeStep(context[currentStorage], createInput(storageName[currentStorage], addProductsList, catalogProducts))
      currentStorage = storageName.device
      await executeStep(context[currentStorage], createInput(storageName[currentStorage], addProductsList, catalogProducts))

      // make sure the right destination storage were used
      assert(storageDestination.user === storageName.user && storageDestination.device === storageName.device)
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should skip zero quantity products', async () => {
    // all products are available to be added (only id is relevant now)
    const catalogProducts = [
      createCatalogProduct(sampleProductId1, '', 0),
      createCatalogProduct(sampleProductId2, '', 0),
      createCatalogProduct(sampleProductId3, '', 0)
    ]

    const addProductsList = [
      createAddProductItem(catalogProducts[0].id, 1),
      createAddProductItem(catalogProducts[2].id, 0),
      createAddProductItem(catalogProducts[2].id, 1)
    ]

    // expect first and third product to be added only
    const expectedCart = [
      createProductCartItem(addProductsList[0].productId, addProductsList[0].quantity, catalogProducts[0].price.unitPrice),
      createProductCartItem(addProductsList[2].productId, addProductsList[2].quantity, catalogProducts[2].price.unitPrice)
    ]

    const currentStorage = storageName.user

    // mock the step input (storage type is irrelevant here, but must be valid)
    const input = createInput(currentStorage, addProductsList, catalogProducts)

    // use a mocked the storage "set" function
    let savedCart
    const context = createContext(currentStorage, [], async (key, updatedCart) => {
      savedCart = updatedCart
    })

    // execute step to run the test
    try {
      await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }

    // only take the relevant data from the "saved" cart
    assert.deepEqual(
      savedCart.map(cartItem => createProductCartItem(cartItem.product.id, cartItem.quantity, cartItem.product.price.unit)),
      expectedCart
    )
  })
})
