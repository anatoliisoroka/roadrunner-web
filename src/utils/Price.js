const CURRENCY_EUR = 'eur'
const CURRENCY_GBP = 'gbp'
const CURRENCY_USD = 'usd'
export default class Price {
  static format(price, currency) {
    let symbol = ''
    if (currency === CURRENCY_EUR) {
      symbol = '€'
    }
    if (currency === CURRENCY_GBP) {
      symbol = '£'
    }
    if (currency === CURRENCY_USD) {
      symbol = '$'
    }
    var decimalPrice = 0
    if (price !== 0) {
      decimalPrice = price / 100
    }
    return symbol + decimalPrice.toFixed(2)
  }
}
