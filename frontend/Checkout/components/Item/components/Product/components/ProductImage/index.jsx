import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import { getActualImageSource } from '@shopgate/pwa-common/helpers/data';
import PlaceholderIcon from '@shopgate/pwa-ui-shared/icons/PlaceholderIcon';
import styles from './style';

/**
 * @param {Object} props props
 * @return {*}
 */
const ProductImage = ({ product }) => (
  <Grid className={styles.imageContainer}>
    <Grid.Item>
      {product.featuredImageUrl &&
      <img
        src={getActualImageSource(product.featuredImageUrl, {
          width: 440,
          height: 440,
        })}
        alt={product.name}
        className={styles.image}
      />
      }
      {!product.featuredImageUrl && <PlaceholderIcon size={48} />}
    </Grid.Item>
  </Grid>
);

ProductImage.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default ProductImage;
