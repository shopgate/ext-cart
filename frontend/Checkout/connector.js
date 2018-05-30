import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import {
  getCartItems,
  getSubTotal,
} from '@shopgate/pwa-common-commerce/cart/selectors';

/**
 * @param {Object} state state
 * @return {{cartItems: *, subTotal: *}}
 */
const mapStateToProps = state => ({
  cartItems: getCartItems(state),
  subTotal: getSubTotal(state),
});

export default connect(mapStateToProps);
