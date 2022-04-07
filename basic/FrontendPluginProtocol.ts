import { RouteConfig } from 'vue-router'

export interface FrontendPluginProtocol {
  onAppWillLoad?: () => void
  onAppDidLoad?: () => Promise<void>
  routes?: RouteConfig[]
}
