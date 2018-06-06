import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import {
  COUPON_TYPE_FIXED,
  COUPON_TYPE_PERCENT,
} from './../../../../../../../../../constants';
import styles from './style';

/**
 *
 * @param {Object} props props
 * @return {*}
 */
const CouponPrice = ({ currency, price }) => {
  const {
    type: discountType,
    value: discountValue,
  } = price;

  if (discountType === COUPON_TYPE_FIXED) {
    return (
      <span className={styles}>
        <I18n.Price price={-discountValue} currency={currency} />
      </span>
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
