import React from 'react'
import AddCardModal from './AddCardModal'
import AuthManager from '../../../../utils/AuthManager'
import Backend from '../../../../utils/Backend'
import SweetAlert from 'react-bootstrap-sweetalert'
export default class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      showAddCardModal: false,
      showError: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _UpdateUser() {
    this.props.onUserUpdated()
  }

  _setDefaultPaymentMethod(card) {
    Backend.updateCard(card)
      .then(response => {
        this._UpdateUser()
      })
      .catch(error => {
        this.setState({ showError: true, errorMessage: error.message })
      })
  }

  _renderCards() {
    let { cards } = this.state.user
    if (cards.length <= 0) {
      return (
        <div>
          <span>No Cards Added</span>
        </div>
      )
    }
    return cards.map(card => {
      return this._renderCard(card)
    })
  }

  _renderCard(card) {
    return (
      <li style={{ marginBottom: 10 }} className="row">
        <div className="col-md-8">
          <p>
            <span>
              <i className="fa fa-credit-card" style={{ marginRight: 5 }} />
              {card.brand} ending in <strong> {card.last_four}</strong>
            </span>
            <span style={{ marginLeft: 20 }}>
              Expiry Date: {card.expiry_month}/{card.expiry_year}
            </span>
          </p>
        </div>
        <div className="col-md-4 text-right text-left-xs">
          {this._renderDefaultCardContainer(card)}
        </div>
        {this._renderHr(card.is_default)}
      </li>
    )
  }

  _renderDefaultCardContainer(card) {
    if (card.is_default) {
      return <span style={{ marginRight: 20 }}>Default Card</span>
    }
    return (
      <button
        style={{ paddingLeft: 20, paddingRight: 20 }}
        type="button"
        onClick={() => this._setDefaultPaymentMethod(card)}
        className="btn"
      >
        Set as default
      </button>
    )
  }

  _renderHr(isDefault) {
    if (!isDefault) {
      return null
    }
    return <hr />
  }

  _setActive() {
    if (this.props.active) {
      return 'account-tab'
    }
    return 'hidden account-tab'
  }

  render() {
    return (
      <div id="account-billing" className={this._setActive()}>
        <h4>Billing Details</h4>
        <div className="boxed boxed--border bg--secondary">
          <h5>Payment Methods</h5>
          <hr />
          <form>
            <ul>{this._renderCards()}</ul>
            <hr />
            <button
              style={{ paddingLeft: 20, paddingRight: 20 }}
              type="button"
              onClick={() => this.setState({ showAddCardModal: true })}
              className="btn btn--primary type--uppercase"
            >
              Add New Card
            </button>
          </form>
        </div>
        <AddCardModal
          show={this.state.showAddCardModal}
          onCardAdded={() =>
            this.setState({ showAddCardModal: false }, () => {
              this._UpdateUser()
            })
          }
          onHide={() => this.setState({ showAddCardModal: false })}
        />
        <SweetAlert
          show={this.state.showError}
          error
          title="Oops!"
          onConfirm={() => this.setState({ showError: false })}
        >
          {this.state.errorMessage}
        </SweetAlert>
      </div>
    )
  }
}
