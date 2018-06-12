import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Icon from './components/Icon';
import Title from './components/Title';
import Code from './components/Code';
import styles from './style';
import CouponPrice from './components/CouponPrice';

/**
 *
 * @param {Object} props props
 * @return {*}
 */
const Layout = ({ coupon, currency }) => (
  <Grid className={styles.couponGrid}>
    <Grid.Item className={styles.leftColumn}>
      <Grid className={styles.iconContainer}>
        <Grid.Item>
          <Icon />
        </Grid.Item>
      </Grid>
    </Grid.Item>
    <Grid.Item grow={1} className={styles.content}>
      <Title value={coupon.label} />
      <Code value={coupon.code} />
    </Grid.Item>
    <Grid.Item grow={0} shrink={0}>
      <CouponPrice currency={currency} price={coupon.savedPrice} />
    </Grid.Item>
  </Grid>
);

Layout.propTypes = {
  coupon: PropTypes.shape().isRequired,
  currency: PropTypes.string.isRequired,
};

export default Layout;
