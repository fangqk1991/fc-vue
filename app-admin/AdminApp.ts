import { RouteConfig } from 'vue-router'
import { NotificationCenter } from 'notification-center-js'
import { VisitorInfo } from '@fangcha/tools'
import { BasicApp } from '../app'
import { MenuSubNode } from '../src/sidebars'
import { i18n } from '../src/i18n'
import { AxiosSettings } from '../basic'
import { AppView } from './views/AppView'
import { AdminAppConfig } from './AdminAppConfig'
import 'bootstrap'

export class AdminApp extends BasicApp {
  public config!: AdminAppConfig

  isReady = false
  // 为做到响应式而进行赋值
  public visitorInfo: VisitorInfo = null as any

  pathRouteMap: { [path: string]: RouteConfig } = {}

  public constructor(options: AdminAppConfig) {
    super(options)
    {
      const allNodes = this.sidebarNodes().reduce((result, cur) => {
        result = result.concat(cur.links)
        return result
      }, [] as MenuSubNode[])
      options.guardBeforeEachRoute = async (to, _from, next) => {
        await this.waitForReady()
        const keyNode = allNodes.find((menuNode) => menuNode.path && to.path.startsWith(menuNode.path))
        let title = this.appName()
        if (keyNode) {
          title = `${title} - ${i18n.locale === 'zh' ? keyNode.titleZh : keyNode.titleEn}`
        }
        this.setTitle(title)
        next()
      }
    }
    {
      const routes = this.config.routes!
      const pathRouteMap: { [path: string]: RouteConfig } = {}
      const searchSubRoutes = (node: RouteConfig, pathPrefix = '') => {
        const curPath = `${pathPrefix}${node.path}`
        pathRouteMap[curPath] = node
        if (node.children) {
          for (const route of node.children) {
            searchSubRoutes(route, curPath)
          }
        }
      }
      searchSubRoutes({
        path: '',
        children: routes,
      })
      this.pathRouteMap = pathRouteMap
    }
    options.loginUrl = options.loginUrl || '/api/v1/login'
    options.logoutUrl = options.logoutUrl || '/api/v1/logout'
    options.mainLayout = AppView
    AxiosSettings.loginUrl = options.loginUrl
    options.profileViewUrl = options.profileViewUrl || '#'
  }

  public async reloadUserInfo() {
    this.visitorInfo = await this.config.reloadUserInfo!()
    if (this.config.useRemoteLocale) {
      this.setLocale(this.visitorInfo.locale)
    }
    return this.visitorInfo
  }

  public updateMenuLinks(menuUid: string, links: MenuSubNode[]) {
    const sidebarNode = this.config.sidebarNodes.find((item) => item.uid === menuUid)
    if (sidebarNode) {
      sidebarNode.links = links
      NotificationCenter.defaultCenter().postNotification('__onSidebarOptionsChanged')
    }
  }

  public sidebarNodes() {
    return this.config.sidebarNodes
  }

  public checkPathAccessible(path: string) {
    const permissionKey = this.getPathPermissionKey(path)
    return !permissionKey || !!this.visitorInfo.permissionKeyMap[permissionKey]
  }

  public getPathPermissionKey(path: string) {
    const route = this.pathRouteMap[path]
    if (route) {
      // TODO: require 不是规范用法，需要调整为 meta.requirePermissionKey
      return route['require'] || ''
    }
    return ''
  }

  protected async _appDidLoad() {
    if (!this.config.allowAnonymous) {
      await this.reloadUserInfo()
    }
  }

  public setTitle(title: string) {
    document.title = title
  }

  public hasPermission(permissionKey: string) {
    return !!this.visitorInfo.permissionKeyMap[permissionKey]
  }

  public isAdministrator() {
    return !!this.visitorInfo.isAdmin
  }
}
