import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Footer from '../customer/components/Footer'
import Logo from './components/common/Logo'
import LoginModal from './components/modals/LoginModal'
import SignUpModal from './components/modals/SignUpModal'

import AuthManager from '../../utils/AuthManager'
import Email from '../../utils/Email'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      isLoading: false,
      showLoginModal: false,
      showSignUpModal: false
    }
  }

  componentDidMount() {}

  _handleLogin() {
    window.location = '/'
  }

  _handleCreateAccount() {
    window.location = '/'
  }

  _isFormValid() {
    let { email, password } = this.state

    if (!Email.isValid(email)) {
      this.setState({ error: 'Please enter a valid email address' })
      return false
    }

    return true
  }

  _forgotPassword() {
    if (!this._isFormValid()) {
      return
    }
    this.setState({ isLoading: true })

    let { email } = this.state

    AuthManager.requestResetPassword(email)
      .then(response => {
        this.setState({ isLoading: false })
        this._goToResetPassword()
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message })
      })
  }

  _renderError() {
    let { error } = this.state
    if (!error) {
      return null
    }
    return (
      <div className="col-md-12">
        <span style={{ color: global.Colors.Secondary, marginTop: 5 }}>
          {error}
        </span>
      </div>
    )
  }

  _handleCreateAccount() {
    window.location = '/'
  }

  _goToResetPassword() {
    let { email } = this.state
    this.props.history.push({ pathname: '/reset-password', state: { email } })
  }

  render() {
    return (
      <div>
        <div className="nav-container ">
          <div className="bar bar--sm visible-xs">
            <div className="container">
              <div className="row">
                <div className="col-3 col-md-2">
                  <Logo />
                </div>
                <div className="col-9 col-md-10 text-right">
                  <a
                    href="#"
                    className="hamburger-toggle"
                    data-toggle-class="#menu1;hidden-xs"
                  >
                    <i className="icon icon--sm stack-interface stack-menu" />
                  </a>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </div>
          {/*end bar*/}
          <nav
            id="menu1"
            className="bar bar-1 hidden-xs bar--absolute bar--mobile-sticky"
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-md-2 hidden-xs">
                  <div className="bar__module">
                    <Logo />
                  </div>
                  {/*end module*/}
                </div>
                <div className="col-lg-11 col-md-12 text-right text-left-xs text-left-sm">
                  {/*end module*/}
                  <div className="bar__module"></div>
                  {/*end module*/}
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </nav>
          {/*end bar*/}
        </div>
        <div className="main-container">
          <section className="height-100 text-center">
            <div className="container pos-vertical-center">
              <div className="row">
                <div className="col-md-7 col-lg-5">
                  <h2>Recover your account</h2>
                  <p className="lead">
                    Enter email address to send a recovery email.
                  </p>
                  <form>
                    <input
                      type="email"
                      value={this.state.email}
                      placeholder="Email Address"
                      onChange={event =>
                        this.setState({ email: event.target.value })
                      }
                    />
                    {this._renderError()}
                    <button
                      className="btn btn--primary type--uppercase"
                      onClick={() => this._forgotPassword()}
                      style={{ width: '100%' }}
                      type="button"
                    >
                      Recover Account
                    </button>
                  </form>
                  <span className="type--fine-print block">
                    Don't have an account yet?
                    <span style={{ marginLeft: 5 }}>
                      <a
                        href="#"
                        onClick={() => this.setState({ showSignUpModal: true })}
                      >
                        Create account
                      </a>
                    </span>
                  </span>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
        </div>
        <div className="all-page-modals">
          <SignUpModal
            show={this.state.showSignUpModal}
            handleCreateAccount={() => this._handleCreateAccount()}
            onModalHide={() => this.setState({ showSignUpModal: false })}
          />
          {/*<div class="loader"></div>*/}
        </div>
      </div>
    )
  }
}
