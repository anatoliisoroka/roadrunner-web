import React from 'react'

export default class TextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value ? props.value.toString() : null,
      type: props.type,
      error: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    })
  }

  _showHidePassword() {
    let newType = ''
    if (this.state.type == 'password') {
      newType = 'text'
    } else {
      newType = 'password'
    }
    this.setState({ type: newType })
  }

  isValid() {
    this.state.error = ''
    if (this.props.validate == false) {
      return true
    }

    if (this.state.type == 'phone') {
      let reg = /^[0-9]{0,}$/
      if (reg.test(this.state.value) == false) {
        this.setState({ error: 'Please enter a valid phone number' })
        return false
      }
    }

    if (this.state.value == null || this.state.value == '') {
      this.setState({ error: 'Please enter something' })
      return false
    }
    if (this.state.type == 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (reg.test(this.state.value) == false) {
        this.setState({ error: 'Please enter a valid email address' })
        return false
      }
    }
    if (this.state.type == 'password') {
      if (this.state.value == null || this.state.value == '') {
        this.setState({ error: 'Password field required' })
        return false
      }
      if (this.state.value.length < 6) {
        this.setState({ error: 'Password must have 6 or more characters' })
        return false
      }
    }
    return true
  }
  //la la-user
  _renderInput() {
    if (this.props.inputType == 'inputGroup') {
      return (
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className={this.props.inputIcon} />
            </span>
          </div>
          <input
            type={this.state.type}
            className="form-control"
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={event => {
              this.setState({ value: event.target.value })
              this.props.onChangeText(event.target.value)
            }}
          />
        </div>
      )
    }
    return (
      <>
        <input
          type={this.state.type}
          style={this.props.style}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={event => {
            this.setState({ value: event.target.value })
            this.props.onChangeText(event.target.value)
          }}
          maxLength={this.props.maxLength}
        />

        {this.props.type == 'password' && (
          <span
            onClick={() => this._showHidePassword()}
            className="kt-input-icon__icon kt-input-icon__icon--right"
          >
            <span>
              <i className="la la-eye" />
            </span>
          </span>
        )}
      </>
    )
  }

  render() {
    return (
      <>
        {this._renderInput()}
        {this.state.error != '' && (
          <label style={styles.validationText}>{this.state.error}</label>
        )}
      </>
    )
  }
}

TextField.defaultProps = {
  type: 'text',
  inputType: '',
  maxLength: 99999
}

const styles = {
  validationText: { color: 'red' }
}
