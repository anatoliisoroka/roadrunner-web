import moment from 'moment'
const WEEKDAY = new Array(
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
)
export default class DateTime {
  static todaysDay() {
    let date = new Date()
    return WEEKDAY[date.getDay()]
  }

  static tomorrowsDay() {
    var date = new Date()
    return WEEKDAY[date.getDay() + 1]
  }

  static getWeekValue(selectedDay) {
    let day = null
    switch (selectedDay) {
      case 'sunday':
        day = 0
        break
      case 'monday':
        day = 1
        break
      case 'tuesday':
        day = 2
        break
      case 'wednesday':
        day = 3
        break
      case 'thursday':
        day = 4
        break
      case 'friday':
        day = 5
        break
      case 'saturday':
        day = 6
        break
    }
    return DateTime.getDateFromWeek(day)
  }

  static getDateFromWeek(weekValue) {
    // if we haven't yet passed the day of the week that I need:
    if (moment().isoWeekday() <= weekValue) {
      // then just give me this week's instance of that day
      return moment().isoWeekday(weekValue)
    } else {
      // otherwise, give me next week's instance of that day
      return moment()
        .add(1, 'weeks')
        .isoWeekday(weekValue)
    }
  }

  static currentTime() {
    var today = new Date()
    var time = today.getHours() + ':' + today.getMinutes() * 60000
    return time
  }

  static formatDate(date) {
    return moment(date).format('Do MMMM YYYY')
  }

  static formatDateTime(date) {
    return moment(date).format(' Do MMM YYYY, h:mm a')
  }

  static year() {
    return moment().format('YYYY')
  }

  static formatTime(time) {
    return moment(time).format('HH:mm')
  }

  static roundToQuarterHour(time) {
    var timeToReturn = new Date(time)

    timeToReturn.setMilliseconds(
      Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
    )
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60)
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15)
    return timeToReturn
  }

  static quarterIntervals(selectedDay, startDate, endDate) {
    var start = ''
    if (selectedDay == 'Today') {
      start = moment(DateTime.currentTime(), 'hh:mm a')
    } else {
      start = moment(startDate, 'hh:mm a')
    }
    var end = moment(endDate, 'hh:mm a')

    // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
    // note that 59 will round up to 60, and moment.js handles that correctly
    start.minutes(Math.ceil(start.minutes() / 15) * 15)

    var results = []
    var count = 0

    var current = moment(start)

    while (current <= end) {
      if (count <= 1) {
        count += 1
        continue
      } else {
        results.push({
          label: current.format('HH:mm a'),
          value: (count += 1)
        })
        current.add(15, 'minutes')
      }
    }

    results.splice(0,3)
    return results
  }

  static getOrderTime(selectedDay) {
    let date = moment(selectedDay.value).format('DD/MM/YYYY')
    let time = moment("23:30 pm", 'HH:mm:ss').format('HH:mm')
    var dateTime = moment(date + ' ' + time, 'DD/MM/YYYY HH:mm')
    return dateTime
  }
}
