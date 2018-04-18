import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Icon from './components/Icon';
import Title from './components/Title';
import Code from './components/Code';
import styles from './style';

const Layout = ({ coupon }) => (
  <Grid className={styles.item}>
    <Grid.Item className={styles.icon}>
        <Icon />
    </Grid.Item>
    <Grid.Item className={styles.content} grow={1}>
        <Title value={coupon.label} />
        <Code value={coupon.code} />
    </Grid.Item>
    <Grid.Item className={`${styles.content} ${styles.contentLast}`} grow={1} shrink={0}>
    </Grid.Item>
  </Grid>
);

Layout.propTypes = {
  coupon: PropTypes.shape().isRequired,
  currency: PropTypes.string.isRequired
};

Layout.defaultProps = {}

Layout.contextTypes = {};

export default Layout;
