import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import BasketButton from '../customer/components/basket/BasketButton'
import Logo from './components/common/Logo'
import LoginModal from './components/modals/LoginModal'
import SignUpModal from './components/modals/SignUpModal'
import QuickPanel from '../customer/components/QuickPanel'
import Footer from '../customer/components/Footer'

import CurrentLocation from '../../utils/CurrentLocation'
import LocationInput from '../customer/components/common/LocationInput'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'
import AuthManager from '../../utils/AuthManager'
import DripHelper from '../../utils/DripHelper'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationLoading: false,
      location: null,
      showSignUpModal: false,
      showLoginModal: false
    }
  }

  componentDidMount() {
    this._loadJs()
    setTimeout(() => {
      General.updateAll()
    }, 1000)
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  _goTo() {
    let { location } = this.state
    if (location == null) {
      this.setState({
        locationValidation: 'Please enter an address to begin your order'
      })
      return
    }
    localStorage.setItem('location', JSON.stringify(location))
    DripHelper.trackUserLocation(location)
    window.location = '/customer/restaurants'
  }

  _getCurrentLocation() {
    this.setState({ locationLoading: true, locationValidation: null })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this._showPosition(position)
      })
    } else {
      // Geolocation is not supported by this browser
      this.setState({ locationLoading: false })
    }
  }

  _showPosition(position) {
    CurrentLocation.getLocation(position).then(location => {
      this.setState({ location, locationLoading: false })
    })
  }

  _handleLogin() {
    window.location = '/'
  }

  _handleCreateAccount() {
    window.location = '/'
  }

  _renderNavBarContainer() {
    let buttons = null
    if (AuthManager.getCurrentUser()) {
      buttons = this._renderAccountButtons()
    } else {
      buttons = this._renderAuthButtons()
    }
    return (
      <nav
        id="menu1"
        className="bar bar-1 hidden-xs bar--absolute bar--transparent bar--mobile-sticky"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-2 hidden-xs">
              <div className="bar__module">
                <Logo />
              </div>
              {/*end module*/}
            </div>
            <div className="col-lg-10 col-md-12 text-right text-left-xs text-left-sm">
              {/*end module*/}
              {buttons}
              {/*end module*/}
            </div>
          </div>
          {/*end of row*/}
        </div>
        {/*end of container*/}
      </nav>
    )
  }

  _onBasketButtonPressed() {
    if (AuthManager.getCurrentUser() == null) {
      this.setState({ showLoginModal: true })
      return
    }
    window.location = '/customer/basket'
  }

  _renderAccountButtons() {
    return (
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <BasketButton
            onBasketButtonPressed={() => this._onBasketButtonPressed()}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />
          <a
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            className="btn btn--sm nav-btn"
            data-notification-link="side-menu"
          >
            <span className="btn__text" style={{ fontSize: '18px' }}>
              <i
                className="icon icon--lg icon-User"
                style={{ color: 'white' }}
              />{' '}
              Hi {AuthManager.currentUser.user.first_name}!
            </span>
          </a>
        </div>
      </div>
    )
  }

  _renderAuthButtons() {
    return (
      <div className="bar__module">
      <BasketButton
        onBasketButtonPressed={() => this._onBasketButtonPressed()}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      />
        <a
          className="btn btn--sm type--uppercase"
          onClick={() => this.setState({ showLoginModal: true })}
        >
          <span className="btn__text">Login</span>
        </a>
        <a
          className="btn btn--sm btn--primary type--uppercase"
          style={{
            backgroundColor: global.Colors.Secondary,
            borderColor: '#77678e'
          }}
          onClick={() => this.setState({ showSignUpModal: true })}
          data-modal-index={2}
        >
          <span className="btn__text">Sign Up</span>
        </a>
      </div>
    )
  }

  _renderLocationValidation() {
    if (this.state.locationValidation == null) {
      return null
    }
    return this.state.locationValidation
  }

  _renderLocationIcon() {
    if (this.state.locationLoading) {
      return <i class="fa fa-spinner fa-pulse"></i>
    }
    return <i className="fa fa-map-marker" />
  }

  render() {
    return (
      <div>
        <div className="nav-container ">
          <div className="bar bar--sm visible-xs">
            <div className="container">
              <div className="row">
                <div className="col-3 col-md-2">
                  <Logo />
                </div>
                <div className="col-9 col-md-10 text-right">
                  <a
                    href="#"
                    className="hamburger-toggle"
                    data-toggle-class="#menu1;hidden-xs"
                  >
                    <i className="icon icon--sm stack-interface stack-menu" />
                  </a>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </div>
          {/*end bar*/}
          {this._renderNavBarContainer()}
          {/*end bar*/}
        </div>
        <div className="main-container">
          <section
            className="cover imagebg height-80 text-center parallax"
            data-overlay={6}
          >
            <div className="background-image-holder">
              <img
                alt="background"
                src={require('../../assets/img/landingBackground.jpg')}
              />
            </div>
            <div className="container pos-vertical-center">
              <div className="row">
                <div className="col-md-10 col-lg-8">
                  <h1>Hungry to Happy</h1>
                  <p className="lead">
                    Your favourite food, at your door in minutes
                  </p>
                  <div
                    className="bg--white text-left"
                    style={{
                      borderRadius: 6,
                      background: 'rgba(255,255,255,.4)',
                      paddingTop: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingBottom: 30
                    }}
                  >
                    <form className="form--horizontal row m-0">
                      <div className="col-md-12">
                        <span
                          style={{
                            color: global.Colors.Secondary,
                            marginLeft: 10
                          }}
                        >
                          {this._renderLocationValidation()}
                        </span>
                      </div>
                      <div className="col-md-8 searchLocation">
                        <LocationInput
                          style={{ height: 40, color: 'black' }}
                          location={this.state.location}
                          onUpdated={location => {
                            this.setState({
                              location: location
                            })
                          }}
                        />
                        <a onClick={() => this._getCurrentLocation()}>
                          {this._renderLocationIcon()}
                        </a>
                      </div>

                      <div className="col-md-4">
                        <a
                          onClick={() => {
                            this._goTo()
                          }}
                          className="btn btn--primary type--uppercase search-btn"
                          style={{ width: '100%', color: 'white' }}
                        >
                          Search
                        </a>
                      </div>
                    </form>
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
          <Footer />
        </div>
        <div>
          <div className="all-page-modals">
            <LoginModal
              show={this.state.showLoginModal}
              handleLogin={() => this._handleLogin()}
              onModalHide={() => this.setState({ showLoginModal: false })}
              onCreateAccountPressed={() =>
                this.setState({ showLoginModal: false }, () =>
                  this.setState({ showSignUpModal: true })
                )
              }
            />
            <QuickPanel />
            {/*<div class="loader"></div>*/}
          </div>
          <SignUpModal
            show={this.state.showSignUpModal}
            handleCreateAccount={() => this._handleCreateAccount()}
            onModalHide={() => this.setState({ showSignUpModal: false })}
          />
        </div>
      </div>
    )
  }
}
