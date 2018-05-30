import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { App } from '@shopgate/pwa-common/context';
import Item from './components/Item';
import connect from './connector';

/**
 * @param {Object} props props
 * @return {*}
 */
const Checkout = ({ cartItems }) => (
  <App>
    {({ checkout }) => (
      <Fragment>
        {
          cartItems.map(cartItem => (
            <Fragment key={cartItem.id}>
              <Item item={cartItem} currency={checkout.currency} />
            </Fragment>
          ))
        }
      </Fragment>
    )}
  </App>
);

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(Checkout);
