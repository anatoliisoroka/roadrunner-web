import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthManager from '../utils/AuthManager'
import ProtectedRoute from '../components/ProtectedRoute'

export default class AuthenticatedRoute extends React.Component {
  constructor(props) {
    super(props)
  }

  _isProtected() {
    // TO:DO implement a better way than calling this on every page
    return AuthManager.silentLogin().then(user => {
      return true
    })
    // return new Promise((resolve, reject) => {
    //   resolve(true)
    // })
  }

  render() {
    return (
      <ProtectedRoute {...this.props} isProtected={() => this._isProtected()} />
    )
  }
}
