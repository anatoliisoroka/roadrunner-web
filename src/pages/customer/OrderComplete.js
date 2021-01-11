import React from 'react'
import Lottie from 'react-lottie'
import { withRouter } from 'react-router-dom'
import animationData from '../../assets/animations/rider.json'
import OrderItem from '../customer/components/menu/OrderItem'
import ConfirmationModal from '../shared/components/modals/ConfirmationModal'
import Backend from '../../utils/Backend'
import Price from '../../utils/Price'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'
import PubSub from 'pubsub-js'
class OrderComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = { order: this.props.history.location.state.order }
  }

  componentDidMount() {
    this._loadJs()
    General.updateModals()
    PubSub.publish(global.Broadcast.BasketUpdate, 'update')
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  _cancelOrder() {
    this.setState({ isLoading: true })
    Backend.cancelOrder(this.state.order)
      .then(response => {
        this.setState({ isLoading: false, showCancelOrderModal: false }, () =>
          this.setState({ showSuccessCancelOrderModal: true })
        )
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          showCancelOrderModal: false,
          showError: error.message
        })
      })
  }

  _renderOrderItems() {
    let { order } = this.state
    return order.data.items.map(item => {
      return <OrderItem item={item} currency={order.currency} />
    })
  }

  _renderDeliveryFee(order) {
    if (order.data.delivery_fee == null) {
      return null
    }
    return (
      <div className="row">
        <div className="col-6">
          <span className="h5">Delivery:</span>
        </div>
        <div className="col-6 text-right">
          <span>{Price.format(order.data.delivery_fee, order.currency)}</span>
        </div>
      </div>
    )
  }

  _renderCancelError() {
    if (this.state.showError == null) {
      return null
    }
    return (
      <div className="row justify-content-end" style={{ marginBottom: '50px' }}>
        {this.state.showError}
      </div>
    )
  }

  _onConfirmPressed() {
    window.location = '/'
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    let { order } = this.state
    return (
      <div className="main-container">
        <section
          className="p-b-0 bg--secondary"
          style={{ paddingTop: '50px', minHeight: '90vh' }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>Your order has been sent!</h2>
                <h4 style={{ paddingRight: '50px' }}>
                  You will be notified when your order is accepted.
                </h4>
                <Lottie options={defaultOptions} height={350} width={350} />
              </div>
              <div className="col-md-6">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <br />
                      <br />
                      <br />
                      <h4>Order Summary</h4>
                      <div className="boxed boxed--border cart-total">
                        {this._renderOrderItems()}
                        {this._renderDeliveryFee(order)}
                        <hr />
                        <div className="row">
                          <div className="col-6">
                            <span className="h5">Total:</span>
                          </div>
                          <div className="col-6 text-right">
                            <span className="h5">
                              {Price.format(order.total_price, order.currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end of row*/}
                  {this._renderCancelError()}
                  <div
                    className="row justify-content-end"
                    style={{ marginBottom: '50px' }}
                  >
                    <div className="col-lg-4 col-sm-12 text-right text-center-xs">
                      <a
                        onClick={() =>
                          this.setState({ showCancelOrderModal: true })
                        }
                        className="btn btn--secondary"
                        style={{
                          backgroundColor: global.Colors.Secondary,
                          color: 'white'
                        }}
                      >
                        Cancel Order
                      </a>
                    </div>
                  </div>
                  {/*end of row*/}
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </div>
        </section>
        <ConfirmationModal
          show={this.state.showCancelOrderModal}
          item="Are you sure want to cancel this order?"
          type="prompt"
          title={'Cancel Order'}
          actionTitle={'Cancel Order'}
          onConfirmPressed={() => this._cancelOrder()}
          onHide={() => this.setState({ showCancelOrderModal: false })}
        />
        <ConfirmationModal
          show={this.state.showSuccessCancelOrderModal}
          title={'Order Cancelled Successfully'}
          item="You will be issued a refund soon."
          onActionPressed={() => this._onConfirmPressed()}
          onHide={() => this.setState({ showSuccessCancelOrderModal: false })}
        />
      </div>
    )
  }
}
export default withRouter(OrderComplete)
