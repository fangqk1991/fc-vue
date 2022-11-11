import { RetainedSessionApis } from '@fangcha/router/lib/apis'
import { SessionInfo } from '@fangcha/router/lib/models'
import { KitAuthApis } from '@fangcha/backend-kit/lib/apis'
import { AccountSimpleParams } from '@fangcha/account/lib/common/models'
import { MyAxios } from './MyAxios'

const getParameterByName = (name: string, url = window.location.href) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export class Session {
  public curUser: {
    email: string
  } | null = null

  public loginPagePath = '/login'
  public signupPagePath = '/signup'
  public defaultRedirectUri = '/profile'
  public logoutApiPath = KitAuthApis.RedirectLogout.route

  public constructor() {}

  public redirectUri() {
    let redirectUri = getParameterByName('redirectUri') || ''
    if (!redirectUri.startsWith(window.location.origin)) {
      redirectUri = ''
    }
    return redirectUri || this.defaultRedirectUri
  }

  public async reloadSessionInfo() {
    const response = await MyAxios(RetainedSessionApis.SessionInfoGet).quickSend<SessionInfo>()
    this.curUser = response.userInfo
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
    if (MySession.checkLogin()) {
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

export const MySession = new Session()
