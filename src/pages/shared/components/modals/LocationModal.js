import React from 'react'
import Modal from 'react-bootstrap/Modal'

import CurrentLocation from '../../../../utils/CurrentLocation'
import DripHelper from '../../../../utils/DripHelper'
import LocationInput from '../../../customer/components/common/LocationInput'

export default class LocationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: props.show
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _onModalHide() {
    this.props.onHide()
  }

  _renderActions() {
    let { item } = this.state
    if (this.props.type == 'prompt') {
      return (
        <>
          <button
            className="btn btn--secondary type--uppercase m-t-20"
            style={{ paddingLeft: 20, paddingRight: 20 }}
            onClick={() => this.props.onConfirmPressed(item)}
            type="button"
          >
            {this.props.actionTitle}
          </button>
          <button
            className="btn btn--secondary type--uppercase m-t-20"
            style={{ paddingLeft: 20, paddingRight: 20 }}
            onClick={() => this._onModalHide()}
            type="button"
          >
            Close
          </button>
        </>
      )
    }
    return (
      <button
        className="btn btn--secondary type--uppercase m-t-20"
        style={{ paddingLeft: 20, paddingRight: 20 }}
        onClick={() => this.props.onActionPressed()}
        type="button"
      >
        Ok
      </button>
    )
  }

  _getCurrentLocation() {
    this.setState({ locationLoading: true, locationValidation: null })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this._showPosition(position)
      })
    } else {
      // Geolocation is not supported by this browser
      this.setState({ locationLoading: false })
    }
  }

  _showPosition(position) {
    CurrentLocation.getLocation(position).then(location => {
      this.setState({ location, locationLoading: false })
    })
  }

  _renderLocationValidation() {
    if (this.state.locationValidation == null) {
      return null
    }
    return this.state.locationValidation
  }

  _renderLocationIcon() {
    if (this.state.locationLoading) {
      return <i class="fa fa-spinner fa-pulse"></i>
    }
    return <i className="fa fa-map-marker" />
  }

  _onLocationUpdated(location) {
    this.setState({
      location: location
    }, () => {
      localStorage.setItem('location', JSON.stringify(location))
      DripHelper.trackUserLocation(location)
    })
  }

  render() {
    let { show } = this.state
    return (
      <Modal show={show} onHide={() => this._onModalHide()}>
        <Modal.Header>
          <h3 className="m-b-0">Enter Address</h3>
        </Modal.Header>
        <Modal.Body>
          <div
            className="bg--white text-left"
            style={{
              borderRadius: 6,
              background: 'rgba(255,255,255,.4)',
              paddingTop: 5,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 30
            }}
          >
            <form className="form--horizontal row m-0">
              <div className="col-md-12">
                <span
                  style={{
                    color: global.Colors.Secondary,
                    marginLeft: 10
                  }}
                >
                  {this._renderLocationValidation()}
                </span>
              </div>
              <div className="col-md-12 searchLocation">
                <LocationInput
                  style={{ height: 40, color: 'black' }}
                  location={this.state.location}
                  onUpdated={location => this._onLocationUpdated(location)}
                />
                <a onClick={() => this._getCurrentLocation()}>
                  {this._renderLocationIcon()}
                </a>
              </div>


            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <div className="col-md-12" >
          <a
            onClick={() => {
              this.props.onLocationUpdated()
            }}
            className="btn btn--primary type--uppercase search-btn"
            style={{ width: '100%', color: 'white' }}
          >
            Search
          </a>
        </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

const styles = {
  validationText: { color: 'red' }
}
