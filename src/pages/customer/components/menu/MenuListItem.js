import React from 'react'

import ClampLines from 'react-clamp-lines';

import Price from '../../../../utils/Price'
import BasketManager from '../../../../utils/BasketManager'

export default class MenuListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      venue: props.venue,
      item: props.item,
      currency: props.currency,
      quantity: 1,
      selectedOptionGroups: []
    }
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

  _addToBasket() {
    let { item, quantity, selectedOptionGroups } = this.state
    let basket_item = {
      id: item.id,
      quantity,
      title: item.title,
      price: item.price,
      image: item.image,
      option_groups: selectedOptionGroups
    }
    BasketManager.addToBasket(basket_item)
    this.setState({ selectedOptionGroups: [], quantity: 1 }, () => {
      this.props.onBasketUpdated()
    })
  }

  _renderImage() {
    let { item } = this.state
    if (item.image == null) {
      return null
    }
    return <img src={item.image.thumbnail} alt="Bundle for 2" />
  }

  render() {
    let {
      item,
      venue,
      quantity,
      currency
    } = this.state

    return (
      <div
        className="col-md-4 mb-5"
      >
        <div className="menuItem d-flex flex-column" style={{ borderRadius: 20, padding: 20 }}>
          <div className="row flex-grow-1"
            onClick={() => this.props.onMenuItemPressed(item)}
          >
            <div className="col-md-8">
              <h4 className="m-b-0">{item.title}</h4>
              <ClampLines
                text={item.description || ""}
                lines={3}
                ellipsis="..."
                buttons={false}
                className="itemDescription"
                innerElement="p"
              />
            </div>
            <div className="col-md-4 text-center">{this._renderImage()}</div>
          </div>
          <div className="">
            <hr className="mt-3 mb-3"/>
            <div className="row align-text-bottom">
              <div className="col-xl-6 col-lg-12 text-center">
                <button
                  className="btn btn--primary type--uppercase"
                  style={{ paddingLeft: 20, paddingRight: 20 }}
                  type="button"
                  onClick={() => this._addToBasket()}
                >
                  Add to basket -{' '}
                  {Price.format(item.price * quantity, currency)}
                </button>
              </div>
              <div className="col-xl-6 col-lg-12 text-xl-right text-center my-auto">
                <div className="quantity-control ml-0 mt-xl-0 mt-3">
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}
