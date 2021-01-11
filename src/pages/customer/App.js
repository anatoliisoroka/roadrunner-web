import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AuthenticatedRoute from '../../components/AuthenticatedRoute'

import Footer from './components/Footer'
import NavBar from './components/NavBar'
import QuickPanel from './components/QuickPanel'

import Landing from '../shared/Landing'
import ForgotPassword from '../shared/ForgotPassword'
import PasswordReset from '../shared/PasswordReset'
import ServiceTerms from '../shared/ServiceTerms'
import UseTerms from '../shared/UseTerms'
import Careers from '../shared/Careers'
import Support from '../shared/Support'
import About from '../shared/About'
import PrivacyPolicy from '../shared/About'
import Account from './Account'
import Restaurants from './Restaurants'
import Basket from './Basket'
import Checkout from './Checkout'
import Contact from './Contact'
import Menu from './Menu'
import OrderComplete from './OrderComplete'
import NotFound from '../shared/NotFound'
import CookieBanner from '../shared/components/common/CookieBanner'

import ScriptCache from '../../utils/ScriptCache'
import AuthManager from '../../utils/AuthManager'
import General from '../../utils/General'
import PushNotifications from '../../PushNotifications'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    if (AuthManager.getCurrentUser() != null) {
      PushNotifications.register(AuthManager.currentUser.user)
    }
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="main-container">
          <QuickPanel history={this.props.history} />
          <Switch>
            <Route exact path="/" component={Menu} />
            <AuthenticatedRoute
              exact
              path="/customer/account"
              component={Account}
            />
            <AuthenticatedRoute
              exact
              path="/customer/basket"
              component={Basket}
            />
            <AuthenticatedRoute
              exact
              path="/customer/checkout"
              component={Checkout}
            />
            <AuthenticatedRoute
              exact
              path="/customer/order-confirmation"
              component={OrderComplete}
            />

            <Route exact path="/customer/contact" component={Contact} />
            <Route path="/customer/restaurants" component={Restaurants} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/terms-conditions" component={ServiceTerms} />
            <Route exact path="/terms-use" component={UseTerms} />
            <Route exact path="/careers" component={Careers} />
            <Route exact path="/support" component={Support} />
            <Route exact path="/about" component={About} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/reset-password" component={PasswordReset} />
            <Route path="/404" component={NotFound} />
          </Switch>
        </div>
        <Footer />
        <CookieBanner />
      </>
    )
  }
}
