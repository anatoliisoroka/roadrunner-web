import React from 'react'
import Price from '../../../../utils/Price'
export default class SingleSelectItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.selected,
      item: props.item
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _itemSelected() {
    let { selected, item } = this.state
    if (selected) {
      this.props.onItemUnselected(item)
    } else {
      this.props.onItemSelected(item)
    }
  }

  _renderAdditionalPrice(item) {
    if (item.price == null) {
      return null
    }
    if (item.price == 0) {
      return null
    }
    return <strong>+ {Price.format(item.price, this.props.currency)}</strong>
  }

  render() {
    let { item, selected } = this.state
    return (
      <div
        className="col-md-12"
        onClick={() => this._itemSelected()}
        style={{ cursor: 'pointer' }}
      >
        <div className="input-radio">
          <input type="radio" checked={selected} />
          <label htmlFor="" />
        </div>
        <span
          style={{
            marginLeft: '10px'
          }}
        >
          {item.title} {this._renderAdditionalPrice(item)}
        </span>
      </div>
    )
  }
}

SingleSelectItem.defaultProps = {
  onItemUnselected: () => {}
}
