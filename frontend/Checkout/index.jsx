import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Item from './components/Item'
import Summary from './components/Summary'
import connect from './connector'

class Checkout extends Component {
  static propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape()),
    subTotal: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired
  }

  static defaultProps = {
    cartItems: [],
    subTotal: 0,
    currency: ''
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {cartItems, subTotal, currency} = this.props

    return (
      <div>
        {
          cartItems.map(cartItem => (
            <Fragment key={cartItem.id}>
              <Item item={cartItem} currency={currency}/>
            </Fragment>
          ))
        }
        <Summary currency={currency} subTotal={subTotal} />
      </div>
    )
  }
}

export default connect(Checkout)
