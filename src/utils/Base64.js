export default class Base64 {
  static encode(string){
    return new Buffer(string).toString('base64')
  }
}
