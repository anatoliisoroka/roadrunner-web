import React from 'react'
import Logo from './components/common/Logo'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'
import NavBar from '../customer/components/NavBar'
import Footer from '../customer/components/Footer'
const ABOUT = require('../../assets/img/about.jpg')
class About extends React.Component {
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
                  <h1>The Roadrunner Journey</h1>
                  <p className="lead">
                    Roadrunner is a food delivery and order ahead platform.
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
                    src={ABOUT}
                  />
                </div>
                <div className="col-lg-5 col-md-6">
                  <div className="text-block">
                    <p>
                      We were founded by Eamon Breen and were due to launch in
                      the summer of 2020. The global pandemic, Coronavirus,
                      caused major issues in the food sectors and the community
                      was struggling with the impact. The elderly and vulnerable
                      were advised to go into isolation for an indefinite time.
                      We worked tirelessly to launch the services earlier than
                      planned, and did so, beginning the journey in the
                      birthplace of Roadrunner, Newry and Mourne. Roadrunner
                      Supermarket was born.
                      <br />
                      <br />
                      Roadrunner have partnered with some of the best food
                      providers in the country including Dale Farm, Mash direct,
                      Irwins Bread and Lynas food to create an online
                      supermarket which delivers your Groceries right to your
                      door!!
                      <br />
                      <br />
                      Customers can place orders online or through our android
                      and iOS apps and with new suppliers added daily, it has
                      never been easier to have Groceries delivered.
                    </p>
                  </div>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
          <section className="imagebg cover cover-blocks bg--secondary">
            <div
              className="background-image-holder"
              style={{
                backgroundImage: `url(${'../../assets/img/app-bg.png'})`,
                opacity: 1
              }}
            >
              <img
                alt="background"
                src={require('../../assets/img/app-bg.png')}
              />
            </div>
            <div className="container" style={{ paddingTop: '100px' }}>
              <div className="row">
                <div className="col-md-6 col-lg-5 ">
                  <div>
                    <h1>Download our app</h1>
                    <p className="lead">
                      For real time updates on your orders and easy ordering,
                      get the Roadrunner App.
                    </p>
                    <a href="#">
                      <img
                        src={require('../../assets/img/android.png')}
                        alt="Play store logo"
                      />
                    </a>
                    <a href="https://apps.apple.com/ie/app/roadrunner-hungry-to-happy/id1503704561">
                      <img
                        src={require('../../assets/img/ios.png')}
                        alt="Apple store logo"
                      />
                    </a>
                  </div>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
        </div>
      </div>
    )
  }
}
export default withRouter(About)
