import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';

/**
 * The CouponTitle component.
 * @param {Object} props The component properties.
 * @returns {JSX}
 */
const Title = (props) => {
  let title = props.value;

  if (!props.value) {
    title = ('cart.default_coupon_label');
  }

  return (
    <div className={styles}>
      {title}
    </div>
  );
};

Title.propTypes = {
  value: PropTypes.string,
};

Title.defaultProps = {
  value: '',
};

export default Title;
