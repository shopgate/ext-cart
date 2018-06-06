import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {string} value code
 * @return {*}
 * @constructor
 */
const Code = ({ value }) => (
  <div>
    Code: {value}
  </div>
);

Code.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Code;
