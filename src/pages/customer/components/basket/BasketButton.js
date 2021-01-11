import React from 'react'
import { withRouter } from 'react-router-dom'

import BasketManager from '../../../../utils/BasketManager'
import Price from '../../../../utils/Price'
import PubSub from 'pubsub-js'

class BasketButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basket: BasketManager.getBasket(),
      total: BasketManager.calculateSubTotal()
    }
  }

  componentDidMount() {
    PubSub.subscribe(global.Broadcast.BasketUpdate, basket => {
      this.setState({
        total: BasketManager.calculateSubTotal(),
        basket: BasketManager.getBasket()
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _setColor() {
    let path = this.props.location.pathname
    
    return global.Colors.Primary
  }
  _renderBasketButton() {
    if (this.state.basket == null) {
      return null
    }
    return (
      <a
        style={this.props.style}
        className="btn btn--sm type--uppercase nav-btn"
        onClick={() => this.props.onBasketButtonPressed()}
      >
        <span className="btn__text" style={{ fontSize: '18px' }}>
          <i
            className="icon icon--lg icon-Shopping-Cart "
            style={{ color: this._setColor() }}
          />{' '}
          {Price.format(this.state.total, this.state.basket.venue.currency)}
        </span>
      </a>
    )
  }

  render() {
    return this._renderBasketButton()
  }
}

export default withRouter(BasketButton)
