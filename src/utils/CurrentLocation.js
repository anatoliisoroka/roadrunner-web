import Geocode from 'react-geocode'
export default class CurrentLocation {
  static getLocation(position) {
    Geocode.setApiKey(global.Api.GMapsKey)
    return Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      response => {
        return { line_1: response.results[0].formatted_address }
      },
      error => {
        console.log(error)
      }
    )
  }
}
