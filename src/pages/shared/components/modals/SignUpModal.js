import React from 'react'
import { withRouter } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import SocialLogin from '../common/SocialLogin'
import Modal from 'react-bootstrap/Modal'
import TextField from '../common/TextField'
import ScriptCache from '../../../../utils/ScriptCache'
import General from '../../../../utils/General'
import AuthManager from '../../../../utils/AuthManager'
import Backend from '../../../../utils/Backend'

class SignUpModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      show: props.show,
      phoneVerifying: false,
      phoneChanging: false,
      phoneOrSmsError: false,
      verificationCode: null
    }
  }

  componentDidMount() {
    this._loadJs()
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  _setBackgroundImage() {
    setTimeout(() => {
      General.updateImageBackgrounds()
    }, 1000)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _onModalHide() {
    if (AuthManager.currentUser) {
      window.location.reload()
    }
    this.props.onModalHide()
  }

  _getGoogleRedirectUri(){
    return window.location.href.replace(/\/$/, "")
  }

  _isValid() {
    let isValid = true
    if (!this.refs.tfFirstName.isValid()) {
      isValid = false
    }
    if (!this.refs.tfLastName.isValid()) {
      isValid = false
    }
    if (!this.state.countryCode || !this.state.phone) {
      this.setState({
        phoneError: true
      })
      isValid = false
    }
    if (!this.refs.tfEmail.isValid()) {
      isValid = false
    }
    if (!this.refs.tfPassword.isValid()) {
      isValid = false
    }
    return isValid
  }

  _onCreatePressed() {
    if (!this._isValid()) {
      return
    }
    this._save()
  }

  _save() {
    let data = {
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        phone_country_code: this.state.countryCode,
        phone_number: this.state.phone
      }
    }

    AuthManager.registerCustomer(data)
      .then(response => {
        this._handleResponse(response)
      })
      .catch(error => {
        this._handleResponse(null)
        alert(error.message)
      })
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
        this.props.handleCreateAccount()
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
      this.props.handleCreateAccount()
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

  _renderSignUpForm() {
    return (
      <>
      <h2>Create an account</h2>
      <p className="lead">
        Get Hungry to Happy by creating your Roadrunner account.
        Did we mention it's free?
      </p>
      <SocialLogin
        type="facebook"
        handleLogin={(response) => this._handleResponse(response)}
      />
      <SocialLogin
        type="google"
        handleLogin={(response) => this._handleResponse(response)}
      />
      <hr data-title="OR" />
      <form>
        <div className="row">
          <div className="col-6">
            <TextField
              ref="tfFirstName"
              placeholder="First name"
              value={this.state.firstName}
              onChangeText={value =>
                this.setState({ firstName: value })
              }
            />
          </div>
          <div className="col-6">
            <TextField
              ref="tfLastName"
              placeholder="Last name"
              value={this.state.lastName}
              onChangeText={value =>
                this.setState({ lastName: value })
              }
            />
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

          <div className="col-12">
            <TextField
              ref="tfEmail"
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChangeText={value =>
                this.setState({ email: value })
              }
            />
          </div>

          <div className="col-12">
            <TextField
              ref="tfPassword"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChangeText={value =>
                this.setState({ password: value })
              }
            />
          </div>

          <div className="col-12">
            <button
              type="button"
              style={{ paddingLeft: 20, paddingRight: 20, float: "right" }}
              onClick={() => this._onCreatePressed()}
              className="btn btn--primary type--uppercase"
            >
              Create Account
            </button>
          </div>
          <div className="col-12">
          <span className="type--fine-print">
            By signing up, you agree to the
            <a
              href="/terms-conditions"
              style={{ marginLeft: 5 }}
            >
              Terms of Service
            </a>
          </span>
        </div>
        </div>
      </form>
      </>
    )
  }

  _renderPhoneChangingForm() {
    return (
      <form>
        <div className="row">
          <div className="col-12">
            <h3>Change Your Phone Number</h3>
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
            <h3>Verify Your Phone Number</h3>
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
    this._setBackgroundImage()
    return (
      <Modal
        show={this.state.show}
        size="lg"
        onHide={() => this._onModalHide()}
      >
        <Modal.Body>
          <div
            style={{
              position: 'absolute',
              padding: 20,
              top: 10,
              right: 30,
              zIndex: 1
            }}
            onClick={() => this._onModalHide()}
          >
            <i className="fa fa-times" />
          </div>
          <section className="imageblock feature-large ">
            <div className="imageblock__content col-lg-5 col-md-3 pos-left">
              <div
                className="background-image-holder"
                style={{ background: 'url("img/burger.jpg")', opacity: 1 }}
              >
                <img
                  alt=""
                  src={require('../../../../assets/img/burger.jpg')}
                />
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-end">
                <div className="col-lg-7">
                  <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-11">

                      {!(this.state.phoneVerifying || this.state.phoneChanging) && this._renderSignUpForm()}
                      {this.state.phoneChanging && this._renderPhoneChangingForm()}
                      {this.state.phoneVerifying && this._renderPhoneVerifyingForm()}

                    </div>
                  </div>
                  {/*end of row*/}
                </div>
                {/*end of col*/}
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
          <div class="modal-close modal-close-cross"></div>
        </Modal.Body>
      </Modal>
    )
  }
}
export default withRouter(SignUpModal)
