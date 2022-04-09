import { NavigationGuard, RouteConfig } from 'vue-router'
import { Vue } from 'vue-property-decorator'
import { FrontendPluginProtocol } from '../basic'

export interface BasicAppConfig {
  appName?: string
  routes?: RouteConfig[]
  appWillLoad?: () => void
  appDidLoad?: () => Promise<void>
  guardBeforeEachRoute?: NavigationGuard
  mainLayout?: typeof Vue
  homeView?: typeof Vue
  plugins?: FrontendPluginProtocol[]
}
