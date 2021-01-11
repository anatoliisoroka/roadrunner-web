import React from 'react'
import { withRouter } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay'
import Select from 'react-select'
import OrderItem from '../customer/components/menu/OrderItem'
import AddCardModal from '../customer/components/account/AddCardModal'
import NewAddressModal from '../customer/components/address/NewAddressModal'

import General from '../../utils/General'
import Backend from '../../utils/Backend'
import Price from '../../utils/Price'
import DateTime from '../../utils/DateTime'
import TextFormat from '../../utils/TextFormat'
import BasketManager from '../../utils/BasketManager'
import DripHelper from '../../utils/DripHelper'
import AuthManager from '../../utils/AuthManager'
import LocationFormat from '../../utils/LocationFormat'
import ScriptCache from '../../utils/ScriptCache'
import SweetAlert from 'react-bootstrap-sweetalert'
import moment from 'moment'
class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: AuthManager.getCurrentUser(),
      basket: BasketManager.getBasket(),
      coupon: null,
      order: null,
      instructions: null,
      selectedType: null,
      showAddCardModal: false,
      showNewAddressModal: false,
      selectedDay: null,
      isLoading: false,
      pickerAddresses: null,
      showError: false,
      selectedTime: null,
      cutlery: false
    }
  }

  componentDidMount() {
    this._getNextDeliveryDay()
    this._setCardPicker()
    this._setLocations()
    this._getDeliveryDays()
    this._getTimes()
    this._loadJs()
    General.updateImageBackgrounds()
    General.updateParallax()
    General.closeActiveModal()
    General.updateModals()
    this._setCoupon()
    this._setSelectedArrivalMethod()
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  _setSelectedArrivalMethod() {
    let selectedType = JSON.parse(localStorage.getItem('arrival'))
    let { basket } = this.state
    if (selectedType == 'delivery') {
      selectedType = { value: 0, label: 'Delivery' }
    } else {
      selectedType = { value: 1, label: 'Collection' }
    }
    this.setState({ selectedType })
  }

  _setCoupon() {
    if (this.props.history.location.state.coupon != null) {
      this.setState({ coupon: this.props.history.location.state.coupon })
    }
  }

  _sendOrder(order) {
    this.setState({ isLoading: true })
    Backend.sendOrder(order)
      .then(order => {
        DripHelper.trackOrder(order)
        this.setState({ isLoading: false }, () => {
          BasketManager.clearBasket()
        })
        this._goTo(order)
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          showError: true,
          errorMessage: error.message
        })
      })
  }

  _isValid() {
    let isValid = true
    return isValid
  }

  _validateOrder() {
    if (!this._isValid()) {
      return
    }
    this._createOrder()
  }

  _createOrder() {
    let { selectedDay, selectedType } = this.state
    let isDelivery = selectedType.value == 0 ? true : false

    let order = BasketManager.createOrder(
      DateTime.getOrderTime(selectedDay),
      this.state.selectedPaymentMethod.value === -1 ? 'cash' : 'card',
      isDelivery,
      this.state.cutlery,
      this.state.instructions,
      this.state.selectedAddress,
      this.state.selectedPaymentMethod.value === -1
        ? null
        : this.state.selectedPaymentMethod.value,
      this.state.coupon,
      this.state.basket.venue
    )
    this._sendOrder(order)
  }

  _setLocations() {
    Backend.getLocations(this.state.basket.venue).then(locations => {
      this.setState({ locations: locations.results }, () => {
        this._setAddresses()
      })
    })
  }

  _goTo(order) {
    this.props.history.push({
      pathname: '/customer/order-confirmation',
      state: { order }
    })
  }

  _setCardPicker() {
    let results = []
    let { cards } = this.state.user
    // results.push({ label: 'Cash on Arrival', value: -1 })
    if (cards == null) {
      return results
    }
    cards.map(card => {
      results.push({
        label:
          card.brand.toUpperCase() +
          ' *' +
          card.last_four +
          '  ' +
          card.expiry_month +
          '/' +
          card.expiry_year,
        value: card.id,
        isDefault: card.is_default
      })
    })

    this.setState({ pickerCards: results })
  }

  _setAddresses() {
    let results = []
    let { locations } = this.state
    if (locations == null) {
      return
    }
    locations.map(address => {
      results.push({
        label: LocationFormat.fullAddress(address),
        value: address.id,
        isDisabled: !address.in_delivery_zone
      })
    })
    this.setState({ pickerAddresses: results })
  }

  _getAddress(pickerAddresses) {
    if (pickerAddresses == null) {
      return null
    }
    if (this.state.selectedAddress != null) {
      return this.state.selectedAddress
    }
    if (pickerAddresses.length <= 0) {
      return null
    }
    this.setState({ selectedAddress: pickerAddresses[0] })
    return pickerAddresses[0]
  }

  _setCard(pickerCards) {
    if (pickerCards == null) {
      return null
    }
    if (this.state.selectedPaymentMethod != null) {
      return this.state.selectedPaymentMethod
    }
    return pickerCards.map(card => {
      if (card.isDefault) {
        this.setState({ selectedPaymentMethod: card })
        return card
      }
    })
  }

  _setDeliveryAddress(pickerCards) {
    if (pickerCards == null) {
      return null
    }
    if (this.state.selectedPaymentMethod != null) {
      return this.state.selectedPaymentMethod
    }
    return pickerCards.map(card => {
      if (card.isDefault) {
        return card
      }
    })
  }

  _getNextDeliveryDay() {
    let { basket } = this.state
    let days = []
    let opens_at = ''
    let closes_at = ''
    basket.venue.opening_hours.map(opening => {
      let date = DateTime.getWeekValue(opening.day)
      let dayLabel = TextFormat.capitalizeFirst(opening.day)
      days.push({ value: date, label: dayLabel })
    })
    let dates = []
    days.map(day => {
      dates.push(day.value)
    })
    let earliestDate = moment.min(dates)
    let dayLabel = ""
    days.map(day => {
      if(day.value == earliestDate){
        dayLabel = day.label
      }
    })
    let selectedDay = { value: earliestDate, label: dayLabel }
    this.setState({ selectedDay }, () =>{
      this._getTimes()
    })
  }

  _getDeliveryDays() {
    let { basket, selectedDay } = this.state
    let days = []
    let opens_at = ''
    let closes_at = ''
    basket.venue.opening_hours.map(opening => {
      let date = DateTime.getWeekValue(opening.day)
      let dayLabel = TextFormat.capitalizeFirst(opening.day)
      days.push({ value: date, label: dayLabel })
    })
    this.setState({ deliveryDays: days })
  }

  _getTimes() {
    let { basket, selectedDay } = this.state
    let opens_at = ''
    let closes_at = ''
    if(!selectedDay){
      return
    }
    basket.venue.opening_hours.map(opening => {
      if (opening.day === selectedDay.label.toLowerCase()) {
        opens_at = opening.opens_at
        closes_at = opening.closes_at
      }
    })
    let times = []
    times = DateTime.quarterIntervals(selectedDay.label, opens_at, closes_at)
    return this.setState({ selectedTime: times[0], times })
  }

  _onAddressAdded() {
    AuthManager.refreshCurrentUser().then(user => {
      this.setState({ user, showNewAddressModal: false }, () =>
        this._setLocations()
      )
    })
  }

  _onCardAdded() {
    AuthManager.refreshCurrentUser().then(user => {
      this.setState({ user, showNewAddressModal: false }, () =>
        this._setCardPicker()
      )
    })
  }

  _updateSelectedType(selectedType) {
    if (selectedType.value == 0) {
      localStorage.setItem('arrival', JSON.stringify('delivery'))
    } else {
      localStorage.setItem('arrival', JSON.stringify('collection'))
    }
    this.setState({ selectedType })
  }

  _updateSelectedDay(selectedDay) {
    this.setState({ selectedDay }, () => this._getTimes())
  }

  _updateSelectedTime(selectedTime) {
    this.setState({ selectedTime })
  }

  _updateSelectedAddress(selectedAddress) {
    this.setState({ selectedAddress }, () =>
      this._getDeliveryFee(selectedAddress)
    )
  }

  _getDeliveryFee(location) {
    Backend.getDeliveryFee(this.state.basket.venue, location.value)
      .then(response => {
        let venue = { ...this.state.basket.venue }
        venue.delivery_fee = response.delivery_fee
        BasketManager.setVenue(venue)
        this.setState({ venue })
      })
      .catch(error => {
        alert(error.message)
      })
  }

  _updateSelectedPaymentMethod(selectedPaymentMethod) {
    this.setState({ selectedPaymentMethod })
  }

  _renderArrivalContainer() {
    if (this.state.selectedType == null) {
      return null
    }
    if (this.state.selectedType.value === 0) {
      return this._renderDeliveryContainer()
    }
    return this._renderCollectionContainer()
  }

  _renderDateTimePickers() {
    return (
      <>
        <div className="col-md-12">
          <Select
            value={this.state.selectedDay}
            onChange={value => this._updateSelectedDay(value)}
            options={this.state.deliveryDays}
          />
        </div>
      </>
    )
  }

  _renderDeliveryContainer() {
    return (
      <div id="delivery">
        <h4>Delivery Details</h4>
        <div className="row">
          <div className="col-md-12">
            <label>Delivery Time:</label>
            <div className="row">{this._renderDateTimePickers()}</div>
          </div>
          <div className="col-md-12">
            <label>Delivery Address:</label>
            <Select
              value={this._getAddress(this.state.pickerAddresses)}
              onChange={value => this._updateSelectedAddress(value)}
              options={this.state.pickerAddresses}
            />
          </div>
          <div className="col-md-12">
            <button
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
                marginTop: 10
              }}
              type="button"
              onClick={() => this.setState({ showNewAddressModal: true })}
              className="btn btn--secondary type--uppercase"
            >
              Add New Address
            </button>
          </div>
        </div>
        {/*end of row*/}
      </div>
    )
  }

  _renderCollectionContainer() {
    return (
      <div id="collection">
        <h4>Collection Details</h4>
        <div className="row">
          <div className="col-md-12">
            <label>Collection Time:</label>
            <div className="row">{this._renderDateTimePickers()}</div>
          </div>
        </div>
        {/*end of row*/}
      </div>
    )
  }

  _renderArrivalTitle() {
    let { basket } = this.state
    let title = 'Delivery or Collection:'
    if (basket.venue.delivery === true && basket.venue.collection === false) {
      title = 'Delivery or Collection: (Delivery only)'
    }
    if (basket.venue.delivery === false && basket.venue.collection === true) {
      title = 'Delivery or Collection: (Collection only)'
    }
    return <label>{title}</label>
  }

  _renderArrivalOptions() {
    let { basket } = this.state
    if (basket.venue.delivery === true && basket.venue.collection === false) {
      return [{ value: 0, label: 'Delivery' }]
    }
    if (basket.venue.delivery === false && basket.venue.collection === true) {
      return [{ value: 1, label: 'Collection' }]
    }
    return [{ value: 0, label: 'Delivery' }, { value: 1, label: 'Collection' }]
  }

  _renderBasketItems() {
    let { basket } = this.state
    if (basket.items == null) {
      this.props.history.push('/')
    }
    return basket.items.map(item => {
      return <OrderItem item={item} currency={basket.venue.currency} />
    })
  }

  _renderDeliveryFee() {
    let { basket, selectedType } = this.state
    if (selectedType != null && selectedType.value != 0) {
      return null
    }
    return (
      <div className="row">
        <div className="col-6">
          <span className="h5">Delivery:</span>
        </div>
        <div className="col-6 text-right">
          <span>
            {Price.format(basket.venue.delivery_fee, basket.venue.currency)}
          </span>
        </div>
      </div>
    )
  }

  _renderTotal() {
    let { coupon, basket, selectedType } = this.state
    if (!selectedType) {
      return null
    }
    let isDelivery = this.state.selectedType.value == 0 ? true : false
    let total = BasketManager.getTotalPrice(isDelivery, coupon)
    return Price.format(total, basket.venue.currency)
  }

  render() {
    return (
      <LoadingOverlay
        active={this.state.isLoading}
        spinner
        text="Please wait while we send your order to the kitchen!"
      >
        <div className="main-container">
          <section className="p-b-0  bg--secondary">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>Checkout</h2>
                  <hr />
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
          <section className="bg--secondary">
            <div className="container">
              {/*end of row*/}
              <div className="row">
                <div className="col-md-7">
                  <div
                    style={{
                      borderRadius: 6,
                      backgroundColor: 'white',
                      paddingTop: 40,
                      paddingBottom: 60,
                      border: '0.5px solid #ECECEC'
                    }}
                  >
                    {/*end of row*/}
                    <div className="row justify-content-center">
                      <div className="col-md-12 col-lg-8">
                        <div className="row m-b-40">
                          <div className="col-md-12"></div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-12 col-lg-8">
                        <div className="row m-b-40">
                          <div className="col-md-12">
                            {this._renderArrivalTitle()}
                            <Select
                              value={this.state.selectedType}
                              onChange={value =>
                                this._updateSelectedType(value)
                              }
                              options={this._renderArrivalOptions()}
                            />
                          </div>
                        </div>
                        {this._renderArrivalContainer()}
                      </div>
                    </div>
                    <div className="row justify-content-center mt--2">
                      <div className="col-md-12 col-lg-8">
                        <div>
                          <div className="row">
                            <div className="col-md-12">
                              <label>
                                Additional instructions for the restaurant
                                (optional):
                              </label>
                              <textarea
                                rows={4}
                                name="instructions"
                                placeholder="Apartment 42, door code ***, etc."
                                value={this.state.instructions}
                                onChange={event =>
                                  this.setState({
                                    instructions: event.target.value
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center mt--2">
                      <div className="col-md-12 col-lg-8">
                        <h4>Billing Details</h4>
                        <div className="row">
                          <div className="col-md-12">
                            <label>Payment Method</label>
                            <Select
                              value={this._setCard(this.state.pickerCards)}
                              onChange={value =>
                                this._updateSelectedPaymentMethod(value)
                              }
                              options={this.state.pickerCards}
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            style={{
                              paddingLeft: 20,
                              paddingRight: 20,
                              width: '100%',
                              marginTop: 10
                            }}
                            type="button"
                            onClick={() =>
                              this.setState({ showAddCardModal: true })
                            }
                            className="btn btn--secondary type--uppercase"
                          >
                            Add New Card
                          </button>
                        </div>
                        {/*end of row*/}
                      </div>
                    </div>

                    {/*end of row*/}
                    <div className="row justify-content-center">
                      <div className="col-md-12 col-lg-8 text-right text-center-xs">
                        <button
                          type="button"
                          onClick={() => this._validateOrder()}
                          className="btn btn--primary type--uppercase"
                          style={{
                            marginTop: '50px',
                            width: '100%'
                          }}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                    {/*end of row*/}
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="boxed boxed--border cart-total">
                        {this._renderBasketItems()}
                        <hr />
                        {this._renderDeliveryFee()}
                        <div className="row">
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
                  <div className="row justify-content-end">
                    <div className="col-lg-6 text-right text-center-xs">
                      <a
                        onClick={() =>
                          this.props.history.push('/customer/basket')
                        }
                        className="btn btn--secondary"
                      >
                        Revise your order
                      </a>
                    </div>
                  </div>
                  {/*end of row*/}
                </div>
              </div>
              {/*end cart form*/}
            </div>
            {/*end of container*/}
          </section>
          <AddCardModal
            show={this.state.showAddCardModal}
            onCardAdded={() =>
              this.setState({ showAddCardModal: false }, () => {
                this._onCardAdded()
              })
            }
            onHide={() => this.setState({ showAddCardModal: false })}
          />
          <NewAddressModal
            show={this.state.showNewAddressModal}
            onAddressAdded={() => this._onAddressAdded()}
            onHide={() => this.setState({ showNewAddressModal: false })}
          />
        </div>
        <SweetAlert
          show={this.state.showError}
          error
          title="Oops!"
          onConfirm={() => this.setState({ showError: false })}
        >
          {this.state.errorMessage}
        </SweetAlert>
      </LoadingOverlay>
    )
  }
}
export default withRouter(Checkout)
