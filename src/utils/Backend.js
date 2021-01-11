import FetchHelper from './FetchHelper'
import AuthManager from './AuthManager'

export default class Backend {
  static cancelOrder(order) {
    let data = {
      status: 'cancelled'
    }
    return FetchHelper.patch(global.Api.Orders + '/' + order.id, data)
  }

  static checkPendingReviews() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static deleteAddress(address) {
    return FetchHelper.delete(global.Api.Locations + '/' + address.id)
  }

  static deletePaymentMethod(card) {
    return new Promise((resolve, reject) => {
      resolve(card)
    })
  }

  static filterVenues(params) {
    let filters = ''
    for (let key in params) {
      let filter = key + '=' + params[key] + '&'
      filters += filter
    }
    // Remove the last character &
    filters = filters.slice(0, -1)
    return FetchHelper.get(global.Api.Venues + '?' + filters)
  }

  static getCategories() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static getCustomerLocations() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static getUserDietaries() {
    return FetchHelper.get(global.Api.Dietaries + '?selected=true')
  }

  static getDietaries() {
    return FetchHelper.get(global.Api.Dietaries)
  }

  static getFilters() {
    return FetchHelper.get(global.Api.Filters)
  }

  static getIncomeStatistics() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static getMenu(menus) {
    return FetchHelper.get(global.Api.Menu + '/' + menus[0])
  }

  static getOrderDetails(order) {
    return FetchHelper.get(global.Api.Orders + '/' + order.id)
  }

  static getVenue() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static getVenues() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static getVenueDetails(venue) {
    return FetchHelper.get(global.Api.Venues + '/' + venue.id)
  }

  static getVenueDetailsById(id) {
    return FetchHelper.get(global.Api.Venues + '/' + id)
  }

  static getVenueOrders(bottomIndex, topIndex) {
    let params = ''
    if (bottomIndex == 0) {
      params = '?status=pending&food_status=pending'
    }
    if (bottomIndex == 1) {
      if (topIndex == 0) {
        params = '?status=accepted&food_status=pending'
      } else {
        params = '?status=accepted&food_status=preparing'
      }
    }
    if (bottomIndex == 2) {
      params = '?status=accepted&food_status=finished'
    }
    return FetchHelper.get(global.Api.Orders + params)
  }

  static resetPassword() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static saveCard(token) {
    let data = {
      source: token.id,
      is_default: false
    }
    return FetchHelper.post(global.Api.Cards, data)
  }

  static setDefaultPaymentMethod(card) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static saveAddress(address) {
    var line1 = address.line_1.substr(0, address.line_1.indexOf(','))
    let data = {
      address_line_1: line1,
      longitude: address.longitude,
      latitude: address.latitude
    }
    if (address.line_2) {
      data['address_line_2'] = address.line_2
    }
    if (address.line_3) {
      data['address_line_3'] = address.line_3
    }
    if (address.city) {
      data['city'] = address.city
    }
    if (address.city == null) {
      data['city'] = address.state
    }
    if (address.state) {
      data['state'] = address.state
    }
    if (address.country) {
      data['country'] = address.country
    }
    data['country_short'] = address.country_short

    return FetchHelper.post(global.Api.Locations, data)
  }

  static sendOrder(order) {
    return FetchHelper.post(global.Api.Orders, order)
  }

  static submitFeedback(data) {
    return FetchHelper.post(global.Api.Feedback, data)
  }

  static submitOrderFeedback(feedbackData) {
    let data = feedbackData
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static skipReview(order) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  static updateOrderStatus(order, status, foodStatus) {
    let data = {}
    if (foodStatus == 'pending') {
      data.status = status
    } else {
      data.status = status
      data.food_status = foodStatus
    }
    return FetchHelper.patch(global.Api.Orders + '/' + order.id, data)
  }

  static getLocations(venue) {
    return FetchHelper.get(global.Api.Locations + '?venue=' + venue.id)
  }

  static updateCard(card) {
    let data = {
      is_default: true
    }
    return FetchHelper.patch(global.Api.Cards + '/' + card.id, data)
  }

  static updateUserDetails(userData) {
    let user = AuthManager.getCurrentUser()
    return FetchHelper.patch(
      global.Api.Customers + '/' + user.user.id,
      userData
    )
  }

  static getDeliveryFee(venue, location, longitude, latitude) {
    let params = ''
    if (location != null) {
      params = '&location=' + location
    } else {
      params = '&longitude=' + longitude + '&latitude=' + latitude
    }
    return FetchHelper.get(
      global.Api.DeliveryFee + '?venue=' + venue.id + params
    )
  }

  static updateDietaries(dietaries) {
    let data = {
      dietaries
    }
    return FetchHelper.patch(global.Api.Dietaries, data)
  }

  static validateCode(couponCode, venue) {
    let url = global.Api.Coupons + '?code=' + couponCode + '&venue=' + venue.id

    return FetchHelper.get(url)
  }

  static getVenueCategories() {
    return FetchHelper.get(global.Api.Categories)
  }

  static getFacebookCode(accessToken) {
    return FetchHelper.get(
      global.Api.Facebook +
        '?access_token=' +
        accessToken +
        '&redirect_uri=' +
        global.Api.Base + '/' + '&long_lived=true'
    ).then(response => {
      return response.code
    })
  }

  static registerWebPush(data) {
    if (data.browser == 'NETSCAPE') {
      data.browser = 'CHROME'
    }
    return FetchHelper.post(global.Api.WebPush, data)
  }

  static track(data) {
    return FetchHelper.post(global.Api.Track, data)
  }
}
