import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Image from '@shopgate/pwa-common/components/Image';
import Properties from './components/ProductProperties';
import Title from './components/Title';
import ProductPrice from './components/ProductPrice';
import ProductQuantity from './components/ProductQuantity';
import styles from './style';
import Availability from './components/Availability';

/**
 * @param {Object} props props
 * @return {*}
 */
const Layout = props => (
  <Grid className={styles.item}>
    <Grid.Item className={styles.leftColumn}>
      <div className={styles.image}>
        <Image src={props.product.featuredImageUrl} />
      </div>
    </Grid.Item>
    <Grid.Item className={styles.content} grow={1}>
      <Title value={props.product.name} />
      <Grid className={styles.info}>
        <Grid.Item grow={1}>
          <Properties properties={props.product.properties} />
        </Grid.Item>
        <Grid.Item grow={1} shrink={0}>
          <Availability availability={props.product.additionalInfo.availability} />
          <ProductQuantity quantity={props.quantity} />
          <ProductPrice
            currency={props.currency}
            defaultPrice={props.product.price.default}
            specialPrice={props.product.price.special}
          />
        </Grid.Item>
      </Grid>
    </Grid.Item>
  </Grid>
);

Layout.propTypes = {
  currency: PropTypes.string.isRequired,
  product: PropTypes.shape().isRequired,
  quantity: PropTypes.number.isRequired,
};

Layout.defaultProps = {};
Layout.contextTypes = {};

export default Layout;
