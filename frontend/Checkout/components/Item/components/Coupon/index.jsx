import React from 'react';
import PropTypes from 'prop-types';
import Layout from './components/Layout';

/**
 *
 * @param {Object} props props
 * @return {*}
 */
const Coupon = ({ currency, coupon }) => (
  <Layout
    coupon={coupon}
    currency={currency}
  />
);

Coupon.propTypes = {
  coupon: PropTypes.shape().isRequired,
  currency: PropTypes.string.isRequired,
};

export default Coupon;
