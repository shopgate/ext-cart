import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AvailabilityUi from '@shopgate/pwa-ui-shared/Availability';

/**
 * @param {Object} props Props fro component
 * @param {Object} context context from cart page
 * @return {*}
 */
const Availability = (props, { product }) => (
  <Fragment>
    {product && <AvailabilityUi
      text={product.additionalInfo.availability.text}
      showWhenAvailable
      state={product.additionalInfo.availability.state}
    />
    }
    {!product && null}
  </Fragment>
);

Availability.propTypes = {};
Availability.defaultProps = {};

Availability.contextTypes = {
  product: PropTypes.shape(),
};

export default Availability;
