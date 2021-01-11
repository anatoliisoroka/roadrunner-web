import moment from 'moment'
import General from './General'
import Backend from './Backend'
import AuthManager from './AuthManager'
import DripHelper from './DripHelper'

var basket = null

const DEFAULT_BASKET = {
  venue: { id: null },
  items: []
}
const ACTION_CREATED = 'created'
const ACTION_UPDATED = 'updated'

const COUPON_TYPE_PERCENTAGE = 'percentage'
const COUPON_TYPE_CURRENCY = 'currency'
export default class BasketManager {
  static initBasket() {
    if (BasketManager.basket != null) {
      BasketManager.clearBasket()
    }
    let data = { ...DEFAULT_BASKET }
    data.id = General.uuid()
    data.action = ACTION_CREATED
    BasketManager.set(data)
  }

  static updateBasket(venue, menu) {
    let basket = BasketManager.basket
    basket.venue = venue
    basket.menuId = menu.id
    BasketManager.set(basket)
  }

  static getBasket() {
    if (BasketManager.basket == null) {
      let basket = localStorage.getItem('basket')
      BasketManager.basket = JSON.parse(basket)
    }
    return BasketManager.basket
  }
  static set(basket) {
    localStorage.setItem('basket', JSON.stringify(basket))
    BasketManager.basket = basket
    DripHelper.trackBasket()
  }

  static addToBasket(item) {
    let basket = BasketManager.getBasket();
    let existing_item = basket.items.find(eItem => {
      return eItem.id == item.id
    })

    if (existing_item) {
      existing_item.quantity = existing_item.quantity + item.quantity;
    } else {
      basket.items.push(item)
    }

    basket.action = ACTION_UPDATED
    BasketManager.set(basket)
    return BasketManager.basket
  }

  static removeFromBasket(index, item) {
    BasketManager.basket.items.splice(index, 1)
    BasketManager.set(BasketManager.basket)
    return BasketManager.basket
  }

  static clearBasket() {
    BasketManager.set(null)
  }

  static resetBasket() {
    return BasketManager.initBasket()
  }

  static updateItemQuantity(basketItemIndex, quantity) {
    let basket = BasketManager.basket
    basket.items.map((item, index) => {
      if (index === basketItemIndex) {
        if (quantity == 0) {
          BasketManager.removeFromBasket(index, item)
        }
        item.quantity = quantity
      }
    })
    basket.action = ACTION_UPDATED
    BasketManager.set(basket)
  }

  static calculateSubTotal() {
    let basket = BasketManager.basket
    var subtotal = 0
    var itemPrice = 0
    var itemQuantity = 0
    var extraCharge = 0
    if (basket == null) {
      return null
    }
    basket.items.forEach(item => {
      itemPrice = item.price
      itemQuantity = item.quantity
      let extraCharge = 0
      item.option_groups.forEach(option_group => {
        option_group.options.forEach(option => {
          if (option.price != null) {
            extraCharge += option.price * option.quantity
          }
        })
      })
      let totalItemPrice = (itemPrice + extraCharge) * itemQuantity
      subtotal += totalItemPrice
    })
    return subtotal
  }

  static getVenue() {
    let basket = BasketManager.basket
    let venue = basket.venue
    return venue
  }

  static setVenue(venue) {
    let basket = BasketManager.basket
    basket.venue = venue
    BasketManager.set(basket)
  }

  static getTotalPrice(isDeliverSelected, coupon) {
    let subTotal = BasketManager.calculateSubTotal()
    let venue = BasketManager.getVenue()
    let couponValue = BasketManager.getCouponValue(coupon, subTotal)

    let deliveryFee = isDeliverSelected ? venue.delivery_fee : 0
    let total = subTotal + deliveryFee - couponValue

    let roundedTotal = Math.round(total)
    return roundedTotal
  }

  static getCouponValue(coupon, subTotal) {
    let subTotalValue = subTotal
    if (!subTotalValue) {
      subTotalValue = BasketManager.calculateSubTotal()
    }
    let couponType = coupon ? coupon.type : null
    let couponValue = 0

    switch (couponType) {
      case COUPON_TYPE_CURRENCY:
        couponValue = coupon.value
        break
      case COUPON_TYPE_PERCENTAGE:
        couponValue = coupon.value * subTotalValue
        break
    }

    return couponValue
  }

  static createOrder(
    readyAt,
    paymentType,
    delivery,
    cutlery,
    instructions,
    deliveryLocation,
    cardId,
    coupon,
    venue
  ) {
    let basket = BasketManager.getBasket()
    let totalPrice = BasketManager.getTotalPrice(delivery, coupon)
    let order = {
      venue: basket.venue.id,
      menu: basket.menuId,
      expected_price: totalPrice,
      ready_at: readyAt,
      payment_type: paymentType,
      delivery,
      cutlery,
      items: basket.items
    }
    if (instructions != null) {
      order['instructions'] = instructions
    }
    if (deliveryLocation != null) {
      order['location'] = deliveryLocation.value
    }
    if (cardId != null) {
      order['card'] = cardId
    }
    if (coupon != null) {
      order['coupon'] = coupon.id
    }
    return order
  }

  static updateBasketAction() {
    let basket = BasketManager.getBasket()
    basket.action = ACTION_UPDATED
    BasketManager.set(basket)
  }

  static _calculateSingleItemTotalPrice(item) {
    let itemPrice = item.price
    let itemQuantity = item.quantity
    let optionsTotalPrice = 0
    item.option_groups.forEach(option_group => {
      option_group.options.forEach(option => {
        if (option.price != null) {
          optionsTotalPrice += option.price * option.quantity
        }
      })
    })
    let totalItemPrice = (itemPrice + optionsTotalPrice) * itemQuantity
    return totalItemPrice
  }

  static getTrackData() {
    let currentUser = AuthManager.getCurrentUser()
    let basket = BasketManager.getBasket()
    if(!basket){
      return null
    }

    let venue = basket.venue
    if(!venue.id){
      return null
    }
    let currency = venue.currency

    let trackData = {
      provider: venue.title,
      email: currentUser.user.email,
      action: basket.action,
      cart_id: basket.id,
      occurred_at: moment().toISOString(),
      grand_total: BasketManager.calculateSubTotal()/100,
      total_discounts: basket.discountAmount,
      currency: currency.toUpperCase(),
      cart_url: 'https://shop.roadrunnershopping.com/customer/basket',
      items: []
    }

    trackData.items = BasketManager.getItemsTrackData(basket.items)
    return trackData
  }

  static getItemsTrackData(items){
    let itemsTrackData = items.map(item => {
      return {
        product_id: `${item.id}`,
        product_variant_id: `${item.id}`,
        name: item.title,
        price: item.price/100,
        quantity: item.quantity,
        image_url: item.image ? item.image.original : undefined
      }
    })

    return itemsTrackData
  }
}
