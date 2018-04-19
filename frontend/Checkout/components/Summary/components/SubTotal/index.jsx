import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import styles from './style';

const SubTotal = ({ currency, subTotal }) => (
  <div className={`${styles.totalValue}`}>
    <I18n.Price price={subTotal} currency={currency} />
  </div>
);

SubTotal.propTypes = {
  currency: PropTypes.string.isRequired,
  subTotal: PropTypes.number.isRequired
};

export default SubTotal;
