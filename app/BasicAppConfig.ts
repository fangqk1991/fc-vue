import { NavigationGuard, RouteConfig } from 'vue-router'
import { Vue } from 'vue-property-decorator'
import { EmptyConfig, FrontendPluginProtocol, Session } from '../basic'

export interface BasicAppConfig<T extends EmptyConfig = {}> {
  session?: Session<T>
  appName?: string
  routes?: RouteConfig[]
  mainPathPrefix?: string
  independentRoutes?: RouteConfig[]
  appWillLoad?: () => void
  appDidLoad?: () => Promise<void>
  pluginsDidLoad?: () => Promise<void>
  guardBeforeEachRoute?: NavigationGuard
  mainLayout?: typeof Vue
  homeView?: typeof Vue
  plugins?: FrontendPluginProtocol[]
}
