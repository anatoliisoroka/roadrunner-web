import React from 'react'
import { withRouter } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import Slider from 'react-slick'

import GalleryImage from './components/menu/GalleryImage'
import MenuShimmer from './components/menu/MenuShimmer'
import MenuListItem from './components/menu/MenuListItem'
import MenuItemModal from './components/menu/MenuItemModal'
import LoginModal from '../shared/components//modals/LoginModal'
import SignUpModal from '../shared/components/modals/SignUpModal'

import AuthManager from '../../utils/AuthManager'
import BasketManager from '../../utils/BasketManager'
import Backend from '../../utils/Backend'
import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'
import Price from '../../utils/Price'
import PubSub from 'pubsub-js'
import SweetAlert from 'react-bootstrap-sweetalert'
import TextFormat from '../../utils/TextFormat'
import LocationFormat from '../../utils/LocationFormat'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      venue: null,
      venueDetails: null,
      menu: null,
      currency: null,
      selectedMenuItem: null,
      showMenuItemModal: false,
      showExistingBasketAlert: false,
      showLoginModal: false,
      showSignUpModal: false,
      user: null
    }
  }

  componentDidMount() {
    this._getVenueById()
    this._loadJs()
    setTimeout(() => {
      General.updateImageBackgrounds()
    }, 1000)
    this.setState({
      user: AuthManager.currentUser
    })
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  _goToBasket() {
    if (this.state.user == null) {
      this.setState({ showLoginModal: true })
      return
    }
    this.props.history.push('/customer/basket')
  }

  _handleLogin() {
    this.setState(
      { showLoginModal: false, user: AuthManager.currentUser },
      () => {
        window.location.reload()
      }
    )
  }

  _handleCreateAccount(data) {
    this.setState(
      { showSignUpModal: false, user: AuthManager.currentUser },
      () => {
        window.location.reload()
      }
    )
  }

  _getVenueById() {
    let venueId = global.Api.IsDebug ? 63 : 4
    if (!venueId) {
      return
    }
    Backend.getVenueDetailsById(venueId).then(venue => {
      this.setState({ venue }, () => {
        this._loadMenu()
      })
    })
  }

  _checkIfBasketExists() {
    let { venue } = this.state
    let basket = BasketManager.getBasket()
    if (basket == null) {
      this._setNewBasket()
      return
    }
    if (basket.items.length > 0 && basket.venue.id != venue.id) {
      // REPLACES THE BASKET WITH NEW VENUE AND ITEMS
      //this._showExistingMenuAlert()
    }
    if (basket.items.length > 0 && basket.venue.id == venue.id) {
      return
    }
    this._setNewBasket()
  }

  _setNewBasket() {
    let { venueDetails, menu } = this.state
    BasketManager.initBasket()
    BasketManager.updateBasket(venueDetails, menu)
  }

  _renderGalleryImages() {
    let { venueDetails } = this.state
    if (venueDetails == null) {
      return null
    }
    return venueDetails.images.map(image => {
      return <GalleryImage venueDetails={venueDetails} image={image} />
    })
  }

  _onMenuItemPressed(item) {
    this.setState({ showMenuItemModal: true, selectedMenuItem: item })
  }

  _loadMenu() {
    let { venue } = this.state
    if (venue == null) {
      return
    }
    this.setState({ isLoading: true })
    Backend.getMenu(venue.menus)
      .then(menu => {
        this.setState(
          {
            menu: menu,
            currency: menu.currency,
            isLoading: false
          },
          () => {
            this._getVenueDetails()
          }
        )
      })
      .catch(error => {
        this.setState({ isLoading: false })
      })
  }

  _getVenueDetails() {
    this.setState({ isLoading: true })
    let { venue } = this.state
    Backend.getVenueDetails(venue)
      .then(venueDetails => {
        this.setState({ venueDetails, isLoading: false }, () => {
          this._checkIfBasketExists()
        })
      })
      .catch(error => {
        this.setState({ isLoading: false })
      })
  }

  _onBasketUpdated() {
    PubSub.publish(global.Broadcast.BasketUpdate, 'update')
    this.setState({ showMenuItemModal: false })
  }

  _renderMenuNavItems() {
    let { menu } = this.state
    if (menu == null) {
      return null
    }
    return menu.sections.map(section => {
      return (
        <a className="MenuSection" href={'#' + section.title}>
          {section.title}
        </a>
      )
    })
  }

  _renderOpeningHours() {
    let { venueDetails } = this.state
    if (venueDetails == null) {
      return null
    }
    return venueDetails.opening_hours.map(weekday => {
      return <li>{TextFormat.capitalizeFirst(weekday.day)}</li>
    })
  }

  _renderMenuSections() {
    let { menu } = this.state
    if (menu == null) {
      return null
    }
    return menu.sections.map(section => {
      return (
        <section id={section.title} className="bg--secondary">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-12 col-lg-12">
                <h2>{section.title}</h2>
                <div className="row">
                  {this._renderMenuListItems(section.items)}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    })
  }

  _renderMenuListItems(items) {
    return items.map(item => {
      return (
        <MenuListItem
          item={item}
          venue={this.state.venue}
          currency={this.state.currency}
          onMenuItemPressed={item => this._onMenuItemPressed(item)}
          onBasketUpdated={() => this._onBasketUpdated()}
        />
      )
    })
  }

  _renderGalleryText() {
    let { venueDetails } = this.state
    return (
      <div style={{ position: 'absolute', zIndex: 2, top: 220, left: 0, right: 0 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="m-b-0" style={{ color: 'white' }}>
                {venueDetails.title}
              </h1>
              <span style={{ color: 'white' }}>
                {LocationFormat.fullAddress(venueDetails.location)}
              </span>
              <br />
              <div style={{ display: 'inline-block', marginTop: 10 }}>
                <div className="rating" style={{ float: 'left' }}>
                  <StarRatings
                    rating={venueDetails.average_rating}
                    starRatedColor={global.Colors.Primary}
                    starDimension="25px"
                    starSpacing="1px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <div style={{ float: 'right' }}>
                  <label
                    style={{
                      marginLeft: 10,
                      marginTop: 2,
                      fontSize: 16,
                      color: 'white'
                    }}
                  >
                    Rating {venueDetails.average_rating} (
                    {venueDetails.total_ratings})
                  </label>
                </div>
              </div>
              <ol className="breadcrumbs"></ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _renderBasketButton() {
    let basket = BasketManager.getBasket()
    if (!basket) {
      return null
    }
    if (basket.items.length <= 0) {
      return null
    }
    return (
      <div className="col-lg-6 text-right text-center-xs">
        <button
          style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}
          type="button"
          className="btn btn--primary"
          onClick={() => this._goToBasket()}
        >
          Proceed To Basket »
        </button>
      </div>
    )
  }

  render() {
    let { venueDetails } = this.state
    let { google } = this.props
    if (venueDetails == null) {
      return <MenuShimmer />
    }
    return (
      <div className="main-container">
        {this._renderGalleryText()}
        <Slider autoplay dots infinite slidesToShow={1} slidesToScroll={1}>
          {this._renderGalleryImages()}
        </Slider>

        <section className="space--xs bg--secondary">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-12 col-lg-12">
                <div className="menuSections">{this._renderMenuNavItems()}</div>
              </div>
            </div>
          </div>
        </section>
        {this._renderMenuSections()}
        <section className="space--sm bg--secondary">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <div className="text-block">
                  <span className="h5">
                    Minimum order:{' '}
                    {Price.format(
                      venueDetails.minimum_order_amount,
                      venueDetails.currency
                    )}
                  </span>
                </div>
                <div className="text-block">
                  <span className="h5">Delivery Days</span>
                  <ul className="bullets">{this._renderOpeningHours()}</ul>
                </div>
              </div>
              {this._renderBasketButton()}
            </div>
            {/*end of row*/}
          </div>
          {/*end of container*/}
        </section>
        <MenuItemModal
          currency={this.state.currency}
          show={this.state.showMenuItemModal}
          item={this.state.selectedMenuItem}
          onHide={() => this.setState({ showMenuItemModal: false })}
          onBasketUpdated={() => this._onBasketUpdated()}
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
        <SweetAlert
          show={this.state.showExistingBasketAlert}
          error
          title="Clear exisitng basket?"
          onConfirm={() => this.setState({ showExistingBasketAlert: false })}
        >
          {this.state.basketExistingMessage}
        </SweetAlert>
      </div>
    )
  }
}

export default withRouter(Menu)