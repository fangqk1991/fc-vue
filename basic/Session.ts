import { SessionInfo } from '@fangcha/backend-kit/lib/common/models'
import { SessionHTTP, SessionUserInfo } from './SessionHTTP'

export interface EmptyConfig {}

export class Session<T extends EmptyConfig = {}> {
  public config: T

  public curUser: SessionUserInfo | null = null

  public constructor(config?: T) {
    this.config = config || ({} as any)
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
}
