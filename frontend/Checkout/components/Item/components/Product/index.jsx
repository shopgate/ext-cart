import React from 'react';
import PropTypes from 'prop-types';
import Layout from './components/Layout';

/**
 *
 * @param {Object} props props
 * @return {*}
 */
const Product = ({ currency, product, quantity }) => (
  <Layout
    product={product}
    currency={currency}
    quantity={quantity}
  />
);

Product.propTypes = {
  currency: PropTypes.string.isRequired,
  product: PropTypes.shape().isRequired,
  quantity: PropTypes.number.isRequired,
};

export default Product;
