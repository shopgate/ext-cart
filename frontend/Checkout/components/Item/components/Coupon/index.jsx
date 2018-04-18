import React, {Component} from 'react'
import PropTypes from 'prop-types'
import connect from './connector'
import Layout from './components/Layout'

class Coupon extends Component {
  static propTypes = {
    coupon: PropTypes.shape().isRequired,
    currency: PropTypes.string.isRequired
  }

  static defaultProps = {}
  static childContextTypes = {}

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

export default connect(Coupon)
