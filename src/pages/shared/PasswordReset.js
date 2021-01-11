import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import TextField from '../shared/components/common/TextField'

import Footer from '../customer/components/Footer'
import AuthManager from '../../utils/AuthManager'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'
import Logo from './components/common/Logo'

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _updateData(key, value) {
    let data = { ...this.state.data }
    data[key] = value
    this.setState({ data })
  }

  _isFormValid() {
    let { data } = this.state

    let isValid = true
    let error = null

    if (!this.tfCode.isValid()) {
      isValid = false
    }
    if (!this.tfPassword.isValid()) {
      isValid = false
    }

    if (data.password != data.confirmPassword) {
      error = "Passwords don't match"
      isValid = false
    }

    if (error) {
      this.setState({ error })
    }

    return isValid
  }

  _handleResetPassword() {
    if (!this._isFormValid()) {
      return
    }
    this._resetPassword()
  }

  _goToLogin() {
    window.location = '/'
  }

  _resetPassword() {
    let { data } = this.state
    AuthManager.resetPassword(
      this.props.location.state.email,
      data.password,
      data.code
    )
      .then(response => {
        this._goToLogin()
      })
      .catch(error => {
        console.log(error)
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
                <div className="col-9 col-md-10 text-right"></div>
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
                  <h2>Reset your password</h2>
                  <p className="lead">
                    We have sent a verification code to your email,{' '}
                    {this.props.location.state.email}. Please enter it below to
                    reset your password.
                  </p>
                  <form>
                    <div className="form-group">
                      <TextField
                        ref={tfCode => (this.tfCode = tfCode)}
                        type="text"
                        placeholder="Verfication Code"
                        onChangeText={value => this._updateData('code', value)}
                      />
                    </div>
                    <div className="form-group">
                      <TextField
                        ref={tfPassword => (this.tfPassword = tfPassword)}
                        type="password"
                        placeholder="New Password"
                        onChangeText={value =>
                          this._updateData('password', value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <TextField
                        type="password"
                        placeholder="Confirm Password"
                        onChangeText={value =>
                          this._updateData('confirmPassword', value)
                        }
                      />
                    </div>
                    {this._renderError()}
                    <button
                      className="btn btn--primary type--uppercase"
                      onClick={() => this._handleResetPassword()}
                      style={{ width: '100%', marginTop: 30 }}
                      type="button"
                    >
                      Reset Password
                    </button>
                  </form>
                  <span className="type--fine-print block">
                    Don't have an account yet?
                    <a style={{ marginLeft: 5 }} href="#">
                      Create account
                    </a>
                  </span>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
        </div>
        <div className="all-page-modals">
          <div className="modal-container" data-modal-index={1}>
            <div className="modal-content section-modal">
              <section className="unpad ">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="boxed boxed--lg bg--white text-center feature">
                        <div className="modal-close modal-close-cross" />
                        <h3>Welcome back. Hungry?</h3>
                        <a
                          className="btn block btn--icon bg--facebook type--uppercase"
                          href="#"
                        >
                          <span className="btn__text">
                            <i className="socicon-facebook" />
                            Login with Facebook
                          </span>
                        </a>
                        <a
                          className="btn block btn--icon bg--twitter type--uppercase"
                          href="#"
                        >
                          <span className="btn__text">
                            <i className="socicon-twitter" />
                            Login with Twitter
                          </span>
                        </a>
                        <hr data-title="OR" />
                        <div className="feature__body">
                          <form>
                            <div className="row">
                              <div className="col-md-12">
                                <input type="text" placeholder="Username" />
                              </div>
                              <div className="col-md-12">
                                <input type="password" placeholder="Password" />
                              </div>
                              <div className="col-md-12">
                                <button
                                  className="btn btn--primary type--uppercase"
                                  type="submit"
                                >
                                  Login
                                </button>
                              </div>
                            </div>
                            {/*end of row*/}
                          </form>
                          <span className="type--fine-print block">
                            Don't have an account yet?
                            <a href="#" data-modal-index={2}>
                              Create account
                            </a>
                          </span>
                          <span className="type--fine-print block">
                            Forgot your username or password?
                            <a href="#">Recover account</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end of row*/}
                </div>
                {/*end of container*/}
              </section>
            </div>
          </div>
          <div className="modal-container" data-modal-index={2}>
            <div className="modal-content">
              <section className="imageblock feature-large bg--white border--round ">
                <div className="imageblock__content col-lg-5 col-md-3 pos-left">
                  <div
                    className="background-image-holder"
                    style={{ background: 'url("img/burger.jpg")', opacity: 1 }}
                  >
                    <img alt="image" src="img/burger.jpg" />
                  </div>
                </div>
                <div className="container">
                  <div className="row justify-content-end">
                    <div className="col-lg-7">
                      <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-11">
                          <h2>Create an account</h2>
                          <p className="lead">
                            Get Hungry to Happy by creating your Roadrunner
                            account. Did we mention it's free?
                          </p>
                          <a
                            className="btn block btn--icon bg--facebook type--uppercase"
                            href="#"
                          >
                            <span className="btn__text">
                              <i className="socicon-facebook" />
                              Sign up with Facebook
                            </span>
                          </a>
                          <a
                            className="btn block btn--icon bg--twitter type--uppercase"
                            href="#"
                          >
                            <span className="btn__text">
                              <i className="socicon-twitter" />
                              Sign up with Twitter
                            </span>
                          </a>
                          <hr data-title="OR" />
                          <form>
                            <div className="row">
                              <div className="col-12">
                                <input
                                  type="email"
                                  name="Email Address"
                                  placeholder="Email Address"
                                />
                              </div>
                              <div className="col-12">
                                <input
                                  type="password"
                                  name="Password"
                                  placeholder="Password"
                                />
                              </div>
                              <div className="col-12">
                                <button
                                  type="submit"
                                  className="btn btn--primary type--uppercase"
                                >
                                  Create Account
                                </button>
                              </div>
                              <div className="col-12">
                                <span className="type--fine-print">
                                  By signing up, you agree to the
                                  <a href="#">Terms of Service</a>
                                </span>
                              </div>
                            </div>
                            {/*end row*/}
                          </form>
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
              <div className="modal-close modal-close-cross" />
            </div>
          </div>
          {/*<div class="loader"></div>*/}
        </div>
      </div>
    )
  }
}
