import React from 'react'
import TextFormat from '../../../../utils/TextFormat'
import LocationFormat from '../../../../utils/LocationFormat'

export default class AddressListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.location
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    let { location } = this.state
    if (location == null) {
      return null
    }
    return (
      <div className="boxed boxed--border">
        <div className="row">
          <div className="col-md-9">
            <span>{LocationFormat.fullAddress(location)}</span>
          </div>
          <div className="col-md-3">
            <button
              style={{ paddingLeft: 20, paddingRight: 20 }}
              type="button"
              onClick={() => this.props.onDeletePressed()}
              className="btn bg--error"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}
