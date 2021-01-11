import React from 'react'
import Modal from 'react-bootstrap/Modal'

import OrderItem from '../../../customer/components/menu/OrderItem'

import Price from '../../../../utils/Price'
import LocationFormat from '../../../../utils/LocationFormat'
import moment from 'moment'

export default class orderDetailsModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderDetails: props.orderDetails,
      show: props.show,
      price: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _renderArrivalTitle() {
    let { orderDetails } = this.state
    if (orderDetails.data.location == null) {
      return (
        <small>
          Collection from{' '}
          {LocationFormat.fullAddress(orderDetails.data.venue_location)}
        </small>
      )
    }
    return (
      <small>Delivered to {orderDetails.data.location.address_line_1}</small>
    )
  }

  _renderOrderItems(orderDetails) {
    return orderDetails.data.items.map(item => {
      return <OrderItem item={item} currency={orderDetails.currency} />
    })
  }

  _renderDeliveryFee(orderDetails) {
    if (orderDetails.data.location == null) {
      return null
    }
    return (
      <>
        <div className="col-6">
          <span className="h5">Delivery Fee:</span>
        </div>
        <div className="col-6 text-right">
          <span>
            {Price.format(
              orderDetails.data.delivery_fee,
              orderDetails.currency
            )}
          </span>
        </div>
      </>
    )
  }

  _renderInstructions() {
    let { orderDetails } = this.state
    if (orderDetails.instructions == null) {
      return <span className="item-details">No Instructions Provided</span>
    }
    return <span className="item-details">{orderDetails.instructions}</span>
  }

  _renderCutlery() {
    let cutlery = 'No'
    let { orderDetails } = this.state
    if (orderDetails.cutlery === true) {
      cutlery = 'Yes'
    }
    return <span className="item-details">Cutlery: {cutlery}</span>
  }

  _renderPaymentMethod(orderDetails) {
    let { card } = orderDetails.data
    let paymentType = ''
    if (card == null) {
      paymentType = 'CASH'
    } else {
      paymentType = card.brand.toUpperCase() + ' *' + card.last_four
    }
    return (
      <div className="row">
        <div className="col-6">
          <span className="h5">Paid with:</span>
        </div>
        <div className="col-6 text-right">
          <span className="h5">{paymentType}</span>
        </div>
      </div>
    )
  }

  _renderCouponType(coupon) {
    if (coupon == null) {
      return null
    }
    if (coupon.type === 'percentage') {
      let value = coupon.value * 100
      return value + '% Off'
    }
    return Price.format(coupon.value, this.state.orderDetails.currency)
  }

  _renderCoupon(orderDetails) {
    if (orderDetails.data.coupon == null) {
      return null
    }
    return (
      <>
        <div className="col-6">
          <span className="h5">Coupon:</span>
        </div>
        <div className="col-6 text-right">
          <span>{this._renderCouponType(orderDetails.data.coupon)}</span>
        </div>
      </>
    )
  }

  render() {
    let { show, orderDetails } = this.state
    if (orderDetails == null) {
      return null
    }
    return (
      <Modal show={show} onHide={() => this.props.onHide()}>
        <Modal.Header closeButton>
          <div style={{ margin: 10 }}>
            <h3 className="m-b-0">Order Details</h3>
            {this._renderArrivalTitle()}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="feature__body">
            <div className="col-md-12">
              <div className="boxed boxed--borderDetails cart-total">
                <h4>
                  <em>
                    {orderDetails.venue.title} -{' '}
                    {moment(orderDetails.created_at).format(
                      'Do MMMM YYYY, h:mm:ss a'
                    )}
                  </em>
                </h4>
                <div style={{ marginBottom: 20 }}>
                  {this._renderOrderItems(orderDetails)}
                  <div className="row">
                    <div className="col-6">{this._renderInstructions()}</div>
                  </div>
                  <div className="row">
                    <div className="col-6">{this._renderCutlery()}</div>
                  </div>
                </div>
                <div className="row">
                  {this._renderDeliveryFee(orderDetails)}
                  {this._renderCoupon(orderDetails)}
                </div>
                <hr style={{ borderColor: global.Colors.Primary }} />
                <div className="row">
                  <div className="col-6">
                    <span className="h5">Total:</span>
                  </div>
                  <div className="col-6 text-right">
                    <span className="h5">
                      {Price.format(
                        orderDetails.total_price,
                        orderDetails.currency
                      )}
                    </span>
                  </div>
                </div>
                {this._renderPaymentMethod(orderDetails)}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
