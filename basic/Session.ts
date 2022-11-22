import { KitAuthApis } from '@fangcha/backend-kit/lib/apis'
import { AccountSimpleParams } from '@fangcha/account/lib/common/models'
import { MyAxios } from './MyAxios'
import { SessionInfo } from '@fangcha/backend-kit/lib/common/models'
import { SessionHTTP, SessionUserInfo } from './SessionHTTP'

const getParameterByName = (name: string, url = window.location.href) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export interface EmptyConfig {}

export class Session<T extends EmptyConfig = {}> {
  public config: T

  public curUser: SessionUserInfo | null = null

  public loginPagePath = '/login'
  public signupPagePath = '/signup'
  public defaultRedirectUri = '/profile'
  public logoutApiPath = KitAuthApis.RedirectLogout.route

  public constructor(config?: T) {
    this.config = config || ({} as any)
  }

  public redirectUri() {
    let redirectUri = getParameterByName('redirectUri') || ''
    if (!redirectUri.startsWith(window.location.origin)) {
      redirectUri = ''
    }
    return redirectUri || this.defaultRedirectUri
  }

  public async reloadSessionInfo() {
    const response = await SessionHTTP.getSessionInfo<SessionInfo<T>>()
    this.curUser = response.userInfo
    Object.assign(this.config, response.config)
    return !!this.curUser
  }

  public checkLogin() {
    return !!this.curUser
  }

  public async onLoginSuccess() {
    await this.reloadSessionInfo()
    this.redirectIfNeed()
  }

  public redirectIfNeed() {
    const loginPathMap = {
      [this.loginPagePath]: true,
      [this.signupPagePath]: true,
    }
    const inLoginPage = loginPathMap[window.location.pathname]
    if (this.checkLogin()) {
      if (inLoginPage) {
        window.location.href = this.redirectUri()
      }
    } else {
      if (window.location.pathname === '/') {
        window.location.href = this.loginPagePath
      } else if (!inLoginPage) {
        window.location.href = `${this.loginPagePath}?redirectUri=${encodeURIComponent(window.location.href)}`
      }
    }
  }

  public submitLogin = async (params: AccountSimpleParams) => {
    const request = MyAxios(KitAuthApis.Login)
    request.setBodyData(params)
    await request.quickSend()
  }
}
