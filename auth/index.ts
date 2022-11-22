import { MySession } from './services/MySession'
import Vue from 'vue'
import { LoginView } from './views/LoginView'
import { ProfileView } from './views/ProfileView'
import { FrontendPluginProtocol } from '../basic'
import 'bootstrap'
import { AccountSimpleParams } from '@fangcha/account/lib/common/models'
import { LoginApis } from '@fangcha/sso-server/lib/common/web-api'
import { MyAxios } from './services/MyAxios'
import { LoginLayout } from './views/LoginLayout'
import { SignupView } from './views/SignupView'
import { KitAuthApis } from '@fangcha/backend-kit/lib/apis'

export * from './views/LoginView'
export * from './views/ProfileView'
export * from './services/MySession'

export const AuthPluginForClient = (): FrontendPluginProtocol => {
  Vue.prototype.$session = MySession
  MySession.submitLogin = async (params: AccountSimpleParams) => {
    const request = MyAxios(KitAuthApis.Login)
    request.setBodyData(params)
    await request.quickSend()
  }
  return {
    onAppDidLoad: async () => {
      await MySession.reloadSessionInfo()
      MySession.redirectIfNeed()
    },
    independentRoutes: [
      {
        path: '',
        component: LoginLayout,
        children: [
          {
            path: '/login',
            component: LoginView,
            name: 'LoginView',
          },
          {
            path: '/signup',
            component: SignupView,
            name: 'SignupView',
          },
          {
            path: '/profile',
            component: ProfileView,
            name: 'ProfileView',
          },
        ],
      },
    ],
  }
}

export const AuthPluginForServer = (): FrontendPluginProtocol => {
  MySession.logoutApiPath = LoginApis.Logout.route
  MySession.submitLogin = async (params: AccountSimpleParams) => {
    const request = MyAxios(LoginApis.LoginWithEmail)
    request.setBodyData(params)
    await request.quickSend()
  }
  return AuthPluginForClient()
}
