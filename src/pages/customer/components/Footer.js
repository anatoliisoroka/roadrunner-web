import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import FeedbackModal from '../../shared/components/modals/FeedbackModal'

import AuthManager from '../../../utils/AuthManager'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFeedbackModal: false
    }
  }

  _goTo(url) {
    window.location = url
  }

  _renderFeedbackButton() {
    if (AuthManager.getCurrentUser() == null) {
      return null
    }
    return (
      <li style={{ cursor: 'pointer' }}>
        <div className="modal-instance">
          <a onClick={() => this.setState({ showFeedbackModal: true })}>
            <span>Submit Feedback</span>
          </a>
          <FeedbackModal
            show={this.state.showFeedbackModal}
            onHide={() => this.setState({ showFeedbackModal: false })}
          />
        </div>
      </li>
    )
  }

  render() {
    return (
      <footer className="text-center-xs space--xs bg--dark ">
        {/* Footer Links */}
        <div className="container text-center text-md-left">
          {/* Footer links */}
          <div className="row text-center text-md-left mt-3 pb-3">
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Legal</h6>
              <ul>
                <li>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this._goTo('/privacy-policy')}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this._goTo('/terms-conditions')}
                  >
                    Terms of service
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this._goTo('/terms-use')}
                  >
                    Terms of use
                  </a>
                </li>
              </ul>
            </div>
            {/* Grid column */}
            <hr className="w-100 clearfix d-md-none" />
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Useful links
              </h6>
              <ul>
                <li>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this._goTo('/about')}
                  >
                    <span>About</span>
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this._goTo('/careers')}
                  >
                    <span>Careers</span>
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this._goTo('/support')}
                  >
                    <span>Support</span>
                  </a>
                </li>
                {this._renderFeedbackButton()}
              </ul>
            </div>
            {/* Grid column */}
            <hr className="w-100 clearfix d-md-none" />
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Our App</h6>
              <ul>
                <li>
                  <a href="https://play.google.com/store/apps/details?id=ie.mosaic.RoadRunner.customer&hl=en_IE">
                    <img
                      src={require('../../../assets/img/playmarket.png')}
                      style={{ marginBottom: 5 }}
                      alt="Play store logo"
                    />
                  </a>
                </li>

                <li>
                  <a href="https://apps.apple.com/gb/app/roadrunner-hungry-to-happy/id1503704561">
                    <img
                      src={require('../../../assets/img/appstore.png')}
                      alt="Play store logo"
                    />
                  </a>
                </li>
              </ul>
            </div>
            {/* Grid column */}
          </div>
          {/* Footer links */}
          <hr />
          {/* Grid row */}
          <div className="row d-flex align-items-center">
            {/* Grid column */}
            <div className="col-md-7 col-lg-8">
              {/*Copyright*/}
              <p className="text-center text-md-left">
                ©
                <span className="update-year" /> Roadrunner.
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-5 col-lg-4 ml-lg-0">
              {/* Social buttons */}
              <div className="text-center text-md-right">
                <ul className="social-list list-inline list--hover">
                  <li>
                    <a href="https://www.facebook.com/Roadrunner.menu">
                      <i class="socicon socicon-facebook icon icon--xs"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/Roadrunnerapp3">
                      <i class="socicon socicon-twitter icon icon--xs"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/roadrunner.menu/">
                      <i class="socicon socicon-instagram icon icon--xs"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/roadrunner-app/">
                      <i class="socicon socicon-linkedin icon icon--xs"></i>
                    </a>
                  </li>
                  <li>
                    {' '}
                    <a href="mailto:info@roadrunnershopping.com">
                       info@roadrunnershopping.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Footer Links */}
      </footer>
    )
  }
}
export default withRouter(Footer)
