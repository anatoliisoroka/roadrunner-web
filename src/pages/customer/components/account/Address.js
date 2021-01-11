import React from 'react'
import TextField from '../../../shared/components/common/TextField'
import AddressListItem from '../../../customer/components/address/AddressListItem'
import NewAddressModal from '../../../customer/components/address/NewAddressModal'
import ConfirmationModal from '../../../shared/components/modals/ConfirmationModal'

import Backend from '../../../../utils/Backend'
import AuthManager from '../../../../utils/AuthManager'
import LocationFormat from '../../../../utils/LocationFormat'
import SweetAlert from 'react-bootstrap-sweetalert'

export default class Address extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      showNewAddressModal: false,
      showConfirmationModal: false,
      showError: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _showDeleteAlert(location) {
    let title = 'Are you sure you want to delete this address?'
    this.setState({
      selectedAddress: location,
      confirmationModalItem: LocationFormat.fullAddress(location),
      showConfirmationModal: true,
      confirmationModalType: 'prompt',
      confirmationModalTitle: title
    })
  }

  _showConfirmationAlert(location) {
    let title = 'Are you sure you want to delete this address?'
    this.setState({
      selectedAddress: location,
      confirmationModalItem: LocationFormat.fullAddress(location),
      showConfirmationModal: true,
      confirmationModalType: 'prompt',
      confirmationModalTitle: title
    })
  }

  _deleteAddress() {
    let { selectedAddress } = this.state
    this.setState({ isLoading: true })
    Backend.deleteAddress(selectedAddress)
      .then(response => {
        this.props.onUserUpdated()
        this.setState({ showConfirmationModal: false, isLoading: false })
      })
      .catch(error => {
        this.setState({
          showConfirmationModal: false,
          isLoading: false,
          showError: true,
          errorMessage: error.message
        })
      })
  }

  _onAddressAdded() {
    this.props.onUserUpdated()
    this.setState({ showNewAddressModal: false, isLoading: false })
  }

  _confirmModalActionPressed(item) {
    this._deleteAddress(item)
  }

  _renderAddresses() {
    let { user } = this.state

    return user.locations.map(location => {
      return (
        <AddressListItem
          location={location}
          onDeletePressed={() => this._showDeleteAlert(location)}
        />
      )
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
      <div id="account-addresses" className={this._setActive()}>
        <h4>Delivery Addresses</h4>
        {this._renderAddresses()}
        <hr />
        <button
          type="button"
          className="btn btn--primary type--uppercase"
          style={{ width: '100%' }}
          onClick={() => this.setState({ showNewAddressModal: true })}
        >
          Add New Address
        </button>
        <NewAddressModal
          show={this.state.showNewAddressModal}
          onAddressAdded={() => this._onAddressAdded()}
          onHide={() => this.setState({ showNewAddressModal: false })}
        />
        <ConfirmationModal
          item={this.state.confirmationModalItem}
          show={this.state.showConfirmationModal}
          type={this.state.confirmationModalType}
          title={this.state.confirmationModalTitle}
          onConfirmPressed={() => this._confirmModalActionPressed()}
          onHide={() => this.setState({ showConfirmationModal: false })}
        />

        <SweetAlert
          show={this.state.showError}
          error
          title="Oops!"
          onConfirm={() => this.setState({ showError: false })}
        >
          {this.state.errorMessage}
        </SweetAlert>
      </div>
    )
  }
}
