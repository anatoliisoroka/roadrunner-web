import React, { Component } from 'react'
import ReactGoogleMapLoader from 'react-google-maps-loader'
import ReactGooglePlacesSuggest from 'react-google-places-suggest'

import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()

export default class LocationInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      value: this._getValue(props.location)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
      value: this._getValue(nextProps.location)
    })
  }

  _getValue(location) {
    if (location) {
      if (location.line_1) {
        return location.line_1
      } else if (location.state && location.country) {
        return `${location.state}, ${location.country}`
      }
    }
    return ''
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value })
  }

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    this.setState(
      {
        search: '',
        value: geocodedPrediction.formatted_address
      },
      () => {
        this._updateLocation(geocodedPrediction)
      }
    )
  }

  _updateLocation(details) {
    let data = {}
    if (details.geometry && details.geometry.location) {
      const location = details.geometry.location
      data['longitude'] = location.lng()
      data['latitude'] = location.lat()
    }

    data['line_1'] = details.formatted_address
    details.address_components.forEach(function(address_component) {
      var type = address_component.types[0]
      if (type === 'country') {
        data['country'] = address_component.long_name
        data['country_short'] = address_component.short_name
      }
      if (type === 'locality' || type === 'postal_town') {
        data['city'] = address_component.long_name
      } else if (type === 'administrative_area_level_1') {
        data['state'] = address_component.long_name
      }
    })
    this.props.onUpdated(data)
  }

  handleNoResult = () => {}

  handleStatusUpdate = status => {}

  render() {
    const { search, value } = this.state
    return (
      <ReactGoogleMapLoader
        params={{
          key: env.REACT_APP_GMAPS_KEY,
          libraries: 'places,geocode'
        }}
        render={googleMaps =>
          googleMaps && (
            <ReactGooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: search,
                componentRestrictions: { country: ['uk', 'ie'] }
                // Optional options
                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
              }}
              // Optional props
              onNoResult={this.handleNoResult}
              onSelectSuggest={this.handleSelectSuggest}
              onStatusUpdate={this.handleStatusUpdate}
              textNoResults="No results" // null or "" if you want to disable the no results item
              displayPoweredByGoogle={false}
            >
              <input
                className="form-control"
                type="text"
                value={value}
                style={this.props.style}
                placeholder={this.props.placeholder}
                onChange={this.handleInputChange}
              />
            </ReactGooglePlacesSuggest>
          )
        }
      />
    )
  }
}

LocationInput.defaultProps = {
  placeholder: 'Search a location'
}
