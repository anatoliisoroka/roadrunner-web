import React from 'react'
import TextField from '../../../shared/components/common/TextField'

import Backend from '../../../../utils/Backend'
import General from '../../../../utils/General'
import ScriptCache from '../../../../utils/ScriptCache'
import SweetAlert from 'react-bootstrap-sweetalert'

export default class Dietaries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      dietaries: null,
      showError: false
    }
  }

  componentDidMount() {
    this._loadJs()
    General.updateFormListeners()
    this._getDietaries()
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _getDietaries() {
    Backend.getUserDietaries()
      .then(response => {
        this.setState({ dietaries: response.results })
      })
      .catch(error => {
        this.setState({ showError: true, errorMessage: error.message })
      })
  }

  _resetTextInput() {
    this.setState({ dietaryTitle: '' })
  }

  _isValid() {
    let isValid = true
    if (!this.refs.tfDietary.isValid()) {
      isValid = false
    }
    return isValid
  }

  _addNewDietaries() {
    let { dietaries } = this.state
    if (!this._isValid()) {
      return
    }
    let newDietary = {
      title: this.state.dietaryTitle,
      selected: true
    }
    dietaries.push(newDietary)
    let dietariesData = dietaries.filter(dietary => {
      return dietary.selected
    })
    Backend.updateDietaries(dietariesData)
      .then(dietaries => {
        this._resetTextInput()
      })
      .catch(error => {
        alert(error.message)
      })
  }

  _updateDietaries() {
    let { dietaries } = this.state
    let updatedDietaries = []
    for (let item in dietaries) {
      if (dietaries[item].selected === true) {
        updatedDietaries.push(dietaries[item])
      }
    }
    Backend.updateDietaries(updatedDietaries)
      .then(dietaries => {
        this._getDietaries()
      })
      .catch(error => {
        alert(error.message)
      })
  }

  _updateDietarySelected(dietary, index) {
    let { dietaries } = this.state
    dietaries[index].selected = !dietary.selected
    this.setState({ dietaries })
  }

  _renderDietaries() {
    let { dietaries } = this.state
    if (dietaries == null) {
      return null
    }
    return dietaries.map((dietary, index) => {
      return this._renderDietaryItem(dietary, index)
    })
  }

  _renderDietaryItem(dietary, index) {
    return (
      <div className="col-md-3">
        <div
          className="input-checkbox"
          onClick={event => this._updateDietarySelected(dietary, index)}
        >
          <span>{dietary.title}</span>
          <input type="checkbox" checked={dietary.selected} />
          <label htmlFor="" />
        </div>
      </div>
    )
  }

  _setActive() {
    if (this.props.active) {
      return 'account-tab'
    }
    return 'hidden account-tab'
  }

  render() {
    return (
      <div id="dietaries" className={this._setActive()}>
        <h4>Dietary Requirements</h4>
        <p>
          Please choose all of your dietary requirements below and click save.
        </p>
        <form>
          <div className="row">
            <div className="col-md-12 m-b-40">
              <div className="row">
                {this._renderDietaries()}
                <div className="col-md-12 m-t-20">
                  <button
                    type="button"
                    onClick={() => this._updateDietaries()}
                    style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}
                    className="btn btn--primary type--uppercase"
                  >
                    Save
                  </button>
                </div>
                <div style={{ marginTop: 40 }} className="col-md-12 m-t-20">
                  <p>
                    If your requirements are not listed above, please add them
                    here:
                  </p>
                </div>
                <div className="col-md-12 m-t-20">
                  <TextField
                    ref="tfDietary"
                    value={this.state.dietaryTitle}
                    placeholder="Enter dietary"
                    onChangeText={value =>
                      this.setState({ dietaryTitle: value })
                    }
                  />
                </div>
                <div className="col-md-6 m-t-20">
                  <button
                    type="button"
                    onClick={() => this._addNewDietaries()}
                    style={{ paddingLeft: 20, paddingRight: 20 }}
                    className="btn btn--primary type--uppercase"
                  >
                    Add Dietary
                  </button>
                </div>
              </div>
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
