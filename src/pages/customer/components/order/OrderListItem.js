import React from 'react'
import Price from '../../../../utils/Price'
import TextFormat from '../../../../utils/TextFormat'
import LocationFormat from '../../../../utils/LocationFormat'
import moment from 'moment'

export default class OrderListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: props.order
    }
  }

  render() {
    let { order } = this.state
    if (order == null) {
      return null
    }
    return (
      <div className="boxed boxed--border">
        <div className="row">
          <div className="col-md-9">
            <p style={{ marginBottom: 5 }}>
              {moment(order.created_at).format('Do MMMM YYYY, h:mm:ss a')}
            </p>
            <h5 style={{ marginBottom: 5, marginTop: 0 }}>
              {TextFormat.capitalizeFirst(order.venue.title)} -{' '}
              {LocationFormat.fullAddress(order.data.venue_location)}
            </h5>
            <p>{Price.format(order.total_price, order.currency)}</p>
          </div>
          <div className="col-md-3">
            <a
              className="btn btn--secondary "
              onClick={() => this.props.onDetailsPressed()}
              data-modal-index={1}
            >
              <span className="btn__text">Details</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
