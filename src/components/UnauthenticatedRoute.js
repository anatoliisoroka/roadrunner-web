import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthManager from '../utils/AuthManager'
import ProtectedRoute from './ProtectedRoute'

export default class UnauthenticatedRoute extends React.Component {
  constructor(props) {
    super(props)
  }

  _isProtected() {
    // TO:DO implement a better way than calling this on every page
    return AuthManager.silentLogin()
      .then(user => {
        this.props.history.push('/')
        // TO:DO change fallbackUrl depending on user types if app ever supports
        // other types of users.
        return false
      })
      .catch(error => {
        return true
      })
  }

  render() {
    return (
      <ProtectedRoute {...this.props} isProtected={() => this._isProtected()} />
    )
  }
}
