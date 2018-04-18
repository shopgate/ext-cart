import React from 'react';
import PropTypes from 'prop-types';

const Code = ({ value }) => (
  <div>
    cart.coupon_code: {value}
  </div>
);

Code.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Code;
