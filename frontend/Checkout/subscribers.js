import { main$ } from '@shopgate/pwa-common/streams/main';
import { cartReceived$ } from '@shopgate/pwa-common-commerce/cart/streams';
import { getCartItems } from '@shopgate/pwa-common-commerce/cart/selectors';
import fetchCart from '@shopgate/pwa-common-commerce/cart/actions/fetchCart';
import { ITEM_TYPE_PRODUCT, ITEM_TYPE_COUPON } from './../constants';

/**
 * @param {Object} cartItemProduct item
 * @return {{id: *, name: *, type: string, unitPrice: *, quantity: *}}
 */
function mapCartProduct(cartItemProduct) {
  return {
    id: cartItemProduct.product.id,
    name: cartItemProduct.product.name,
    type: ITEM_TYPE_PRODUCT,
    unitPrice: cartItemProduct.product.price.unit,
    quantity: cartItemProduct.quantity,
  };
}

/**
 * @param {Object} cartItemCoupon coupon
 * @return {{id: *, name: *, type: string, unitPrice: number, quantity: *}}
 */
function mapCartCoupon(cartItemCoupon) {
  return {
    id: cartItemCoupon.coupon.code,
    name: cartItemCoupon.coupon.label,
    type: ITEM_TYPE_COUPON,
    unitPrice: cartItemCoupon.coupon.savedPrice.value,
    quantity: cartItemCoupon.quantity,
  };
}

/**
 * @param {Object[]} cartItems items
 * @return {*}
 */
function mapCartItemsToCheckoutData(cartItems) {
  return cartItems.map((cartItem) => {
    if (cartItem.type === ITEM_TYPE_PRODUCT) {
      return mapCartProduct(cartItem);
    }
    return mapCartCoupon(cartItem);
  });
}

export default (subscribe) => {
  const checkoutEnter$ = main$.filter(({ action }) => action.type === 'CHECKOUT_ENTER');
  const checkoutSuccess$ = main$.filter(({ action }) => action.type === 'CHECKOUT_SUCCESS');

  /**
   * Update cart info on entering checkout
   * or when cart data received during checkout
   */
  const checkoutEnterOrCartReceived$ = checkoutEnter$.merge(cartReceived$);

  subscribe(checkoutEnterOrCartReceived$, ({ dispatch, getState }) => {
    const data = mapCartItemsToCheckoutData(getCartItems(getState()));
    // Inject cart data into checkout when present
    if (data.length) {
      dispatch({
        type: 'CHECKOUT_DATA',
        id: 'items',
        data,
      });
    }
  });

  subscribe(checkoutSuccess$, ({ dispatch }) => {
    // Sync cart data with store, etc
    dispatch(fetchCart());
  });
};
