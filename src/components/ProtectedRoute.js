import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthManager from '../utils/AuthManager'

export default class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props)

    let fallbackUrl = props.fallbackUrl ? props.fallbackUrl : '/'
    this.state = {
      fallbackUrl,
      loading: true,
      isProtected: null
    }
  }

  componentDidMount() {
    if (!this.props.isProtected) {
      this.setState({ loading: false, isProtected: false })
      return
    }

    this.props
      .isProtected()
      .then(isProtected => {
        this.setState({ loading: false, isProtected })
      })
      .catch(error => {
        this.setState({ loading: false, isProtected: false })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  _renderProtected() {
    let { component: Component, path, ...rest } = this.props
    return <Route path={path} component={Component} />
  }

  _renderUnprotected() {
    let { fallbackUrl } = this.state
    return <Redirect to={fallbackUrl} />
  }

  _renderLoading() {
    return null
  }

  render() {
    let { loading, isProtected } = this.state
    if (loading) {
      return this._renderLoading()
    } else if (isProtected) {
      return this._renderProtected()
    } else {
      return this._renderUnprotected()
    }
  }
}
