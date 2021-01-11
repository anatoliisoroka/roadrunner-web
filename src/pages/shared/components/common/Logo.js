import React from 'react'
import { withRouter } from 'react-router-dom'

class Logo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _onLogoPressed() {
    window.location = '/'
  }

  render() {
    return (
      <a onClick={() => this._onLogoPressed()}>
        <img
          className="logo logo-dark"
          alt="logo"
          style={{ cursor: 'pointer' }}
          src={require('../../../../assets/img/logo-dark.png')}
        />
        <img
          className="logo logo-light"
          alt="logo"
          style={{ cursor: 'pointer' }}
          src={require('../../../../assets/img/logo-light.png')}
        />
      </a>
    )
  }
}
export default withRouter(Logo)
