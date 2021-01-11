import React from 'react'

import '../../App.css'

export default class NotFound extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="center-container">
        <h1 style={{ fontSize: 128, marginBottom: 0 }}>404</h1>
        <h4
          style={{
            fontSize: 28,
            marginTop: 10,
            marginBottm: 10,
            marginLeft: 20,
            marginRight: 20,
            textAlign: 'center'
          }}
        >
          We are sorry but the page you are looking for does not exist.
        </h4>
        <button
          onClick={() => this.props.history.push('/')}
          style={{
            height: 50,
            margin: 20,
            fontSize: 16,
            width: 120
          }}
          className="btn btn-brand btn-pill btn-elevate kt-login__btn-primary"
        >
          Home
        </button>
      </div>
    )
  }
}
