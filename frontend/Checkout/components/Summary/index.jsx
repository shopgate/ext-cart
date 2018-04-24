import React from 'react'
import Grid from '@shopgate/pwa-common/components/Grid'
import ShippingCostsLabel from './components/ShippingCostsLabel'
import SubTotalLabel from './components/SubTotalLabel'
import SubTotal from './components/SubTotal'
import styles from './style'

const Summary = ({currency, subTotal}) => (
  <div>
    <Grid className={styles.container}>
      <Grid.Item className={styles.labelColumn} grow={1}>
        <div className={styles.column}>
          <SubTotalLabel />
          <ShippingCostsLabel />
        </div>
      </Grid.Item>

      <Grid.Item className={styles.costsColumn} grow={1}>
        <div className={styles.column}>
          <SubTotal currency={currency} subTotal={subTotal} />
        </div>
      </Grid.Item>
    </Grid>
  </div>
)

export default Summary
