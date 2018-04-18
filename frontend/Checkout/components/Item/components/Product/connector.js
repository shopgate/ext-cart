import { connect } from 'react-redux';
import { getCurrency } from '@shopgate/pwa-common-commerce/cart/selectors';

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

export default connect(mapStateToProps);
