import connect from '@shopgate/pwa-common/components/Router/helpers/connect'
import {
  getCartItems,
  getCurrency,
  getSubTotal
} from '@shopgate/pwa-common-commerce/cart/selectors'

const mapStateToProps = (state) => ({
  cartItems: getCartItems(state),
  currency: getCurrency(state),
  subTotal: getSubTotal(state)
})

export default connect(mapStateToProps)
