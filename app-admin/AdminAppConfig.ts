import { Vue } from 'vue-property-decorator'
import { NavigationGuard, RouteConfig } from 'vue-router'
import { VisitorInfo } from '@fangcha/tools'
import { MenuMainNode } from '../src/sidebars'
import { FrontendPluginProtocol } from '../basic'
import { BasicAppConfig } from '../app'

export interface AdminAppConfig extends BasicAppConfig {
  appName: string
  routes: RouteConfig[]
  appWillLoad?: () => void
  appDidLoad?: () => Promise<void>
  guardBeforeEachRoute?: NavigationGuard
  mainLayout?: typeof Vue
  homeView?: typeof Vue
  plugins?: FrontendPluginProtocol[]

  sidebarNodes: MenuMainNode[]
  reloadUserInfo?: () => Promise<VisitorInfo>

  loginUrl?: string
  logoutUrl?: string

  sidebarUniqueOpened?: boolean
  view403?: { new (): Vue }
  allowAnonymous?: boolean
}
