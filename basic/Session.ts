import { SessionInfo } from '@fangcha/backend-kit/lib/common/models'
import { SessionUserInfo } from './SessionHTTP'
import { MyAxios } from './MyAxios'
import { RetainedSessionApis } from '@fangcha/backend-kit/lib/common/apis'

export interface EmptyConfig {}

export class Session<T extends EmptyConfig = {}> {
  public config: T

  public curUser: SessionUserInfo | null = null

  public constructor(config?: T) {
    this.config = config || ({} as any)
  }

  public async reloadSessionInfo() {
    const request = MyAxios(RetainedSessionApis.SessionInfoGet)
    request.setMute(true)
    await request
      .quickSend<SessionInfo<T>>()
      .then((response) => {
        this.curUser = response.userInfo
        Object.assign(this.config, response.config)
      })
      .catch((err) => {
        console.error(err)
      })
    return !!this.curUser
  }

  public checkLogin() {
    return !!this.curUser
  }
}
