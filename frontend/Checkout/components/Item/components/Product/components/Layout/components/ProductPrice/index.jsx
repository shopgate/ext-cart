import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import styles from './style';

/**
 * @param {Object} props props
 * @return {*}
 */
const ProductPrice = ({ currency, defaultPrice, specialPrice }) => (
  <div className={styles.quantity}>
    <I18n.Price
      price={specialPrice === 0 ? 0 : (specialPrice || defaultPrice)}
      currency={currency}
    />
  </div>
);

ProductPrice.propTypes = {
  currency: PropTypes.string.isRequired,
  defaultPrice: PropTypes.number.isRequired,
  specialPrice: PropTypes.number,
};

ProductPrice.defaultProps = {
  specialPrice: null,
};

ProductPrice.contextTypes = {};

export default ProductPrice;
