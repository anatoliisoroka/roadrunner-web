import React from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import StarRatings from 'react-star-ratings'

import Backend from '../../../../utils/Backend'
import AuthManager from '../../../../utils/AuthManager'

class FeedbackModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: props.show,
      rating: 3,
      description: null,
      user: AuthManager.getCurrentUser()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _closeModal() {
    this._resetFeedbackForm()
    this.props.onHide()
  }

  _resetFeedbackForm() {
    this.setState({ rating: 3, description: null })
  }

  _submitFeedback() {
    let feedbackData = {
      rating: this.state.rating,
      device: 'desktop',
      platform: 'web'
    }
    if (this.state.user.role == 'customer') {
      feedbackData['customer_id'] = 1
    } else {
      feedbackData['venue_id'] = this.state.user.id
    }
    if (this.state.description != null || this.state.description != '') {
      feedbackData['description'] = this.state.description
    }
    Backend.submitFeedback(feedbackData)
      .then(response => {
        this._closeModal()
      })
      .catch(error => {
        console.warn(error.message)
      })
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this._closeModal()}>
        <Modal.Header closeButton>
          <h3 style={{ marginBottom: 30 }} className="m-b-0">
            Send us feedback
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="feature__body">
            <div className="row">
              <div className="col-md-12">
                <h6>
                  If you have any feedback, good or bad, we would love to hear
                  it:
                </h6>
                <textarea
                  placeholder="Tell us what you think..."
                  value={this.state.description}
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  marginBottom: 10,
                  marginTop: 20
                }}
                className="col-md-12"
              >
                <StarRatings
                  rating={this.state.rating}
                  starHoverColor={global.Colors.Primary}
                  starRatedColor={global.Colors.Primary}
                  changeRating={rating => this.setState({ rating })}
                  starDimension="25px"
                  starSpacing="1px"
                  numberOfStars={5}
                  name="rating"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => this._submitFeedback()}
              className="btn btn--primary m-t-20"
              style={{ width: '100%' }}
            >
              Send Feedback
            </button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default withRouter(FeedbackModal)
