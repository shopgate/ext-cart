import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Price from '@shopgate/pwa-ui-shared/Price';
import PriceStriked from '@shopgate/pwa-ui-shared/PriceStriked';

/**
 * @param {Object} props props
 * @return {*}
 */
const ProductPrice = ({ currency, defaultPrice, specialPrice }) => (
  <Fragment>
    {!!specialPrice && (
      <Fragment>
        <PriceStriked
          value={defaultPrice}
          currency={currency}
        />
      </Fragment>
    )}
    <Price
      currency={currency}
      discounted={!!specialPrice}
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

ProductPrice.contextTypes = {};

export default ProductPrice;
