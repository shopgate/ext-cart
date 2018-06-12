import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Properties from '@shopgate/pwa-ui-shared/ProductProperties';
import Availability from '@shopgate/pwa-ui-shared/Availability';
import I18n from '@shopgate/pwa-common/components/I18n';
import Title from './components/Title';
import ProductPrice from './components/ProductPrice';
import ProductImage from './components/ProductImage';
import styles from './style';

/**
 *
 * @param {Object} props props
 * @return {*}
 */
const Product = ({ currency, product, quantity }) => (
  <Grid className={styles.item}>
    <Grid.Item className={styles.leftColumn}>
      <ProductImage product={product} />
    </Grid.Item>
    <Grid.Item className={styles.content} grow={1}>
      <Title value={product.name} />
      <Grid className={styles.info}>
        <Grid.Item grow={1}>

          <div>
            <I18n.Text string="cart.item.quantity" />: {quantity}
          </div>

          <Properties properties={product.properties} />
          <Availability
            text={product.additionalInfo.availability.text}
            showWhenAvailable
            state={product.additionalInfo.availability.state}
          />

        </Grid.Item>
        <Grid.Item grow={0} shrink={0} className={styles.price}>
          <ProductPrice
            currency={currency}
            defaultPrice={product.price.default}
            specialPrice={product.price.special}
          />
        </Grid.Item>
      </Grid>
    </Grid.Item>
  </Grid>
);

Product.propTypes = {
  currency: PropTypes.string.isRequired,
  product: PropTypes.shape().isRequired,
  quantity: PropTypes.number.isRequired,
};

export default Product;
