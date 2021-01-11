import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import EllipsisText from 'react-ellipsis-text'
import ScriptCache from '../../../utils/ScriptCache'

export default class VenueCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      venue: props.venue
    }
  }

  _renderCategories() {
    let { venue } = this.state
    let count = 0
    return venue.categories.map(category => {
      count += 1
      if (count >= 3) {
        return
      }
      return <span>{category.title} </span>
    })
  }

  render() {
    let { venue } = this.state
    if (venue == null) {
      return null
    }
    return (
      <div
        className="masonry__item col-lg-3 col-md-6 "
        onClick={() => this.props.onPress(venue)}
        style={{ cursor: 'pointer' }}
      >
        <div
          className="restaurant-card"
          style={{ backgroundColor: 'white', height: 410 }}
        >
          {/*<span className="label bg-primary">20 - 25 mins</span>*/}
          <div style={{ height: 200, width: '100%', overflow: 'hidden' }}>
            <img
              alt="Image"
              className="restaurant-cover"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
              src={venue.feature_image.banner}
            />
          </div>
          <a className="block product product--tile">
            <div>
              <h5>
                <EllipsisText text={venue.title} length={22} />
              </h5>
              <br />
              {this._renderCategories()}
              <br />
              <span className="rating text-primary">
                {venue.average_rating} Rating ({venue.total_ratings})
              </span>
              <br />
              <div style={{ display: 'flex', flex: 1 }}>
                <StarRatings
                  rating={venue.average_rating}
                  starRatedColor={global.Colors.Primary}
                  starDimension="25px"
                  starSpacing="1px"
                  numberOfStars={5}
                  name="rating"
                />
              </div>
            </div>
          </a>
        </div>
      </div>
    )
  }
}
