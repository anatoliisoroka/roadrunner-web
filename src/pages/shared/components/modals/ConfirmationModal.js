import React from 'react'
import Modal from 'react-bootstrap/Modal'

export default class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: props.show,
      item: props.item
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _onModalHide() {
    this.props.onHide()
  }

  _renderItem() {
    let { item } = this.state
    if (item == null) {
      return null
    }
    return <span>{item}</span>
  }

  _renderActions() {
    let { item } = this.state
    if (this.props.type == 'prompt') {
      return (
        <>
          <button
            className="btn btn--secondary type--uppercase m-t-20"
            style={{ paddingLeft: 20, paddingRight: 20 }}
            onClick={() => this.props.onConfirmPressed(item)}
            type="button"
          >
            {this.props.actionTitle}
          </button>
          <button
            className="btn btn--secondary type--uppercase m-t-20"
            style={{ paddingLeft: 20, paddingRight: 20 }}
            onClick={() => this._onModalHide()}
            type="button"
          >
            Close
          </button>
        </>
      )
    }
    return (
      <button
        className="btn btn--secondary type--uppercase m-t-20"
        style={{ paddingLeft: 20, paddingRight: 20 }}
        onClick={() => this.props.onActionPressed()}
        type="button"
      >
        Ok
      </button>
    )
  }

  render() {
    let { show } = this.state
    return (
      <Modal show={show} onHide={() => this._onModalHide()}>
        <Modal.Header>
          <div>
            <h3 className="m-b-0">{this.props.title}</h3>
            {this._renderItem()}
          </div>
        </Modal.Header>
        <Modal.Footer>{this._renderActions()}</Modal.Footer>
      </Modal>
    )
  }
}

const styles = {
  validationText: { color: 'red' }
}

ConfirmationModal.defaultProps = {
  actionTitle: 'Confirm'
}
