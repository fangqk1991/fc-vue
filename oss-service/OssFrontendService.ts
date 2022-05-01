import { OssRouteData } from './services/OssRouteData'
import { FrontendPluginProtocol } from '../basic'

interface Params {
  defaultBucketName: string
  defaultOssZone: string
}

class _OssFrontendService implements FrontendPluginProtocol {
  options!: Params

  routes = Object.values(OssRouteData)

  public init(options: Params) {
    this.options = options
    return this
  }
}

export const OssFrontendService = new _OssFrontendService()
