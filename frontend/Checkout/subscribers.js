import {main$} from '@shopgate/pwa-common/streams/main'
import { getCartItems } from '@shopgate/pwa-common-commerce/cart/selectors'
import fetchCart from '@shopgate/pwa-common-commerce/cart/actions/fetchCart'
import {ITEM_TYPE_PRODUCT, ITEM_TYPE_COUPON} from './../constants'

export default (subscribe) => {

  const checkoutEnter$ = main$.filter(({action}) => action.type === 'CHECKOUT_ENTER')
  const checkoutSuccess$ = main$.filter(({action}) => action.type === 'CHECKOUT_SUCCESS')

  subscribe(checkoutEnter$, ({ dispatch, getState }) => {
    const checkoutData = mapCartItemsToCheckoutData(getCartItems(getState()))
    // Inject cart data into checkout when present
    if (checkoutData.length) {
      dispatch({
        type: 'CHECKOUT_DATA',
        id: 'items',
        data: mapCartItemsToCheckoutData(getCartItems(getState()))
      })
    }
  })

  subscribe(checkoutSuccess$, ({ dispatch }) => {
    // Sync cart data with store, etc
    dispatch(fetchCart())
  })
}

function mapCartItemsToCheckoutData (cartItems) {
  return cartItems.map(cartItem => {
    if (cartItem.type === ITEM_TYPE_PRODUCT) {
      return mapCartProduct(cartItem)
    }
    return mapCartCoupon(cartItem)
  })
}

function mapCartProduct (cartItemProduct) {
  return {
    id: cartItemProduct.product.id,
    name: cartItemProduct.product.name,
    type: ITEM_TYPE_PRODUCT,
    unitPrice: cartItemProduct.product.price.unit,
    quantity: cartItemProduct.quantity
  }
}

function mapCartCoupon (cartItemCoupon) {
  return {
    id: cartItemCoupon.coupon.code,
    name: cartItemCoupon.coupon.label,
    type: ITEM_TYPE_COUPON,
    unitPrice: cartItemCoupon.coupon.savedPrice.value,
    quantity: cartItemCoupon.quantity
  }
}
