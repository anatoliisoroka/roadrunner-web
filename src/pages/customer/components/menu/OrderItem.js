import React from 'react'

import Price from '../../../../utils/Price'

export default class OrderItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: props.item,
      currency: props.currency
    }
  }

  _setTotalItemPrice(item) {
    let extraCost = this._getAdditionalCost(item)
    let singlePrice = item.price + extraCost
    return Price.format(singlePrice * item.quantity, this.state.currency)
  }

  _getAdditionalCost(item) {
    if (item.option_groups == null) {
      return 0
    }
    let additionalCost = 0
    item.option_groups.map(option_group => {
      option_group.options.map(option => {
        if (option.price == null) {
          return
        }
        let quantityPrice = option.price * option.quantity
        additionalCost += quantityPrice
      })
    })
    return additionalCost
  }

  _renderOrderOptionGroupItems(item) {
    if (item.option_groups == null) {
      return null
    }
    return item.option_groups.map(option_group => {
      return option_group.options.map((option, index) => {
        return option.title + ' '
      })
    })
  }

  render() {
    let { item } = this.state
    return (
      <div className="row cartItem">
        <div className="col-6">
          <span>
            {item.quantity} x {item.title}
          </span>
          <br />
          <span className="item-details">
            {this._renderOrderOptionGroupItems(item)}
          </span>
        </div>
        <div className="col-6 text-right">
          <span>{this._setTotalItemPrice(item)}</span>
        </div>
      </div>
    )
  }
}
