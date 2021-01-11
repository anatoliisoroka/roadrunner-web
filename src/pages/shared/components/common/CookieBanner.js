import React from 'react'
import { withRouter } from 'react-router-dom'
import CookieConsent, { Cookies } from 'react-cookie-consent'

class CookieBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <CookieConsent
        debug={global.Api.IsDebug}
        buttonText="Accept"
        style={styles.container}
        containerClasses="shadow p-1 mb-4 bg-white"
        buttonStyle={styles.button}
        buttonText="I Accept"
        contentStyle={{ flex: 1, flexWrap: 'wrap', color: 'black' }}
      >
        By using our website you are agreeing to our use of cookies.
      </CookieConsent>
    )
  }
}

const styles = {
  container: {
    background: '#fff',
    width: '50%',
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 15
  },
  button: {
    backgroundColor: global.Colors.Secondary,
    color: 'white',
    fontSize: '15px',
    borderRadius: 5,
    fontWeight: 'bold'
  }
}

export default withRouter(CookieBanner)
