export default class LocationFormat {
  static fullAddress(location) {
    let address2 = ''
    let address3 = ''
    let cityState = ''
    let postalCode = ''
    if (location.address_line_2 || location.address_line_2 != null) {
      address2 = location.address_line_2 + ',\n'
    }
    if (location.address_line_3 || location.address_line_3 != null) {
      address3 = location.address_line_3 + ',\n'
    }
    if (location.city === location.state) {
      cityState = location.city + ',\n'
    } else {
      cityState = location.city + ',\n' + location.state + ',\n'
    }
    if (location.postal_code || location.postal_code != null) {
      postalCode = location.postal_code
    }
    return (
      location.address_line_1 +
      ',\n' +
      address2 +
      address3 +
      cityState +
      location.country +
      '\n' +
      postalCode
    )
  }
}
