import React from 'react'
import { withRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'

import AuthManager from '../../../../utils/AuthManager'
import Email from '../../../../utils/Email'
import Backend from '../../../../utils/Backend'

class SocialLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.type
    }
  }

  _handleFacebookResponse(response) {
    Backend.getFacebookCode(response.accessToken)
      .then(response => {
        let data = {
          provider: 'facebook',
          redirect_uri: global.Constants.Facebook.RedirectUri,
          code: response.code
        }
        AuthManager.socialLogin(data)
          .then((response) => {
            this.props.handleLogin(response)
          })
          .catch(error => {
            this.setState({ isLoading: false, error: error.message })
            this.props.handleLogin(null)
          })
      })
      .catch(error => {
        console.log('ERROR', error.error)
        this.props.handleLogin(null)
      })
  }

  _handleGoogleResponse(response) {
    let data = {
      provider: 'google-oauth2',
      redirect_uri: this._getGoogleRedirectUri(),
      code: response.code
    }
    AuthManager.socialLogin(data)
      .then((response) => {
        this.props.handleLogin(response)
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message })
        this.props.handleLogin(null)
      })
  }

  _getGoogleRedirectUri() {
    return window.location.href.replace(/\/$/, '')
  }

  _renderGoogleLogin() {
    return (
      <GoogleLogin
        clientId={global.Constants.Google.WebClientId}
        redirectUri={this._getGoogleRedirectUri()}
        responseType="code"
        accessType="offline"
        prompt="consent"
        render={renderProps => (
          <a
            className="btn block btn--icon bg--google type--uppercase"
            onClick={renderProps.onClick}
          >
            <span className="btn__text">
              <i className="socicon-google" />
              Sign up with Google
            </span>
          </a>
        )}
        buttonText="Login"
        onSuccess={response => this._handleGoogleResponse(response)}
        onFailure={response => this._handleGoogleResponse(response)}
      />
    )
  }

  _renderFacebookLogin() {
    return (
      <FacebookLogin
        appId={global.Constants.Facebook.FBAppId}
        autoLoad={false}
        callback={res => this._handleFacebookResponse(res)}
        render={renderProps => (
          <a
            className="btn block btn--icon bg--facebook type--uppercase"
            onClick={renderProps.onClick}
          >
            <span className="btn__text">
              <i className="socicon-facebook" />
              Sign up with Facebook
            </span>
          </a>
        )}
      />
    )
  }

  _renderSocialLogin() {
    let { type } = this.state
    if (type == 'facebook') {
      return this._renderFacebookLogin()
    } else if (type == 'google') {
      return this._renderGoogleLogin()
    }
  }

  render() {
    return this._renderSocialLogin()
  }
}
export default withRouter(SocialLogin)
