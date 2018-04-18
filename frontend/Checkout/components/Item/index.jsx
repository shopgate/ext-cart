import React from 'react';
import PropTypes from 'prop-types';
import {
  ITEM_TYPE_PRODUCT,
  ITEM_TYPE_COUPON,
} from './../../../constants';
import Product from './components/Product';
import Coupon from './components/Coupon';

const Item = ({ item }) => {
  if (item.type === ITEM_TYPE_COUPON) {
    return (
      <Coupon
        id={item.id}
        key={item.id}
        coupon={item.coupon}
      />
    );
  }
  if (item.type === ITEM_TYPE_PRODUCT) {
    return (
      <Product
        id={item.id}
        key={item.id}
        product={item.product}
        quantity={item.quantity}
      />
    );
  }
  return null
};

Item.propTypes = {
  item: PropTypes.shape().isRequired,
};

export default Item;
