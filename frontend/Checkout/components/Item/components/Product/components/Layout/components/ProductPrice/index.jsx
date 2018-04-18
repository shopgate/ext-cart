import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Price from './../../../../../../../../../../../../themes/theme-gmd/components/Price';
import PriceStriked from './../../../../../../../../../../../../themes/theme-gmd/components/PriceStriked';
import styles from './style';

const ProductPrice = ({ currency, defaultPrice, specialPrice }) => (
  <Fragment>
    {!!specialPrice && (
      <Fragment>
          <PriceStriked
            className={styles.priceStriked}
            value={defaultPrice}
            currency={currency}
          />
      </Fragment>
    )}
      <Price
        className={styles.price}
        currency={currency}
        discounted={!!specialPrice}
        taxDisclaimer
        unitPrice={specialPrice || defaultPrice}
      />
  </Fragment>
);

ProductPrice.propTypes = {
  currency: PropTypes.string.isRequired,
  defaultPrice: PropTypes.number.isRequired,
  specialPrice: PropTypes.number,
};

ProductPrice.defaultProps = {
  specialPrice: null,
};

ProductPrice.contextTypes = {}

export default ProductPrice;
