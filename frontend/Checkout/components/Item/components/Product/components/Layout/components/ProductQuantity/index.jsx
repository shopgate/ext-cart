import React from 'react'
import PropTypes from 'prop-types'
import I18n from '@shopgate/pwa-common/components/I18n'
import styles from './style'

const ProductQuantity = ({ quantity }) => (
  <div className={styles.quantity}>
    <span><I18n.Text string='cart.item.quantity' />: {quantity}</span>
  </div>
)

ProductQuantity.propTypes = {
  quantity: PropTypes.number
}

ProductQuantity.defaultProps = {
  quantity: null
}

ProductQuantity.contextTypes = {}

export default ProductQuantity
