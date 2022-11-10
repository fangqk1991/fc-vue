import { MySession } from './services/MySession'
import Vue from 'vue'
import { LoginView } from './views/LoginView'
import { ProfileView } from './views/ProfileView'
import { FrontendPluginProtocol } from '../basic'

export * from './views/LoginView'
export * from './views/ProfileView'
export * from './services/MySession'

export const AuthFrontendPlugin = (): FrontendPluginProtocol => {
  Vue.prototype.$session = MySession
  return {
    onAppDidLoad: async () => {
      await MySession.reloadSessionInfo()
      MySession.redirectIfNeed()
    },
    independentRoutes: [
      {
        path: '/login',
        component: LoginView,
        name: 'LoginView',
      },
      {
        path: '/profile',
        component: ProfileView,
        name: 'ProfileView',
      },
    ],
  }
}
