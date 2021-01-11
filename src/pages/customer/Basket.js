import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import TextField from '../shared/components/common/TextField'
import LocationModal from '../shared/components/modals/LocationModal'
import Backend from '../../utils/Backend'
import Price from '../../utils/Price'
import BasketManager from '../../utils/BasketManager'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'
import PubSub from 'pubsub-js'
import AuthManager from '../../utils/AuthManager'
class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basket: BasketManager.getBasket(),
      coupon: null,
      couponCode: null,
      couponError: null,
      showLocationModal: false
    }
  }

  componentDidMount() {
    localStorage.setItem('arrival', JSON.stringify('delivery'))
    this._loadJs()
    this._getDeliveryFee()
    this._getSubTotal()
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  _goToCheckout() {
    let { basket, coupon } = this.state
    let total = BasketManager.calculateSubTotal()
    if (total < basket.venue.minimum_order_amount) {
      this.setState({ errorMessage: 'Minimum ordered has not been reached' })
      return
    }
    if (AuthManager.currentUser == null) {
      this.setState({ errorMessage: 'Please login to continue' })
    }
    if (basket.items.length <= 0) {
      this.setState({ errorMessage: 'Basket is empty' })
      return
    }
    this.props.history.push({
      pathname: '/customer/checkout',
      state: { coupon: this.state.coupon }
    })
  }

  _validateCode() {
    this.setState({ couponError: null })
    if (this.state.couponCode == null || this.state.couponCode == '') {
      this.setState({ couponError: 'Enter a valid code' })
      return
    }
    let { couponCode, basket } = this.state
    Backend.validateCode(couponCode, basket.venue)
      .then(coupon => {
        if (coupon.results.length <= 0) {
          this.setState({ couponError: 'This is not a valid code' })
        } else {
          this.setState({ coupon: coupon.results[0] })
        }
      })
      .catch(error => {
        this.setState({ couponError: error.message })
      })
  }

  _checkIfBasketsEmpty() {
    let basket = BasketManager.getBasket()
    if (basket.items.length > 0) {
      this._getSubTotal()
      return
    }
  }

  _updateBasket(index, quantity) {
    BasketManager.updateItemQuantity(index, quantity)
    PubSub.publish(global.Broadcast.BasketUpdate, 'update')
    if (quantity == 0) {
      this._checkIfBasketsEmpty()
    }
    this._getSubTotal()
  }

  _renderCoupon() {
    let { coupon } = this.state
    if (coupon == null) {
      return null
    }
    return (
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-6">
          <span className="h5">Coupon:</span>
        </div>
        <div className="col-6 text-right">
          <span className="h5">{this._renderCouponTotal(coupon)}</span>
        </div>
      </div>
    )
  }

  _renderCouponTotal(coupon) {
    let couponValue = ''
    if (coupon.type == 'currency') {
      couponValue = coupon.value
    } else {
      couponValue = 100 * coupon.value
    }
    return coupon.code + ' ' + couponValue
  }

  _getDeliveryFee() {
    let location = JSON.parse(localStorage.getItem('location'))
    if (!location) {
      this.setState({ showLocationModal: true })
      return
    }
    Backend.getDeliveryFee(
      this.state.basket.venue,
      null,
      location.longitude,
      location.latitude
    )
      .then(response => {
        let venue = { ...this.state.basket.venue }
        venue.delivery_fee = response.delivery_fee
        BasketManager.setVenue(venue)
        this.setState({ venue })
      })
      .catch(error => {
        alert(error.message)
        localStorage.setItem('location', JSON.stringify(null))
        this.setState({ showLocationModal: true })
      })
  }

  _getSubTotal() {
    let subTotal = BasketManager.calculateSubTotal()
    this.setState({ subTotal })
  }

  _renderTotal() {
    let { coupon, basket } = this.state
    let selectedType = JSON.parse(localStorage.getItem('arrival'))
    let total = BasketManager.getTotalPrice(
      selectedType == 'delivery' ? true : false,
      coupon
    )
    return Price.format(total, basket.venue.currency)
  }

  _renderEmptyBasket() {
    return (
      <div className="col-12 text-center">
        <strong>Basket Empty</strong>
      </div>
    )
  }

  _renderBasket() {
    let { basket } = this.state
    if (basket.items.length <= 0) {
      return this._renderEmptyBasket()
    }
    return basket.items.map((item, index) => {
      return this._renderBasketItem(item, index)
    })
  }

  _renderItemOptionsItems(item) {
    if (item.option_groups == null) {
      return null
    }

    return item.option_groups.map(option_group => {
      return option_group.options.map((option, index, arr) => {
        return option.title + ' '
      })
    })
  }

  _renderItemPrice(item) {
    let optionPrice = 0
    item.option_groups.map(option_group => {
      option_group.options.map(option => {
        optionPrice = option.price * option.quantity
      })
    })
    return Price.format(
      (item.price + optionPrice) * item.quantity,
      this.state.basket.venue.currency
    )
  }

  _renderBasketItem(item, index) {
    let { basket } = this.state
    return (
      <div className="row cartItem">
        <div className="col-6">
          <span>
            {item.quantity} x {item.title}
          </span>
          <br />
          <span className="item-details">
            {this._renderItemOptionsItems(item)}
          </span>
        </div>
        <div className="col-6 text-right">
          <span>{this._renderItemPrice(item)}</span>
          <div className="quantity-control">
            <button
              className="btn btn--primary quantity-button"
              type="button"
              onClick={() => this._updateBasket(index, item.quantity - 1)}
            >
              -
            </button>
            <input
              className="quantity-input"
              disabled={true}
              value={item.quantity}
            />
            <button
              className="btn btn--primary quantity-button"
              type="button"
              onClick={() => this._updateBasket(index, item.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }

  _renderValidationMessage() {
    if (this.state.errorMessage == null) {
      return null
    }
    return (
      <div className="row justify-content-end">
        <div className="col-lg-6 text-right text-center-xs">
          <span style={{ color: 'red' }}>{this.state.errorMessage}</span>
        </div>
      </div>
    )
  }

  _renderDelivery() {
    let selectedType = JSON.parse(localStorage.getItem('arrival'))
    let { basket } = this.state
    if (selectedType != 'delivery') {
      return null
    }
    return (
      <>
        <div className="col-6">
          <span className="h5">Delivery:</span>
        </div>
        <div className="col-6 text-right">
          <span>
            {Price.format(basket.venue.delivery_fee, basket.venue.currency)}
          </span>
        </div>
      </>
    )
  }

  render() {
    let { basket, coupon } = this.state
    if (basket == null) {
      return null
    }
    return (
      <div
        className="main-container"
        style={{ backgroundColor: '#fafafa' }}
        ref={divElement => {
          this.divElement = divElement
        }}
      >
        <section className="p-b-0 bg--secondary">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Review Your Order</h2>
                <span>
                  Minimum delivery amount:{' '}
                  <strong>
                    {Price.format(
                      basket.venue.minimum_order_amount,
                      basket.venue.currency
                    )}
                  </strong>
                </span>
                <hr />
              </div>
            </div>
            {/*end of row*/}
          </div>
          {/*end of container*/}
        </section>
        <section className="bg--secondary">
          <div className="container">
            <form className="cart-form" action="checkout.html">
              {/*end of row*/}
              <div className="row mt--2">
                <div className="col-md-12">
                  <div className="boxed boxed--border cart-total">
                    {this._renderBasket()}
                    <div className="row">
                      <div className="col-6">
                        <span className="h5">Basket Subtotal:</span>
                      </div>
                      <div className="col-6 text-right">
                        <span>
                          {Price.format(
                            this.state.subTotal,
                            basket.venue.currency
                          )}
                        </span>
                      </div>
                      {this._renderDelivery()}
                    </div>
                    <hr />
                    <div className="row m-t-20">
                      <div className="col-6">
                        <span style={{ marginTop: 20 }} className="h5">
                          Discount Code (if applicable)
                        </span>
                      </div>
                      <div className="col-6 text-right form-horizontal">
                        <TextField
                          style={{ marginTop: 8 }}
                          value={this.state.couponCode}
                          onChangeText={value =>
                            this.setState({ couponCode: value })
                          }
                        />
                        <button
                          style={{ width: '20%', marginLeft: 20 }}
                          type="button"
                          className="btn btn--primary"
                          onClick={() => this._validateCode()}
                        >
                          Apply
                        </button>
                      </div>
                      {this.state.couponError != null && (
                        <div className="offset-6 col-6 text-right form-horizontal">
                          <span style={{ marginTop: 20, color: 'red' }}>
                            {this.state.couponError}
                          </span>
                        </div>
                      )}
                    </div>
                    {this._renderCoupon()}
                    <div className="row" style={{ marginTop: 50 }}>
                      <div className="col-6">
                        <span className="h5">Total:</span>
                      </div>
                      <div className="col-6 text-right">
                        <span className="h5">{this._renderTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end of row*/}
              {this._renderValidationMessage()}
              <div className="row justify-content-end">
                <div className="col-lg-2 text-right text-center-xs">
                  <button
                    style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}
                    type="button"
                    className="btn btn--primary"
                    onClick={() => this._goToCheckout()}
                  >
                    Proceed To Checkout »
                  </button>
                </div>
              </div>
              {/*end of row*/}
            </form>
            {/*end cart form*/}
          </div>
          {/*end of container*/}
        </section>
        <LocationModal
          show={this.state.showLocationModal}
          onHide={() => this.setState({ showLocationModal: false })}
          onLocationUpdated={location =>
            this.setState({ showLocationModal: false }, () => {
              this._getDeliveryFee()
            })
          }
        />
      </div>
    )
  }
}
export default withRouter(Basket)
