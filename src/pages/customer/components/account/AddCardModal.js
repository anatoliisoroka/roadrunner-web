import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Elements, StripeProvider } from 'react-stripe-elements'
import AddCardForm from './AddCardForm'

import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()

class AddCardModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: props.show
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    let { show } = this.state
    return (
      <Modal show={show} onHide={() => this.props.onHide()}>
        <Modal.Header closeButton>
          <h3 className="m-b-0">Add New Card</h3>
        </Modal.Header>
        <Modal.Body>
          <StripeProvider apiKey={global.Api.StripeKey}>
            <div>
              <Elements>
                <AddCardForm onCardAdded={() => this.props.onCardAdded()} />
              </Elements>
            </div>
          </StripeProvider>
        </Modal.Body>
      </Modal>
    )
  }
}
export default AddCardModal
