import React from 'react';
import PropTypes from 'prop-types';
import AvailabilityUi from '@shopgate/pwa-ui-shared/Availability';

/**
 * @param {Object} availability availability info
 * @return {*}
 */
const Availability = ({ availability }) => (
  <AvailabilityUi
    text={availability.text}
    showWhenAvailable
    state={availability.state}
  />
);

Availability.propTypes = {
  availability: PropTypes.shape(),
};

Availability.defaultProps = {
  availability: {},
};

export default Availability;
