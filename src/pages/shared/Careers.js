import React from 'react'
import Logo from './components/common/Logo'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'
import NavBar from '../customer/components/NavBar'
import Footer from '../customer/components/Footer'
const BACKGROUND = require('../../assets/img/careers-bg.jpg')
class Careers extends React.Component {
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
          <section
            className="text-center imagebg space--lg height-100"
            data-overlay={7}
          >
            <div className="background-image-holder">
              <img alt="background" src={BACKGROUND} />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-lg-6">
                  <h1>Want to join Roadrunner?</h1>
                  <p className="lead">
                    We are always on the lookout for new talent to join the
                    Roadrunner team. We have a range of opportunities available
                    so if it’s something you would like to find out more about
                    contact us at :{' '}
                    <a href="mailto:eamon@roadrunner.menu">
                      Eamon@roadrunner.menu
                    </a>
                  </p>
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
export default withRouter(Careers)
