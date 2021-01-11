import React from 'react'
import { withRouter } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import SocialLogin from '../common/SocialLogin'
import Modal from 'react-bootstrap/Modal'
import TextField from '../common/TextField'
import AuthManager from '../../../../utils/AuthManager'
import Email from '../../../../utils/Email'
import Backend from '../../../../utils/Backend'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      show: props.show,
      phoneVerifying: false,
      phoneChanging: false,
      phoneOrSmsError: false,
      verificationCode: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _isFormValid() {
    let { email, password } = this.state

    if (!Email.isValid(email)) {
      this.setState({ error: 'Please enter a valid email address' })
      return false
    }

    return true
  }

  _handleLogInPressed() {
    if (!this._isFormValid()) {
      return
    }
    let { email, password } = this.state
    AuthManager.login(email, password)
      .then((response) => {
        this._handleResponse(response)
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message })
        this._handleResponse(null)
      })
  }

  _renderError() {
    let { error } = this.state

    if (!error) {
      return null
    }

    return (
      <div className="col-md-12">
        <span style={{ color: global.Colors.Secondary }}>{error}</span>
      </div>
    )
  }

  _onForgotPasswordPressed() {
    this._goTo('/forgot-password')
  }

  _goTo(url) {
    this.props.history.push(url)
  }

  _onModalHide() {
    if (AuthManager.currentUser) {
      window.location.reload()
    }
    this.props.onModalHide()
  }

  _getGoogleRedirectUri() {
    return window.location.href.replace(/\/$/, '')
  }

  _handleResponse(response) {
    if (response) {
      this.setState({
        id: response.customer.user.id
      })
      if (!response.customer.user.phone_verified) {
        if (!response.customer.user.phone_number) {
          this.setState({
            phoneChanging: true
          })
        } else {
          this.setState({
            countryCode: response.customer.user.phone_country_code,
            phone: response.customer.user.phone_number
          })
          AuthManager.requestPhoneVerification()
          .then(response => {
            this.setState({
              phoneVerifying: true
            })
          })
          .catch(error => {
            this.setState({
              phoneChanging: true,
              phoneOrSmsError: true
            })
          })
        }
      } else {
        this.props.handleLogin()
      }
    } else {
      this.setState({
        phoneVerifying: false,
        phoneChanging: false,
        phoneOrSmsError: false,
        verificationCode: null
      })
    }
  }

  _onVerifyPhonePressed() {
    this.setState({
      phoneOrSmsError: false
    })
    if (this.refs.tfVerificationCode.isValid()) {
      this._verifyPhone()
    }
  }

  _verifyPhone() {
    let data = {
      code: this.state.verificationCode
    }
    AuthManager.verifyPhone(data)
    .then(response => {
      this.setState({
        phoneOrSmsError: false
      })
      this.props.handleLogin()
    })
    .catch(error => {
      this.setState({
        phoneOrSmsError: true
      })
    })
  }

  _onChangePhonePressed() {
    this.setState({
      phoneVerifying: false,
      phoneChanging: true,
      phoneOrSmsError: false,
      verificationCode: null
    })
  }

  _onNextPressed() {
    if (!this.state.countryCode || !this.state.phone) {
      this.setState({
        phoneError: true
      })
      return null;
    }

    let data = {
      id: this.state.id,
      user: {
        phone_country_code: this.state.countryCode,
        phone_number: this.state.phone
      }
    }
    AuthManager.updatePhone(data)
    .then(response => {
      return AuthManager.requestPhoneVerification()
    })
    .then(response => {
      this.setState({
        phoneVerifying: true,
        phoneChanging: false,
        phoneOrSmsError: false,
        verificationCode: null
      })
    })
    .catch(error => {
      this.setState({
        phoneOrSmsError: true
      })
    })
  }

  _setPhoneNumber(value, data) {
    this.setState({
      phoneError: false,
      countryCode: `+${data.dialCode}`,
      phone: value.slice(data.dialCode.length)
    })
  }

  _renderLoginForm() {
    return (
      <>
        <form>
          <SocialLogin
            type="facebook"
            handleLogin={(response) => this._handleResponse(response)}
          />
          <SocialLogin
            type="google"
            handleLogin={(response) => this._handleResponse(response)}
          />
          <hr data-title="OR" />
          <div className="row">
            <div className="col-md-12">
              <input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={event =>
                  this.setState({ email: event.target.value })
                }
              />
            </div>
            <div className="col-md-12">
              <input
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </div>
            {this._renderError()}
            <div className="col-md-12">
              <button
                className="btn btn--primary type--uppercase"
                onClick={() => this._handleLogInPressed()}
                style={{ width: '100%' }}
                type="button"
              >
                Login
              </button>
            </div>
          </div>
          {/*end of row*/}
        </form>
        <span className="type--fine-print block">
          Don't have an account yet?
          <a
            href="#"
            onClick={() => this.props.onCreateAccountPressed()}
            style={{ marginLeft: 5 }}
          >
            Create Account
          </a>
        </span>
        <span className="type--fine-print block">
          Forgot your username or password?
          <a
            href=""
            style={{ marginLeft: 5 }}
            onClick={() => this._onForgotPasswordPressed()}
          >
            Recover Account
          </a>
        </span>
      </>
    )
  }

  _renderPhoneChangingForm() {
    return (
      <form>
        <div className="row">
          <div className="col-12">
            <span className="type--fine-print">
              For your security, we want to make sure it's really you.
              We will send you a verification code.
            </span>
          </div>

          <div className="col-12">
            <PhoneInput
              country={'gb'}
              value={`${this.state.countryCode}${this.state.phone}`}
              onChange={(value, data) => this._setPhoneNumber(value, data)}
            />
            {this.state.phoneError && (
              <label style={{color: "red"}}>Please enter something</label>
            )}
          </div>
          
          {this.state.phoneOrSmsError && (
            <div className="col-12">
              <label style={{color: "red"}}>Sorry, something went wrong.</label>
            </div>
          )}

          <div className="col-12">
            <button
              type="button"
              style={{ paddingLeft: 20, paddingRight: 20, float: "right" }}
              onClick={() => this._onNextPressed()}
              className="btn btn--primary type--uppercase"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    )
  }

  _renderPhoneVerifyingForm() {
    return (
      <form>
        <div className="row">
          <div className="col-12">
            <span className="type--fine-print">
              For your security, we want to make sure it's really you.
              We will send you a verification code.
            </span>
            <br />
            <span style={{color: "#440099"}}>{this.state.countryCode} {this.state.phone}</span>
          </div>

          <div className="col-12">
            <TextField
              ref="tfVerificationCode"
              placeholder="Verification Code"
              value={this.state.verificationCode}
              onChangeText={value =>
                this.setState({ verificationCode: value })
              }
            />
            {this.state.phoneOrSmsError && (
              <>
              <label style={{color: "red"}}>Sorry, something went wrong.</label>
              </>
            )}
          </div>

          <div className="col-12">
            <span className="type--fine-print">
              <a
                href="javascript:;"
                onClick={() => this._onChangePhonePressed()}
                style={{ marginLeft: 5, fontSize: "1.2em", textDecoration: "none" }}
              >
                Change Phone Number
              </a>
            </span>
          </div>
          <div className="col-12">
            <button
              type="button"
              style={{ paddingLeft: 20, paddingRight: 20, float: "right" }}
              onClick={() => this._onVerifyPhonePressed()}
              className="btn btn--primary type--uppercase"
            >
              Verify Phone
            </button>
          </div>
        </div>
      </form>
    )
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this._onModalHide()}>
        <Modal.Header closeButton>
          {!(this.state.phoneVerifying || this.state.phoneChanging) && (
            <h3 style={{ marginTop: 8, marginLeft: 20, marginBottom: 0 }}>
              Welcome back. Hungry?
            </h3>
          )}
          {this.state.phoneChanging && (
            <h3 style={{ marginTop: 8, marginLeft: 20, marginBottom: 0 }}>
              Change Your Phone Number
            </h3>
          )}
          {this.state.phoneVerifying && (
            <h3 style={{ marginTop: 8, marginLeft: 20, marginBottom: 0 }}>
              Verify Your Phone Number
            </h3>
          )}
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: 20 }}>
            <div className="feature__body">

              {!(this.state.phoneVerifying || this.state.phoneChanging) && this._renderLoginForm()}
              {this.state.phoneChanging && this._renderPhoneChangingForm()}
              {this.state.phoneVerifying && this._renderPhoneVerifyingForm()}

            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default withRouter(LoginModal)
