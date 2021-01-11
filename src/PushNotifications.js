import Backend from './utils/Backend'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()
// https://medium.com/@sarit.r/unified-3-type-of-push-notification-with-django-push-notifications-feeb5f42df7e
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  var rawData = window.atob(base64)
  var outputArray = new Uint8Array(rawData.length)
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function loadVersionBrowser(userAgent) {
  var ua = userAgent
  var tem
  var M =
    ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
    []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return { name: 'IE', version: tem[1] || '' }
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) {
      return { name: 'Opera', version: tem[1] }
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1])
  }
  return {
    name: M[0],
    version: M[1]
  }
}

export default class PushNotifications {
  static register(user) {
    var applicationServerKey = env.WEB_PUSH_APP_SERVER_KEY
    // In your ready listener
    if (!'serviceWorker' in navigator) {
      throw {
        error: 'no service worked',
        message: 'unsupported configuration for push notifications'
      }
    }
    // The service worker has to store in the root of the app
    // http://stackoverflow.com/questions/29874068/navigator-serviceworker-is-never-ready
    var browser = loadVersionBrowser('chrome')
    return navigator.serviceWorker
      .register('navigatorPush.service.js?version=1.0.0')
      .then(reg => {
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
        })
      })
      .then(sub => {
        var endpointParts = sub.endpoint.split('/')
        var registration_id = endpointParts[endpointParts.length - 1]
        var data = {
          browser: browser.name.toUpperCase(),
          p256dh: btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(sub.getKey('p256dh'))
            )
          ),
          auth: btoa(
            String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))
          ),
          name: 'XXXXX',
          registration_id: registration_id,
          application_id: 'wp'
        }

        return Backend.registerWebPush(data)
      })
      .catch(error => {
        throw { error: 'service worker error', message: error }
      })
  }
}
