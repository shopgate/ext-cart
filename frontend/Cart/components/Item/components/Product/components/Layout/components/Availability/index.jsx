import React from 'react'
import PropTypes from 'prop-types'
import styles from './style'

/**
 * @param {Object} props
 * @param {Object} context
 */
const Availability = ({}, {product}) => (
  <div>
    <span className={styles[product.additionalInfo.availability.state]}>{product.additionalInfo.availability.text}</span>
  </div>
)

Availability.propTypes = {}
Availability.defaultProps = {}

Availability.contextTypes = {
  product: PropTypes.shape().isRequired
}

export default Availability
