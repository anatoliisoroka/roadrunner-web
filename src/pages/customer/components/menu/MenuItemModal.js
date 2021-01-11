import React from 'react'
import Modal from 'react-bootstrap/Modal'

import SingleSelectItem from '../../../customer/components/common/SingleSelectItem'
import MultiSelectItem from '../../../customer/components/common/MultiSelectItem'

import Price from '../../../../utils/Price'
import BasketManager from '../../../../utils/BasketManager'
export default class MenuItemModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: props.show,
      item: props.item,
      total: null,
      currency: props.currency,
      quantity: 1,
      selectedOptionGroups: []
    }
  }

  componentDidMount() {
    let { item } = this.state
    if (item == null) {
      return null
    }
    this.setState({ singlePrice: item.price })
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _addSelectedOptionGroup(optionGroup, option) {
    let selectedOptionGroup = this._getSelectedOptionGroup(optionGroup)
    if (optionGroup.multi_select === false) {
      selectedOptionGroup.options = []
    }
    selectedOptionGroup.options.push({
      id: option.id,
      price: option.price,
      title: option.title,
      quantity: 1
    })
    this._updateSelectedOptionGroup(selectedOptionGroup)
  }

  _deleteSelectedOptionGroup(selectedOptionGroup) {
    let { selectedOptionGroups } = this.state

    let selectedOptionGroupIndex = selectedOptionGroups.findIndex(
      item => item.id === selectedOptionGroup.id
    )
    if (selectedOptionGroupIndex < 0) {
      return
    }
    selectedOptionGroups.splice(selectedOptionGroupIndex, 1)
    this.setState({ selectedOptionGroups })
  }

  _removeSelectedOptionGroup(optionGroup, option) {
    let selectedOptionGroup = this._getSelectedOptionGroup(optionGroup)
    let optionIndex = selectedOptionGroup.options.findIndex(
      item => item.id === option.id
    )
    if (optionIndex > -1) {
      selectedOptionGroup.options.splice(optionIndex, 1)
    }
    if (selectedOptionGroup.options.length === 0) {
      this._deleteSelectedOptionGroup(selectedOptionGroup)
    } else {
      this._updateSelectedOptionGroup(selectedOptionGroup)
    }
  }

  _updateSelectedOptionGroup(selectedOptionGroup) {
    let { selectedOptionGroups } = this.state

    let selectedOptionGroupIndex = this.state.selectedOptionGroups.findIndex(
      item => item.id === selectedOptionGroup.id
    )
    if (selectedOptionGroupIndex > -1) {
      selectedOptionGroups[selectedOptionGroupIndex] = selectedOptionGroup
    } else {
      selectedOptionGroups.push(selectedOptionGroup)
    }
    this.setState({ selectedOptionGroups })
  }

  _getSelectedOptionGroup(optionGroup) {
    let selectedOptionGroup = this.state.selectedOptionGroups.find(
      selectedOptionGroup => selectedOptionGroup.id === optionGroup.id
    )
    if (selectedOptionGroup) {
      return selectedOptionGroup
    }
    return {
      id: optionGroup.id,
      title: optionGroup.title,
      options: []
    }
  }

  _checkIfSelected(item, optionGroup) {
    let { selectedOptionGroups } = this.state
    if (selectedOptionGroups.length === 0) {
      return false
    }
    let foundOptionGroup = selectedOptionGroups.find(
      selectedOptionGroup => selectedOptionGroup.id === optionGroup.id
    )
    if (!foundOptionGroup) {
      return false
    }
    let foundOption = foundOptionGroup.options.find(
      option => option.id === item.id
    )
    return foundOption
  }

  _addToBasket() {
    let { item, quantity, selectedOptionGroups } = this.state
    let basket_item = {
      id: item.id,
      quantity,
      title: item.title,
      price: item.price,
      option_groups: selectedOptionGroups
    }
    BasketManager.addToBasket(basket_item)
    this.setState({ selectedOptionGroups: [], quantity: 1 }, () => {
      this.props.onBasketUpdated()
    })
  }

  _renderOptionGroups() {
    let { item } = this.state
    if (item == null) {
      return null
    }
    return item.option_groups.map(option_group => {
      return (
        <div className="col-md-12 m-b-40">
          <h5>{option_group.title}</h5>
          <div className="row">
            {this._renderOptionGroupItems(option_group)}
          </div>
        </div>
      )
    })
  }

  _renderOptionGroupItems(option_group) {
    return option_group.options.map(item => {
      return (
        <div className="col-md-4 col-sm-4 col-xs-4">
          <div className="input-radio">
            {this._renderInputItem(option_group, item)}
          </div>
        </div>
      )
    })
  }

  _renderInputItem(optionGroup, item) {
    if (optionGroup.multi_select) {
      return (
        <MultiSelectItem
          item={item}
          currency={this.state.currency}
          selected={this._checkIfSelected(item, optionGroup)}
          onItemSelected={() => this._addSelectedOptionGroup(optionGroup, item)}
          onItemUnselected={() =>
            this._removeSelectedOptionGroup(optionGroup, item)
          }
        />
      )
    }
    return (
      <SingleSelectItem
        item={item}
        currency={this.state.currency}
        selected={this._checkIfSelected(item, optionGroup)}
        onItemSelected={() => this._addSelectedOptionGroup(optionGroup, item)}
        onItemUnselected={() =>
          this._removeSelectedOptionGroup(optionGroup, item)
        }
      />
    )
  }

  _reduceQuantity() {
    let { quantity } = this.state
    if (quantity <= 1) {
      return
    }
    this.setState({ quantity: quantity - 1 })
  }

  _increaseQuantity() {
    let { quantity } = this.state
    this.setState({ quantity: quantity + 1 })
  }

  _resetModal() {
    this.setState({ quantity: 1 })
  }

  _onModalHide() {
    this._resetModal()
    this.props.onHide()
  }

  _setStyle(item) {
    if (item.option_groups.length <= 0) {
      return null
    }
    return { borderTop: '1px solid #222' }
  }

  render() {
    let { show, item, currency, quantity } = this.state
    if (item == null) {
      return null
    }
    return (
      <Modal size="lg" show={show} onHide={() => this._onModalHide()}>
        <Modal.Header closeButton>
          <div style={{ margin: 20 }} className="text-block">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form style={{ marginLeft: 20, marginRight: 20 }}>
            <div className="row">{this._renderOptionGroups()}</div>
            <div className="row option-footer" style={this._setStyle(item)}>
              <div className="col-md-6">
                <div className="quantity-control m-t-20">
                  <button
                    onClick={() => this._reduceQuantity()}
                    type="button"
                    className="btn btn--primary quantity-button"
                  >
                    -
                  </button>
                  <input
                    className="quantity-input"
                    type="text"
                    value={this.state.quantity}
                  />
                  <button
                    onClick={() => this._increaseQuantity()}
                    type="button"
                    className="btn btn--primary quantity-button"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-md-6 text-right">
                <button
                  className="btn btn--primary type--uppercase m-t-20"
                  style={{ paddingLeft: 20, paddingRight: 20, marginRight: 40 }}
                  type="button"
                  onClick={() => this._addToBasket()}
                >
                  Add to basket -{' '}
                  {Price.format(item.price * quantity, currency)}
                </button>
              </div>
            </div>
            {/*end of row*/}
          </form>

          {/*end of container*/}
        </Modal.Body>
      </Modal>
    )
  }
}
