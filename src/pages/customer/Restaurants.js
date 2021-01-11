import React from 'react'
import NavBar from './components/NavBar'

import BasketButton from '../customer/components/basket/BasketButton'
import Logo from '../shared/components/common/Logo'
import LoginModal from '../shared/components/modals/LoginModal'
import SignUpModal from '../shared/components/modals/SignUpModal'
import BasketManager from '../../utils/BasketManager'

import LazyLoadingList from '../shared/components/common/LazyLoadingList'
import SingleSelectItem from '../customer/components/common/SingleSelectItem'
import MultiSelectItem from '../customer/components/common/MultiSelectItem'
import VenueCard from '../customer/components/VenueCard'
import TimeModal from '../shared/components/modals/TimeModal'

import Backend from '../../utils/Backend'
import List from '../../utils/List'
import General from '../../utils/General'
import ScriptCache from '../../utils/ScriptCache'
import LocationFormat from '../../utils/LocationFormat'
import PubSub from 'pubsub-js'
import moment from 'moment'
import AuthManager from '../../utils/AuthManager'

import Background from '../../assets/img/food-pattern-3pct.png'
export default class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collectSelected: false,
      deliveryTime: props.deliveryTime,
      filters: props.filters,
      orderOptions: [],
      offers: [],
      categories: [],
      dietaries: [],
      selectedOrderOption: null,
      selectedOffer: null,
      selectedDietaries: [],
      selectedCategories: [],
      filterParams: null,
      showTimeModal: false,
      showSignUpModal: false,
      showLoginModal: false
    }
  }

  componentDidMount() {
    this._loadJs()
    this._getLocation()
    this._getFilters()
    this._setSearchParam()
    General.updateModals()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== AuthManager.getCurrentUser()) {
      this.setState({ user: AuthManager.getCurrentUser() })
    }
  }

  _handleSearch = General.debounce(() => {
    PubSub.publish(global.Broadcast.VenueSearch, this.state.searchTerm)
  }, 500)

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  _getLocation() {
    let location = JSON.parse(localStorage.getItem('location'))
    this.setState({ location })
  }

  _setSearchParam() {
    PubSub.subscribe(global.Broadcast.VenueSearch, (name, searchTerm) => {
      this.setState(
        {
          searchTerm
        },
        () => {
          this._updateFilters()
        }
      )
    })
  }

  _handleLogin() {
    this.setState({ showLoginModal: false }, () => {
      this.props.history.push('/customer/basket')
    })
  }

  _handleCreateAccount(data) {
    this.setState({ showSignUpModal: false }, () => {
      this.props.history.push('/customer/basket')
    })
  }

  _goTo(venue) {
    this.props.history.push(`/customer/menu/${venue.id}`, { venue })
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
      return this._renderAuthButtons()
    }
    return <>{this._renderUserButton()}</>
  }

  _renderBasketButton() {
    return (
      <BasketButton
        onBasketButtonPressed={() => this._onBasketButtonPressed()}
      />
    )
  }

  _renderAuthButtons() {
    return (
      <div className="bar__module">
        <a
          className="btn btn--sm type--uppercase"
          style={{
            marginLeft: 15
          }}
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

  _renderSearchBar() {
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

  _renderTitle() {
    let { location } = this.state
    let title = ''
    if (!this.state.collectSelected) {
      title = 'Delivering to ' + location.line_1
    } else {
      title = 'Collection'
    }
    return (
      <div className="col-md-9">
        <h2>
          <strong>{title}</strong>
        </h2>
      </div>
    )
  }

  _renderArrivalButtonTitle() {
    if (!this.state.collectSelected) {
      localStorage.setItem('arrival', JSON.stringify('delivery'))
      return 'Change to collection'
    }
    localStorage.setItem('arrival', JSON.stringify('collection'))
    return 'Change to delivery'
  }

  _updateArrivalStatus() {
    this.setState(
      {
        collectSelected: !this.state.collectSelected
      },
      () => this._updateFilters()
    )
  }

  _getFilters() {
    this.setState({ isLoading: true })
    Backend.getFilters()
      .then(filters => {
        this.setState(
          {
            orderOptions: filters.order_options,
            offers: filters.offers,
            categories: filters.categories,
            dietaries: filters.dietaries,
            isLoading: false,
            selectedOrderOption: filters.order_options[0]
          },
          () => this._updateFilters()
        )
      })
      .catch(error => {
        console.log('ERROR', error)
        this.setState({ isLoading: false })
      })
  }

  _updateFilters() {
    let { arrivalTime } = this.state
    let params = {
      order_by: this.state.selectedOrderOption.value
    }
    if (!this.state.collectSelected) {
      params['delivery'] = true
    } else {
      params['collection'] = true
    }
    if (this.state.selectedOffer != null) {
      if (this.state.selectedOffer.value == 'special_offer') {
        params['special_offers'] = true
        params['meal_deals'] = false
      }
      if (this.state.selectedOffer.value == 'meal_deals') {
        params['special_offers'] = true
        params['meal_deals'] = false
      }
      if (this.state.selectedOffer.value == 'all_offers') {
        params['special_offers'] = true
        params['meal_deals'] = true
      }
    }

    if (this.state.selectedDietaries.length > 0) {
      params['dietaries'] = this.state.selectedDietaries.toString()
    }

    if (this.state.selectedCategories.length > 0) {
      params['categories'] = this.state.selectedCategories.toString()
    }
    if (this.state.searchTerm != null) {
      params['search_term'] = this.state.searchTerm
    }
    params['order_direction'] = 'desc'
    if (this.state.collectSelected) {
      params['collection_at'] =
        arrivalTime == null
          ? moment()
              .add(15, 'minutes')
              .toISOString()
          : moment(arrivalTime).toISOString()
    }
    if (!this.state.collectSelected) {
      params['deliver_at'] =
        arrivalTime == null
          ? moment()
              .add(15, 'minutes')
              .toISOString()
          : moment(arrivalTime).toISOString()
    }
    let filters = ''
    for (let key in params) {
      let filter = key + '=' + params[key] + '&'
      filters += filter
    }
    // Remove the last character &
    filters = filters.slice(0, -1)
    this.setState({ filterParams: filters })
  }

  _checkIfSelected(list, id) {
    let index = List.indexOf(list, id)
    return index > -1
  }

  _updateDietaries(item, selected) {
    let { selectedDietaries } = this.state
    if (selected) {
      selectedDietaries.push(item.id)
    } else {
      List.removeItem(selectedDietaries, item.id)
    }
    this.setState({ selectedDietaries }, () => {
      this._updateFilters()
    })
  }

  _updateCategories(item, selected) {
    let { selectedCategories } = this.state
    if (selected) {
      selectedCategories.push(item.id)
    } else {
      List.removeItem(selectedCategories, item.id)
    }
    this.setState({ selectedCategories }, () => {
      this._updateFilters()
    })
  }

  _renderCategoryOptions() {
    let { categories } = this.state
    if (categories == null) {
      return null
    }
    return (
      <div className="foodTypes">
        <h5>Food Categories</h5>
        <div className="foodList">{this._renderCategories()}</div>
      </div>
    )
  }

  _renderCategories() {
    let { categories } = this.state
    return categories.map(category => {
      return (
        <MultiSelectItem
          item={category}
          selected={this._checkIfSelected(
            this.state.selectedCategories,
            category.id
          )}
          onItemSelected={() => this._updateCategories(category, true)}
          onItemUnselected={() => this._updateCategories(category, false)}
        />
      )
    })
  }

  _renderSortByOptions() {
    let { orderOptions } = this.state
    if (orderOptions == null) {
      return null
    }
    return (
      <div className="sortBy">
        <h5>Sort By</h5>
        <div>{this._renderSortBy()}</div>
      </div>
    )
  }

  _renderSortBy() {
    let { orderOptions } = this.state
    return orderOptions.map(option => {
      return (
        <SingleSelectItem
          item={option}
          selected={this.state.selectedOrderOption == option}
          onItemSelected={() =>
            this.setState({ selectedOrderOption: option }, () => {
              this._updateFilters()
            })
          }
        />
      )
    })
  }

  _renderOffersOptions() {
    let { offers } = this.state
    if (offers == null) {
      return null
    }
    return (
      <div className="sortBy">
        <h5>Offers</h5>
        <div>{this._renderOffers()}</div>
      </div>
    )
  }

  _renderOffers() {
    let { offers } = this.state
    return offers.map(offer => {
      return (
        <SingleSelectItem
          item={offer}
          selected={this.state.selectedOffer == offer}
          onItemUnselected={() =>
            this.setState({ selectedOffer: null }, () => {
              this._updateFilters()
            })
          }
          onItemSelected={() =>
            this.setState({ selectedOffer: offer }, () => this._updateFilters())
          }
        />
      )
    })
  }

  _renderDietaryOptions() {
    let { dietaries } = this.state
    if (dietaries == null) {
      return null
    }
    return (
      <div className="foodTypes">
        <h5>Dietary</h5>
        <div className="foodList">{this._renderDietaries()}</div>
      </div>
    )
  }

  _renderDietaries() {
    let { dietaries } = this.state
    return dietaries.map(dietary => {
      return (
        <MultiSelectItem
          item={dietary}
          selected={this._checkIfSelected(
            this.state.selectedDietaries,
            dietary.id
          )}
          onItemSelected={() => this._updateDietaries(dietary, true)}
          onItemUnselected={() => this._updateDietaries(dietary, false)}
        />
      )
    })
  }

  _renderTopVenues() {
    let { location } = this.state
    let url =
      global.Api.TopVenues +
      '&has_menu=true' +
      '&latitude=' +
      location.latitude +
      '&longitude=' +
      location.longitude
    if (!this.state.collectSelected) {
      url += '&delivery=true'
    } else {
      url += '&collection=true'
    }
    return (
      <LazyLoadingList
        endpoint={url}
        renderItem={item => {
          return <VenueCard venue={item} onPress={venue => this._goTo(venue)} />
        }}
      />
    )
  }

  _renderVenues() {
    let { location } = this.state
    if (this.state.filterParams == null) {
      return null
    }
    return (
      <LazyLoadingList
        ref="list"
        endpoint={
          global.Api.Venues +
          '?has_menu=true&' +
          this.state.filterParams +
          '&latitude=' +
          location.latitude +
          '&longitude=' +
          location.longitude
        }
        renderItem={item => {
          return (
            <VenueCard
              key={item.id}
              venue={item}
              onPress={venue => this._goTo(venue)}
            />
          )
        }}
      />
    )
  }

  _renderArrivalTitle() {
    let { collectSelected } = this.state
    return collectSelected == true ? 'Collection' : 'Delivery'
  }

  _renderArrivalTime() {
    let { arrivalTime } = this.state
    if (arrivalTime == null) {
      return 'Now'
    }
    return moment(arrivalTime).calendar()
  }

  render() {
    let { location } = this.state
    if (location == null) {
      return null
    }
    return (
      <div>
        <div className="nav-container ">
          <nav
            id="menu1"
            className="bar bar--sm bar-1 active-xs "
            data-scroll-class="100px:pos-fixed"
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-md-2 active-xs">
                  <div className="bar__module">
                    <Logo />
                  </div>
                  {/*end module*/}
                </div>
                <div className="col-lg-10 col-md-12 text-right text-left-xs text-left-sm">
                  <div className="row">
                    <div className="col-md-6">{this._renderSearchBar()}</div>
                    <div className="col-md-6">
                      {this._renderBasketButton()}
                      {this._renderButtons()}
                    </div>
                  </div>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </nav>

          {/*end bar*/}
        </div>
        <div
          className="main-container bg--secondary"
          style={{
            backgroundImage: `url(${Background})`,
            opacity: 1,
            backgroundSize: '300px 300px'
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <section
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
                className="filters bg-white"
              >
                <div className="container" style={{ padding: '40px' }}>
                  <span className="deliverTime">
                    {this._renderArrivalTitle()} Time:
                  </span>
                  <div className="addressTime">
                    <a
                      href="#"
                      onClick={() => this.setState({ showTimeModal: true })}
                    >
                      <span className="deliverTime">
                        {this._renderArrivalTime()}
                      </span>
                      <br />
                    </a>
                    <br />
                    <span className="deliverTime">Location:</span>
                    <br />
                    <a style={{ color: global.Colors.Primary }}>
                      <span className="deliverAddress">{location.line_1}</span>
                      <br />
                    </a>
                  </div>
                  <hr />
                  {this._renderSortByOptions()}
                  <hr />
                  {this._renderOffersOptions()}
                  <hr />
                  {this._renderCategoryOptions()}
                  <hr />
                  {this._renderDietaryOptions()}
                </div>
              </section>
            </div>
            <div
              className="col-md-9"
              style={{ backgroundColor: 'transparent' }}
            >
              <section
                className="space--sm bg--secondary"
                style={{ backgroundColor: 'transparent' }}
              >
                <div
                  className="container"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className="row">
                    {this._renderTitle()}
                    <div className="col-md-3">
                      <a
                        onClick={() => this._updateArrivalStatus()}
                        className="btn btn--secondary"
                      >
                        {this._renderArrivalButtonTitle()}
                      </a>
                    </div>
                  </div>
                  <h4>
                    <strong>Restaurants</strong>
                  </h4>
                  <div className="row">
                    <div className="col-md-12">
                      <div
                        className="masonry__container row masonry--active"
                        style={{
                          display: 'flex'
                        }}
                      >
                        {this._renderVenues()}
                      </div>
                      {/*end masonry container*/}

                      {/*end masonry*/}
                    </div>
                  </div>
                  {/*end of row*/}
                </div>
                {/*end of container*/}
              </section>
            </div>
          </div>
        </div>
        {/*<div class="loader"></div>*/}
        <TimeModal
          collectSelected={this.state.collectSelected}
          show={this.state.showTimeModal}
          onHide={() => this.setState({ showTimeModal: false })}
          onUpdateTimePressed={datetime =>
            this.setState(
              { showTimeModal: false, arrivalTime: datetime },
              () => {
                this._updateFilters()
              }
            )
          }
        />
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
        <a
          className="back-to-top inner-link"
          onClick={() => window.scrollTo(0, 0)}
          data-scroll-class="100vh:active"
        >
          <i className="stack-interface stack-up-open-big" />
        </a>
      </div>
    )
  }
}
