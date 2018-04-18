import React, {Component} from 'react'
import PropTypes from 'prop-types'
import connect from './connector'
import Layout from './components/Layout'

class Product extends Component {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    product: PropTypes.shape().isRequired,
    quantity: PropTypes.number.isRequired
  }

  static defaultProps = {}
  static childContextTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout
        product={this.props.product}
        currency={this.props.currency}
        quantity={this.props.quantity}
      />
    )
  }
}

export default connect(Product)
