import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import TextField from '../../../shared/components/common/TextField'
import Backend from '../../../../utils/Backend'
import SweetAlert from 'react-bootstrap-sweetalert'
export default class ProfileDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      showError: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _updateData(key, value) {
    let data = this.state.user
    data[key] = value
    this.setState({ user: data })
  }

  _isFormValid() {
    let isFormValid = true

    if (!this.refs.tfFirstName.isValid()) {
      isFormValid = false
    }
    if (!this.refs.tfLastName.isValid()) {
      isFormValid = false
    }
    if (!this.state.user.phone_country_code || !this.state.user.phone_number) {
      this.setState({
        phoneError: true
      })
      isFormValid = false
    }
    return isFormValid
  }

  _onUpdateButtonPressed() {
    if (!this._isFormValid()) {
      return
    }
    this._save()
  }

  _save() {
    let { user } = this.state
    this.setState({ isLoading: true })
    let data = {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_country_code: user.phone_country_code,
        phone_number: user.phone_number
      }
    }
    Backend.updateUserDetails(data)
      .then(response => {
        this.props.onProfileUpdated()
        window.location.reload()
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          showError: true,
          errorMessage: error.message
        })
      })
  }

  _setActive() {
    if (this.props.active) {
      return 'account-tab'
    }
    return 'hidden account-tab'
  }

  _setPhoneNumber(value, data) {
    this.setState({
      phoneError: false
    })
    this._updateData('phone_country_code', `+${data.dialCode}`)
    this._updateData('phone_number', value.slice(data.dialCode.length))
  }

  render() {
    let { user } = this.state
    return (
      <div id="account-profile" className={this._setActive()}>
        <h4>My Details</h4>
        <form>
          <div className="row">
            <div className="col-md-6">
              <label>First Name:</label>
              <TextField
                ref="tfFirstName"
                type="text"
                value={user.first_name}
                placeholder="First Name"
                onChangeText={firstName =>
                  this._updateData('first_name', firstName)
                }
              />
            </div>
            <div className="col-md-6">
              <label>Last Name:</label>
              <TextField
                ref="tfLastName"
                type="text"
                value={user.last_name}
                placeholder="Last Name"
                onChangeText={lastName =>
                  this._updateData('last_name', lastName)
                }
              />
            </div>
            <div className="col-md-12">
              <label>Phone:</label>
              <PhoneInput
                country={'gb'}
                value={`${user.phone_country_code}${user.phone_number}`}
                onChange={(value, data) => this._setPhoneNumber(value, data)}
              />
              {this.state.phoneError && (
                <label style={{color: "red"}}>Please enter something</label>
              )}
            </div>

            <div className="col-lg-3 col-md-4">
              <button
                style={{ paddingLeft: 20, paddingRight: 20 }}
                type="button"
                onClick={() => this._onUpdateButtonPressed()}
                className="btn btn--primary type--uppercase"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
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
