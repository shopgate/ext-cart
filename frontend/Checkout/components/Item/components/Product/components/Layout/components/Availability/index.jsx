import React from 'react'
import PropTypes from 'prop-types'
import styles from './style'

const Availability = ({ availability }) => (
  <div className={styles.availability}>
    <span className={styles[availability.state]}>{availability.text}</span>
  </div>
)

Availability.propTypes = {
  availability: PropTypes.shape()
}

Availability.defaultProps = {
  availability: {}
}

Availability.contextTypes = {}

export default Availability
