import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import styles from './style';

const Title = ({ value }) => (
  <Grid>
    <Grid.Item grow={1}>
        <div className={styles.title}>
          {value}
        </div>
    </Grid.Item>
  </Grid>
);

Title.propTypes = {
  value: PropTypes.string.isRequired
}

Title.defaultProps = {}
Title.contextTypes = {}

export default Title;
