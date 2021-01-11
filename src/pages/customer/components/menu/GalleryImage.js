import React from 'react'
import { withRouter } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import LocationFormat from '../../../../utils/LocationFormat'

class GalleryImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: props.image,
      venueDetails: props.venueDetails
    }
  }

  render() {
    let { venueDetails } = this.state
    return (
      <li
        style={{ height: 500, listStyle: 'none' }}
        className="imagebg"
        data-overlay={4}
      >
        <div className="background-image-holder background--center">
          <img
            alt="background"
            style={{ backgroundSize: 'contain', backgroundPosition: 'center' }}
            src={this.state.image.original}
          />
        </div>
        {/*end of container*/}
      </li>
    )
  }
}
export default withRouter(GalleryImage)
