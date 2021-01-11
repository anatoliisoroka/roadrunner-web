import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import CustomerApp from '../customer/App'

import Footer from '../customer/components/Footer'
import NavBar from '../customer/components/NavBar'
import QuickPanel from '../customer/components/QuickPanel'

import NotFound from '../shared/NotFound'

import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import '../../assets/css/bootstrap.css'
import '../../assets/css/stack-interface.css'
import '../../assets/css/socicon.css'
import '../../assets/css/lightbox.min.css'
import '../../assets/css/flickity.css'
import '../../assets/css/iconsmind.css'
import '../../assets/css/jquery.steps.css'
import '../../assets/css/theme.css'
import '../../assets/css/custom.css'
import '../../assets/css/font-sourcesanspro.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <div className="main-container">
          <QuickPanel history={this.props.history} />
          <Switch>
            <Route path="/" component={CustomerApp} />
          </Switch>
        </div>

      </>
    )
  }
}
