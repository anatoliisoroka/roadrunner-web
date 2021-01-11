import React from 'react'
import { withRouter } from 'react-router-dom'

import BasketButton from './basket/BasketButton'
import Logo from '../../shared/components/common/Logo'
import LoginModal from '../../shared/components/modals/LoginModal'
import SignUpModal from '../../shared/components/modals/SignUpModal'
import QuickPanel from '../../customer/components/QuickPanel'

import BasketManager from '../../../utils/BasketManager'
import General from '../../../utils/General'
import AuthManager from '../../../utils/AuthManager'
import ScriptCache from '../../../utils/ScriptCache'
import PubSub from 'pubsub-js'
class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: AuthManager.getCurrentUser(),
      basket: BasketManager.getBasket(),
      showSignUpModal: false,
      showLoginModal: false
    }
  }

  componentDidMount() {
    this._loadJs()
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== AuthManager.getCurrentUser()) {
      this.setState({ user: AuthManager.getCurrentUser() })
    }
  }

  _handleSearch = General.debounce(() => {
    PubSub.publish(global.Broadcast.VenueSearch, this.state.searchTerm)
  }, 500)

  _renderSearchBar() {
    let path = this.props.location.pathname
    if (path != '/customer/restaurants') {
      return null
    }
    return (
      <input
        type="text"
        name="search"
        placeholder="Find a restaurant..."
        onChange={event => {
          this.setState(
            {
              searchTerm: event.target.value
            },
            () => this._handleSearch()
          )
        }}
      />
    )
  }

  _onBasketButtonPressed() {
    if (this.state.user == null) {
      this.setState({ showLoginModal: true })
      return
    }
    this.props.history.push('/customer/basket')
  }

  _renderButtons() {
    if (this.state.user == null) {
      return (
        <>
          {this._renderBasketButton()}
          {this._renderAuthButtons()}
        </>
      )
    }
    return (
      <>
        {this._renderBasketButton()}
        {this._renderUserButton()}
      </>
    )
  }

  _renderBasketButton() {
    return (
      <BasketButton
        style={{ marginRight: 10 }}
        onBasketButtonPressed={() => this._onBasketButtonPressed()}
      />
    )
  }

  _renderAuthButtons() {
    return (
      <div className="bar__module">
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

  _renderUserButton() {
    let { user } = this.state
    if (user == null) {
      return null
    }
    return (
      <a className="btn btn--sm nav-btn" data-notification-link="side-menu">
        <span className="btn__text" style={{ fontSize: '18px' }}>
          <i className="icon icon--lg icon-User nav-icons" /> Hi{' '}
          {user.user.first_name}!
        </span>
      </a>
    )
  }

  _handleLogin() {
    this.setState({ showLoginModal: false }, () => {
      window.location.reload()
    })
  }

  _handleCreateAccount(data) {
    this.setState({ showSignUpModal: false }, () => {
      window.location.reload()
    })
  }

  render() {
    if (this.props.location.pathname == '/customer/restaurants') {
      return null
    }
    return (
      <>
        <div className="nav-container">
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
          <nav
            id="menu1"
            className="bar bar-1 hidden-xs bar--absolute" 
            data-scroll-class="366px:pos-fixed"
            style={{ backgroundColor: 'white' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-1 col-md-2 hidden-xs">
                  <div className="bar__module">
                    <Logo />
                  </div>
                  {/*end module*/}
                </div>
                <div className="col-lg-11 col-md-10 text-right text-left-xs text-left-sm">
                  {/*end module*/}
                  {this._renderButtons()}
                  {/*end module*/}
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </nav>
          {/*end bar*/}
        </div>

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
        <SignUpModal
          show={this.state.showSignUpModal}
          handleCreateAccount={data => this._handleCreateAccount(data)}
          onModalHide={() => this.setState({ showSignUpModal: false })}
        />
        {/*end bar*/}
        <QuickPanel />
      </>
    )
  }
}

export default withRouter(NavBar)
