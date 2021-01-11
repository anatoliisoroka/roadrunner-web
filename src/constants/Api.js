import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()

global.Api = {}

// global.Api.Domain = ConfigHelper.getDomain()
global.Api.IsDebug = true

global.Api.Base = global.Api.IsDebug ? env.REACT_APP_DEV_API_BASE : env.REACT_APP_LIVE_API_BASE

global.Api.Login = global.Api.Base + '/user/login'
global.Api.Logout = global.Api.Base + '/user/logout'
global.Api.RefreshToken = global.Api.Base + '/user/login/refresh'
global.Api.UserInfo = global.Api.Base + '/user/info'
global.Api.Admin = global.Api.Base + '/admins'
global.Api.RequestResetPassword = global.Api.Base + '/user/requestResetPassword'
global.Api.ResetPassword = global.Api.Base + '/user/resetPassword'

global.Api.Feedback = global.Api.Base + '/feedback'

global.Api.TopVenues =
  global.Api.Base + '/venues?order_by=average_rating&order_direction=desc'
global.Api.Venues = global.Api.Base + '/venues'
global.Api.Filters = global.Api.Base + '/filters'

global.Api.Cards = global.Api.Base + '/cards'
global.Api.Categories = global.Api.Base + '/categories'
global.Api.Dietaries = global.Api.Base + '/dietaries'

global.Api.Coupons = global.Api.Base + '/coupons'

global.Api.Menu = global.Api.Base + '/menus'
global.Api.Orders = global.Api.Base + '/orders'
global.Api.Customers = global.Api.Base + '/customers'

global.Api.Locations = global.Api.Base + '/locations'
global.Api.DeliveryFee = global.Api.Base + '/delivery-fee'

global.Api.Images = global.Api.Base + '/images'

global.Api.Terms = global.Api.Base + '/terms'
global.Api.Policy = global.Api.Base + '/policy'

global.Api.Notifications = global.Api.Base + '/notifications'

global.Api.Facebook = global.Api.Base + '/user/facebook-code'
global.Api.SocialLogin = global.Api.Base + '/user/login/social/jwt-pair-user/'

global.Api.WebPush = global.Api.Base + '/user/device/wp'

global.Api.Track = global.Api.Base + '/track'

global.Api.VerifyPhone = global.Api.Base + '/user/verifyPhone'
global.Api.RequestPhoneVerification = global.Api.Base + '/user/requestPhoneVerification'

global.Api.StripeKey = global.Api.IsDebug ? env.REACT_APP_STRIPE_TEST_KEY : env.REACT_APP_STRIPE_PUBLISHABLE_KEY
