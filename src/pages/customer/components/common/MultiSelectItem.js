import React from 'react'
import Price from '../../../../utils/Price'
export default class MultiSelectItem extends React.Component {
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

  _itemChecked() {
    let { selected } = this.state
    if (selected) {
      this.props.onItemUnselected()
    } else {
      this.props.onItemSelected()
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
    let { item } = this.state
    if (item == null) {
      return null
    }
    return (
      <div className="col-md-12">
        <div style={{ display: 'flex', flex: 1 }}>
          <div className="input-checkbox" onClick={() => this._itemChecked()}>
            <input type="checkbox" checked={this.state.selected} />
            <label htmlFor="" />
          </div>
          <div>
            <span
              style={{
                marginLeft: '10px'
              }}
            >
              {item.title} {this._renderAdditionalPrice(item)}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
