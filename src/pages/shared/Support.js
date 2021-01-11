import React from 'react'
import Logo from './components/common/Logo'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'
import NavBar from '../customer/components/NavBar'
import Footer from '../customer/components/Footer'
import QuickPanel from '../customer/components/QuickPanel'
const SUPPORT = require('../../assets/img/support.jpg')
class Support extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this._scrollToTop()
    this._loadJs()
    setTimeout(() => {
      General.updateAll()
    }, 1000)
  }

  _scrollToTop() {
    window.scrollTo(0, 0)
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  render() {
    return (
      <div>
        <div className="main-container">
          <section className="text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-10 col-lg-8">
                  <h1>Support</h1>
                  <p className="lead">
                    If you have a problem with your order or need to contact
                    Roadrunner please contact us through our Facebook or twitter
                    page and we will get back to you ASAP. Any orders from our
                    Grocery delivery service which our missing items will be
                    refunded or credited onto your account.
                  </p>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
          <section className="feature-large switchable bg--secondary">
            <div className="container">
              <div className="row justify-content-around">
                <div className="col-lg-6 col-md-6">
                  <img
                    alt="Image"
                    className="border--round box-shadow-wide"
                    src={SUPPORT}
                  />
                </div>
                <div className="col-lg-5 col-md-6">
                  <div className="heading-block">
                    <h3>Can I cancel my order?</h3>
                  </div>
                  <div className="text-block">
                    <p>
                      Orders can be cancelled by contacting the restaurant
                      directly and will be refunded to the customer as long as
                      the order has not been prepared.
                      <br />
                      <br />
                      Are terms of service, terms and conditions and Privacy
                      policy are available online.
                      <br />
                      <br />
                      You can also contact us on{' '}
                      <a href="mailto:info@roadrunnershopping.com">
                        info@roadrunnershopping.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
        </div>
        <QuickPanel />
      </div>
    )
  }
}
export default withRouter(Support)
