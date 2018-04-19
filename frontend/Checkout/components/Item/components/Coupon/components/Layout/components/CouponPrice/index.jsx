import React from 'react';
import PropTypes from 'prop-types';
import {
  COUPON_TYPE_FIXED,
  COUPON_TYPE_PERCENT,
} from './../../../../../../../../../constants';
import Price from './../../../../../../../../../../../../themes/theme-gmd/components/Price';
import styles from './style';

const CouponPrice = ({ currency, price }) => {
  const {
    type: discountType,
    value: discountValue,
  } = price;

  if (discountType === COUPON_TYPE_FIXED) {
    return (
      <Price
        className={styles}
        currency={currency}
        discounted
        unitPrice={-discountValue}
      />
    );
  } else if (discountType === COUPON_TYPE_PERCENT) {
    return (
      <span className={styles}>
        -{discountValue}%
      </span>
    );
  }

  return null;
};

CouponPrice.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
};

export default CouponPrice;
