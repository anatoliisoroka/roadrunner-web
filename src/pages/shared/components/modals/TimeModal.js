import React from 'react'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'
import Modal from 'react-bootstrap/Modal'
import DateTime from '../../../../utils/DateTime'

class TimeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collectSelected: props.collectSelected,
      show: props.show,
      times: null,
      selectedTime: null,
      selectedDay: { value: DateTime.todaysDay(), label: 'Today' }
    }
  }

  componentDidMount() {
    this._getTimes()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  _isValid() {
    let isValid = true
    if (this.state.selectedTime == null) {
      this.setState({ errorMessage: 'Please choose a time' })
      isValid = false
    }
    return isValid
  }

  _onUpdateTimePressed() {
    let { selectedDay, selectedTime } = this.state
    if (!this._isValid()) {
      return
    }
    let datetime = DateTime.getOrderTime(selectedDay, selectedTime)
    this.props.onUpdateTimePressed(datetime)
  }

  _closeModal() {
    this.props.onHide()
  }

  _getTimes() {
    let { selectedDay } = this.state
    let opens_at = '06:00'
    let closes_at = '23:59'
    let times = []
    times = DateTime.quarterIntervals(selectedDay.label, opens_at, closes_at)
    return this.setState({ times })
  }

  _updateSelectedTime(selectedTime) {
    this.setState({ selectedTime })
  }

  _updateSelectedDay(selectedDay) {
    this.setState({ selectedDay }, () => this._getTimes())
  }

  _renderArrivalTitle() {
    if (this.state.collectSelected) {
      return 'Collection'
    }
    return 'Delivery'
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this._closeModal()}>
        <Modal.Header closeButton>
          <h3 style={{ marginBottom: 30 }} className="m-b-0">
            Update {this._renderArrivalTitle()} Time
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: 20 }}>
            <div className="row">
              <div className="col-md-6">
                <Select
                  value={this.state.selectedDay}
                  onChange={value => this._updateSelectedDay(value)}
                  options={[
                    { value: DateTime.todaysDay(), label: 'Today' },
                    { value: DateTime.tomorrowsDay(), label: 'Tomorrow' }
                  ]}
                />
              </div>
              <div className="col-md-6">
                <Select
                  value={this.state.selectedTime}
                  onChange={value => this._updateSelectedTime(value)}
                  options={this.state.times}
                  noOptionsMessage={() => 'Closed'}
                />
              </div>
              {this.state.errorMessage != null && (
                <label
                  style={{ color: 'red', marginTop: 10 }}
                  className="col-12 text-center"
                >
                  {this.state.errorMessage}
                </label>
              )}
              <button
                type="button"
                onClick={() => this._onUpdateTimePressed()}
                className="btn btn--primary m-t-20"
                style={{ width: '100%' }}
              >
                Update {this._renderArrivalTitle()} Time
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default withRouter(TimeModal)
