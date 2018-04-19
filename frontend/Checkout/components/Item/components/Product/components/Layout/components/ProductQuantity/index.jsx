import React from 'react';
import PropTypes from 'prop-types';
import styles from './style'

const ProductQuantity = ({ quantity }) => (
  <div className={styles.quantity}>
    <span>quantity: {quantity}</span>
  </div>
);

ProductQuantity.propTypes = {
  quantity: PropTypes.number
};

ProductQuantity.defaultProps = {
  quantity: null,
};

ProductQuantity.contextTypes = {}

export default ProductQuantity;
