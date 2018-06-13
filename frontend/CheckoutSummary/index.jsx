import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import I18n from '@shopgate/pwa-common/components/I18n';
import { App } from '@shopgate/pwa-common/context';
import connect from './connector';
import * as style from './style';

/**
 * @param {Object} props props
 * @return {*}
 */
const CheckoutSummary = ({ quantity, subTotal }) => (
  <App>
    {({ checkout }) => (
      <div className={style.container}>
        <Grid>
          <Grid.Item grow={1}>
            <I18n.Text string="cart.checkoutView.summaryRow" params={{ quantity }} />
          </Grid.Item>
          <Grid.Item grow={0}>
            <I18n.Price price={subTotal} currency={checkout.currency} />
          </Grid.Item>
        </Grid>
      </div>
    )}
  </App>
);

CheckoutSummary.propTypes = {
  quantity: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
};

export default connect(CheckoutSummary);
