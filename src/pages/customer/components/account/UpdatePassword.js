import React from 'react'
import TextField from '../../../shared/components/common/TextField'
import Backend from '../../../../utils/Backend'

export default class UpdatePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
      validationMessage: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _resetForm() {
    this.setState({
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
      validationMessage: null
    })
  }

  _isFormValid() {
    let isValid = true
    if (!this.refs.tfCurrentPassword.isValid()) {
      isValid = false
    }
    if (!this.refs.tfNewPassword.isValid()) {
      isValid = false
    }
    if (this.state.confirmPassword !== this.state.newPassword) {
      this.setState({ validationMessage: 'Both passwords must match' })
      isValid = false
    }

    return isValid
  }

  _onUpdateButtonPressed() {
    if (!this._isFormValid()) {
      return
    }
    this._save()
  }

  _save() {
    let { currentPassword, newPassword } = this.state
    this.setState({ isLoading: true })
    let data = {
      user: {
        password: newPassword,
        current_password: currentPassword
      }
    }
    Backend.updateUserDetails(data)
      .then(response => {
        this._resetForm()
        this.props.onPasswordUpdated()
      })
      .catch(error => {
        this.setState({ validationMessage: error.message })
        this.setState({ isLoading: false })
      })
  }

  _setActive() {
    if (this.props.active) {
      return 'account-tab'
    }
    return 'hidden account-tab'
  }

  render() {
    return (
      <div id="account-password" className={this._setActive()}>
        <h4>Password</h4>
        <p>Passwords must be at least 6 characters.</p>
        <form>
          <div className="row">
            <div className="col-12">
              <label>Current Password:</label>
              <TextField
                ref="tfCurrentPassword"
                type="password"
                placeholder="Current password"
                value={this.state.currentPassword}
                onChangeText={value =>
                  this.setState({ currentPassword: value })
                }
              />
            </div>
            <div className="col-md-6">
              <label>New Password:</label>
              <TextField
                ref="tfNewPassword"
                type="password"
                placeholder="New password"
                value={this.state.newPassword}
                onChangeText={value => this.setState({ newPassword: value })}
              />
            </div>
            <div className="col-md-6">
              <label>Retype New Password:</label>
              <TextField
                ref="tfConfirmPassword"
                type="password"
                placeholder="Confirm password"
                value={this.state.confirmPassword}
                onChangeText={value =>
                  this.setState({ confirmPassword: value })
                }
              />
            </div>

            {this.state.validationMessage != null && (
              <div className="col-lg-12">
                <label style={styles.validationText}>
                  {this.state.validationMessage}
                </label>
              </div>
            )}

            <div className="col-lg-3 col-md-4">
              <button
                style={{ paddingLeft: 20, paddingRight: 20 }}
                type="button"
                onClick={() => this._onUpdateButtonPressed()}
                className="btn btn--primary type--uppercase"
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const styles = {
  validationText: { color: 'red' }
}
