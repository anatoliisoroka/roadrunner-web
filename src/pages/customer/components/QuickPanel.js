import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthManager from '../../../utils/AuthManager'
class QuickPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _onLogoutPressed() {
    AuthManager.logOut()
      .then(() => {
        window.location = '/'
      })
      .catch(error => {
        alert(error.message)
      })
  }

  _goTo(url) {
    this.props.history.push(url)
  }

  render() {
    return (
      <div
        className="notification pos-right pos-top side-menu bg--white"
        data-notification-link="side-menu"
        data-animation="from-right"
      >
        <div className="side-menu__module">
          <ul className="list--loose list--hover">
            <li>
              <a onClick={() => (window.location = '/customer/account')}>
                <span className="h5">Your Account</span>
              </a>
            </li>
            <li>
              <a onClick={() => this._onLogoutPressed()}>
                <span className="h5">Log out</span>
              </a>
            </li>
          </ul>
        </div>
        {/*end module*/}
        <hr />
        <div className="side-menu__module">
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
          </ul>
        </div>
        <div className="notification-close-cross notification-close" />
      </div>
    )
  }
}
export default withRouter(QuickPanel)
