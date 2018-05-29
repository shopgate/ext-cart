import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Item from './components/Item';
import connect from './connector';

/**
 * @param {Object} props props
 * @return {*}
 */
const Checkout = ({ currency, cartItems }) => (
  <Fragment>
    {
      cartItems.map(cartItem => (
        <Fragment key={cartItem.id}>
          <Item item={cartItem} currency={currency} />
        </Fragment>
      ))
    }
  </Fragment>
);

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  currency: PropTypes.string.isRequired,
};

export default connect(Checkout);
