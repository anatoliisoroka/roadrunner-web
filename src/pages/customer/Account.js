import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import TextField from '../shared/components/common/TextField'
import NavBar from './components/NavBar'
import QuickPanel from './components/QuickPanel'

import ProfileDetails from '../customer/components/account/ProfileDetails'
import UpdatePassword from '../customer/components/account/UpdatePassword'
import Address from '../customer/components/account/Address'
import OrderHistory from '../customer/components/account/OrderHistory'
import Dietaries from '../customer/components/account/Dietaries'
import Payment from '../customer/components/account/Payment'

import ConfirmationModal from '../shared/components/modals/ConfirmationModal'

import LocationFormat from '../../utils/LocationFormat'
import Backend from '../../utils/Backend'
import AuthManager from '../../utils/AuthManager'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'

export default class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: AuthManager.getCurrentUser(),
      selectedOrder: null,
      showNewAddressModal: false,
      showConfirmationModal: false,
      profileActive: true
    }
  }

  componentDidMount() {
    this._loadJs()
    General.updateFormListeners()
    General.updateModals()
  }

  _UpdateUser() {
    AuthManager.refreshCurrentUser().then(user => {
      this.setState({ user })
    })
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  _showPasswordUpdateAlert() {
    let title = 'Your password has been successfully updated'
    this.setState({
      showConfirmationModal: true,
      confirmationModalTitle: title
    })
  }

  _setActive(key) {
    this.setState(
      {
        profileActive: false,
        passwordActive: false,
        addressActive: false,
        historyActive: false,
        dietariesActive: false,
        paymentActive: false,
        emailActive: false
      },
      () => {
        let state = { ...this.state }
        state[key] = true
        this.setState(state)
      }
    )
  }

  _setNotificationsActive() {
    if (this.state.emailActive) {
      return 'account-tab'
    }
    return 'hidden account-tab'
  }

  render() {
    let { user } = this.state.user
    return (
      <>
        <section className="bg--secondary space--sm">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="boxed boxed--lg boxed--border">
                  <div className="text-block text-center">
                    <span className="h5">
                      {user.first_name} {user.last_name}
                    </span>
                  </div>
                  <hr />
                  <div className="text-block">
                    <ul className="menu-vertical">
                      <li>
                        <a
                          href="#"
                          onClick={() => this._setActive('profileActive')}
                          data-toggle-class=".account-tab:not(.hidden);hidden|#account-profile;hidden"
                        >
                          My Details
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => this._setActive('passwordActive')}
                          data-toggle-class=".account-tab:not(.hidden);hidden|#account-password;hidden"
                        >
                          Update Password
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => this._setActive('paymentActive')}
                          data-toggle-class=".account-tab:not(.hidden);hidden|#account-billing;hidden"
                        >
                          Payment Methods
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => this._setActive('addressActive')}
                          data-toggle-class=".account-tab:not(.hidden);hidden|#account-addresses;hidden"
                        >
                          Delivery Addresses
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          onClick={() => this._setActive('historyActive')}
                          data-toggle-class=".account-tab:not(.hidden);hidden|#account-history;hidden"
                        >
                          Order History
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => this._setActive('dietariesActive')}
                          data-toggle-class=".account-tab:not(.hidden);hidden|#dietaries;hidden"
                        >
                          Dietary Requirements
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="boxed boxed--lg boxed--border" style={{overflow: "unset"}}>
                  <ProfileDetails
                    user={user}
                    active={this.state.profileActive}
                    onProfileUpdated={() => this._UpdateUser()}
                  />
                  <UpdatePassword
                    active={this.state.passwordActive}
                    onPasswordUpdated={() => this._showPasswordUpdateAlert()}
                  />
                  <Address
                    user={this.state.user}
                    active={this.state.addressActive}
                    onUserUpdated={() => this._UpdateUser()}
                  />
                  <OrderHistory
                    active={this.state.historyActive}
                    user={this.state.user}
                  />
                  <Dietaries active={this.state.dietariesActive} />
                  <Payment
                    active={this.state.paymentActive}
                    user={this.state.user}
                    onUserUpdated={() => this._UpdateUser()}
                  />
                  <div
                    id="account-notifications"
                    className={this._setNotificationsActive()}
                  >
                    <h4>Email Notifications</h4>
                    <p>
                      Select the frequency with which you'd like to recieve
                      product summary emails:
                    </p>
                    <form>
                      <div className="boxed bg--secondary boxed--border row">
                        <div className="col-4 text-center">
                          <div className="input-radio">
                            <span>Never</span>
                            <input type="radio" />
                            <label />
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="input-radio checked">
                            <span>Weekly</span>
                            <input
                              type="radio"
                              name="frequency"
                              defaultValue="weekly"
                              className="validate-required"
                            />
                            <label />
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="input-radio">
                            <span>Monthly</span>
                            <input
                              type="radio"
                              name="frequency"
                              defaultValue="monthly"
                              className="validate-required"
                            />
                            <label />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-5">
                          <button
                            type="button"
                            className="btn btn--primary type--uppercase"
                          >
                            Save Preferences
                          </button>
                        </div>
                      </div>
                      {/*end of row*/}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*end of row*/}
          </div>
          {/*end of container*/}
        </section>

        {/*<div class="loader"></div>*/}

        <ConfirmationModal
          item={this.state.confirmationModalItem}
          show={this.state.showConfirmationModal}
          type={this.state.confirmationModalType}
          title={this.state.confirmationModalTitle}
          onConfirmPressed={() => this._confirmModalActionPressed()}
          onHide={() => this.setState({ showConfirmationModal: false })}
        />
      </>
    )
  }
}
