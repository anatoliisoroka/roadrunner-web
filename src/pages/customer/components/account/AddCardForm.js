import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import Backend from '../../../../utils/Backend'
import AuthManager from '../../../../utils/AuthManager'
class AddCardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: AuthManager.getCurrentUser(),
      errorMessage: ''
    }
  }

  async submit(ev) {
    ev.preventDefault()
    this.setState({ isLoading: true })
    let { user } = this.state
    let usersName = user.user.first_name + ' ' + user.user.last_name
    let { token } = await this.props.stripe.createToken({ name: usersName })
    if (token == null) {
      return this.setState({
        errorMessage: 'Card Details are not valid',
        isLoading: false
      })
    }
    Backend.saveCard(token)
      .then(card => {
        this.props.onCardAdded()
        this.setState({ isLoading: false })
      })
      .catch(error => {
        console.log('ERROR', error)
        this.setState({ isLoading: false })
      })
  }

  _renderButtonTitle() {
    if (this.state.isLoading) {
      return <i className="fa fa-spinner fa-pulse"></i>
    }
    return 'Save Card'
  }

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message })
    }
  }

  render() {
    return (
      <form>
        <CardElement className="form-control" onChange={this.handleChange} />
        <div className="error" role="alert">
          {this.state.errorMessage}
        </div>
        <button
          type="button"
          disabled={this.state.isLoading}
          className="btn btn--primary type--uppercase"
          style={{
            width: '100%',
            marginTop: 20,
            color: 'white'
          }}
          onClick={ev => this.submit(ev)}
        >
          {this._renderButtonTitle()}
        </button>
      </form>
    )
  }
}

export default injectStripe(AddCardForm)
