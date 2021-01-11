import React from 'react'
import TextField from '../../../shared/components/common/TextField'

import OrderListItem from '../../../customer/components/order/OrderListItem'
import LazyLoadingList from '../../../shared/components/common/LazyLoadingList'

import OrderDetailsModal from '../../../shared/components/modals/OrderDetailsModal'

import Backend from '../../../../utils/Backend'
import AuthManager from '../../../../utils/AuthManager'

export default class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      showOrderDetailsModal: false,
      selectedOrder: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _renderOrderHistory() {
    return (
      <LazyLoadingList
        endpoint={global.Api.Orders}
        emptyStateMessage="You have not placed an order yet."
        renderItem={order => {
          return (
            <OrderListItem
              order={order}
              onDetailsPressed={() => this._getOrderDetails(order)}
            />
          )
        }}
      />
    )
  }

  _getOrderDetails(order) {
    this.setState({ isLoading: true })
    Backend.getOrderDetails(order)
      .then(orderDetails => {
        this.setState({
          selectedOrder: orderDetails,
          showOrderDetailsModal: true,
          isLoading: false
        })
      })
      .catch(error => {
        alert('ERROR', error)
        this.setState({ isLoading: false })
      })
  }

  _setActive() {
    if (this.props.active) {
      return 'account-tab'
    }
    return 'hidden account-tab'
  }

  render() {
    return (
      <div id="account-history" className={this._setActive()}>
        <h4>Order History</h4>
        {this._renderOrderHistory()}
        <OrderDetailsModal
          show={this.state.showOrderDetailsModal}
          orderDetails={this.state.selectedOrder}
          onHide={() => this.setState({ showOrderDetailsModal: false })}
        />
      </div>
    )
  }
}
