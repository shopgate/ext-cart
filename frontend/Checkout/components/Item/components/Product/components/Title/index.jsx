import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';

/**
 * @param {Object} props props
 * @return {*}
 */
const Title = ({ value }) => (
  <div className={styles.title}>
    {value}
  </div>
);

Title.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Title;
