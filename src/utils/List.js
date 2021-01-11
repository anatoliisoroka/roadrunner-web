export default class List {
  static indexOf(list, selectedItem, key = null) {
    if (key == null) {
      return list.findIndex(item => item === selectedItem)
    }
    return list.findIndex(item => item[key] === selectedItem[key])
  }

  static removeItem(list, selectedItem, key = null) {
    let index = List.indexOf(list, selectedItem, key)
    if (index === -1) {
      return
    }
    list.splice(index, 1)
  }
  static deepClone(object) {
    let clonedObject = JSON.parse(JSON.stringify(object))
    return clonedObject
  }
}
