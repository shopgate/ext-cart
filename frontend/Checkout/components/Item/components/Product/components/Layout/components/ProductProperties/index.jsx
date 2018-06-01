import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {Object} props props
 * @return {*}
 */
const Properties = ({ properties }) => (
  <ul>
    {properties.forEach(({ label, value }) => (
      <li key={`${label}-${value}`}>
        {label}: {value}
      </li>
    ))}
  </ul>
);

Properties.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
};

Properties.defaultProps = {
  properties: [],
};

export default Properties;
