import React from 'react'
import Modal from 'react-bootstrap/Modal'

import LocationInput from '../common/LocationInput'
import Backend from '../../../../utils/Backend'

export default class NewAddressModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: props.show,
      location: null,
      validationMessage: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _isValid() {
    let isValid = true
    if (this.state.location == null || this.state.location == '') {
      this.setState({ validationMessage: 'Please enter a valid address' })
      isValid = false
    }
    return isValid
  }

  _addNewAddress() {
    if (!this._isValid()) {
      return
    }
    let { location } = this.state
    this.setState({ isLoading: true })
    Backend.saveAddress(location)
      .then(response => {
        this.props.onAddressAdded()
        this.setState({ isLoading: false })
      })
      .catch(error => {
        this.setState({ isLoading: false })
      })
  }

  _resetModal() {
    this.setState({ location: null })
  }

  _onModalHide() {
    this._resetModal()
    this.props.onHide()
  }

  render() {
    let { show } = this.state
    return (
      <Modal show={show} onHide={() => this._onModalHide()}>
        <Modal.Header closeButton>
          <h3 className="m-b-0">Add New Address</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="feature__body">
            <div className="row" id="addNewCard">
              <div className="col-md-12 m-t-20">
                <label style={{ paddingLeft: 10, marginBottom: 10 }}>
                  Address:
                </label>
                <LocationInput
                  location={this.state.location}
                  onUpdated={location => {
                    this.setState({
                      location: location
                    })
                  }}
                />
                {this.state.validationMessage != null && (
                  <label style={styles.validationText}>
                    {this.state.validationMessage}
                  </label>
                )}
              </div>
            </div>
            <button
              className="btn btn--primary m-t-10"
              style={{ width: '100%', marginTop: 40 }}
              onClick={() => this._addNewAddress()}
            >
              Save New Address
            </button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

const styles = {
  validationText: { color: 'red' }
}
