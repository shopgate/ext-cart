import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import {
  getSubTotal,
  getCartProductCount,
} from '@shopgate/pwa-common-commerce/cart/selectors';

/**
 * @param {Object} state state
 * @return {{quantity: *, subTotal: *}}
 */
const mapStateToProps = state => ({
  quantity: getCartProductCount(state),
  subTotal: getSubTotal(state),
});

export default connect(mapStateToProps);
