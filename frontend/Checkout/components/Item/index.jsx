import React from 'react';
import PropTypes from 'prop-types';
import {
  ITEM_TYPE_PRODUCT,
  ITEM_TYPE_COUPON,
} from './../../../constants';
import Product from './components/Product';
import Coupon from './components/Coupon';

/**
 * @param {Object} props props
 * @return {*}
 */
const Item = ({ item, currency }) => {
  if (item.type === ITEM_TYPE_COUPON) {
    return (
      <Coupon coupon={item.coupon} currency={currency} />
    );
  }
  if (item.type === ITEM_TYPE_PRODUCT) {
    return (
      <Product product={item.product} quantity={item.quantity} currency={currency} />
    );
  }
  return null;
};

Item.propTypes = {
  currency: PropTypes.string.isRequired,
  item: PropTypes.shape().isRequired,
};

export default Item;
