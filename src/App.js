import React from 'react'
import './App.css'

// import AdminApp from './pages/admin/App'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import SharedApp from './pages/shared/App'
import NotFound from './pages/shared/NotFound'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import runtimeEnv from '@mars/heroku-js-runtime-env'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/bootstrap.css'
import './assets/css/stack-interface.css'
import './assets/css/socicon.css'
import './assets/css/lightbox.min.css'
import './assets/css/flickity.css'
import './assets/css/iconsmind.css'
import './assets/css/jquery.steps.css'
import './assets/css/theme.css'
import './assets/css/custom.css'
import './assets/css/font-sourcesanspro.css'

window.env = runtimeEnv()

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <UnauthenticatedRoute path="/" component={SharedApp} />
          <Route path="/404" component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
