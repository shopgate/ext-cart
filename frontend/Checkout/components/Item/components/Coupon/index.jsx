import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Layout from './components/Layout'

class Coupon extends Component {
  static propTypes = {
    coupon: PropTypes.shape().isRequired,
    currency: PropTypes.string.isRequired
  }
  static defaultProps = {
    coupon: {}
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout
        coupon={this.props.coupon}
        currency={this.props.currency}
      />
    )
  }
}

export default Coupon
