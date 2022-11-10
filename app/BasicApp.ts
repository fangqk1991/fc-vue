import '../src/plugins/element-ui-plugin'
import '../fangcha/fc-styles.scss'
import { BasicAppProtocol } from './BasicAppProtocol'
import { Component, Vue } from 'vue-property-decorator'
import VueRouter, { RouteConfig } from 'vue-router'
import * as moment from 'moment'
import { i18n } from '../src/i18n'
import { NotificationCenter } from 'notification-center-js'
import { Page404 } from './views/Page404'
import { I18nCode, I18nCodeDescriptor, MyConstants, MyNotificationKeys, SimpleVisitor, sleep } from '@fangcha/tools'
import { RootView } from '../src/RootView'
import { ViewController } from '../src/ViewController'
import { BasicAppConfig } from './BasicAppConfig'
const cookie = require('cookie-browser')

Vue.filter('ISO8601', function (val: any) {
  return moment(val).format()
})
Vue.filter('Unix_To_ISO8601', function (val: any) {
  return moment.unix(val).format()
})
Vue.filter('describe_locale', function (val: any) {
  return I18nCodeDescriptor.describe(val)
})
Vue.filter(
  'digit_format',
  function (n: number | string, digits: number = 2, maximumFractionDigits: number | null = null) {
    if (n === '' || n === null || n === undefined) {
      return ''
    }
    if (maximumFractionDigits === null) {
      maximumFractionDigits = digits
    }
    const config =
      digits === 0 && maximumFractionDigits === 0
        ? {}
        : { maximumFractionDigits: maximumFractionDigits, minimumFractionDigits: digits }
    return Number(n).toLocaleString('en-US', config)
  }
)

export class BasicApp implements BasicAppProtocol {
  public config!: BasicAppConfig
  public isReady = false
  public router!: VueRouter

  // 为做到响应式而进行赋值
  public visitorInfo: SimpleVisitor = null as any

  public appName() {
    return this.config.appName || ''
  }

  public constructor(options: BasicAppConfig) {
    this.config = options
    if (options.appName) {
      this.setTitle(options.appName)
    }
  }

  public plugins() {
    return this.config.plugins || []
  }

  public setLocale(locale: I18nCode) {
    cookie.set(MyConstants.CookieKeyForLocale, locale, 'Fri, 31 Dec 9999 23:59:59 GMT', '/')
    i18n.locale = locale === I18nCode.zhHans ? 'zh' : 'en'
    NotificationCenter.defaultCenter().postNotification(MyNotificationKeys.kOnSystemLanguageChanged, locale)
  }

  public getLocale(): I18nCode {
    let locale = cookie.get(MyConstants.CookieKeyForLocale)
    if (!locale) {
      const userLang = navigator.language
      locale = userLang === 'zh-CN' ? I18nCode.zhHans : I18nCode.en
    }
    return I18nCodeDescriptor.checkValueValid(locale) ? locale : I18nCode.en
  }

  private MainLayout() {
    @Component({
      template: `<router-view />`,
    })
    class MainLayout extends ViewController {}
    return MainLayout
  }

  protected prepareRouter() {
    const routes: RouteConfig[] = []
    const independentRoutes: RouteConfig[] = []
    if (this.config.homeView) {
      routes.push({
        path: '/',
        component: this.config.homeView,
        name: 'HomeView',
      })
    }
    for (const plugin of this.plugins()) {
      if (plugin.routes) {
        routes.push(...plugin.routes)
      }
      if (plugin.independentRoutes) {
        independentRoutes.push(...plugin.independentRoutes)
      }
    }
    if (this.config.routes) {
      routes.push(...this.config.routes)
    }
    if (this.config.independentRoutes) {
      independentRoutes.push(...this.config.independentRoutes)
    }
    routes.push({
      path: '*',
      component: Page404,
      name: 'Page404',
    })
    const router = new VueRouter({
      mode: 'history',
      routes: [
        ...independentRoutes,
        {
          path: '',
          component: this.config.mainLayout || this.MainLayout(),
          children: routes,
        },
      ],
    })
    router.beforeEach(async (to, from, next) => {
      await this.waitForReady()
      if (this.config.guardBeforeEachRoute) {
        return this.config.guardBeforeEachRoute(to, from, next)
      }
      next()
    })
    this.router = router
    return router
  }

  protected async _appDidLoad() {}

  public launch() {
    const plugins = this.plugins()
    i18n.locale = this.getLocale() === I18nCode.zhHans ? 'zh' : 'en'
    Vue.use(VueRouter)
    Vue.prototype.$app = this

    const router = this.prepareRouter()
    const appWillLoad = this.config.appWillLoad || (() => {})
    appWillLoad()
    for (const plugin of plugins) {
      if (plugin.onAppWillLoad) {
        plugin.onAppWillLoad()
      }
    }

    const rootView = new RootView({
      el: '#app',
      router: router,
      i18n: i18n,
    })
    const handler = async () => {
      await this._appDidLoad()
      const appDidLoad = this.config.appDidLoad || (async () => {})
      await appDidLoad()
      for (const plugin of plugins) {
        if (plugin.onAppDidLoad) {
          await plugin.onAppDidLoad()
        }
      }
      this.isReady = true
      rootView.isReady = true
    }
    handler()
  }

  public async waitForReady() {
    while (!this.isReady) {
      console.info(`App is waiting for ready...`)
      await sleep(100)
    }
  }

  public setTitle(title: string) {
    document.title = title
  }
}
