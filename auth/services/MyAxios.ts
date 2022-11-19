import { ApiOptions, AxiosBuilder } from '@fangcha/app-request'
import AppError, { ErrorModel } from '@fangcha/app-error'
import { showAlert } from './MyFuncTools'
import { i18n } from '../../src/i18n'

export class _MyAxios extends AxiosBuilder {
  constructor() {
    super()
    this.setErrorHandler((err) => {
      const responseData = this.axiosResponse?.data as ErrorModel
      switch (err.statusCode) {
        case 401: {
          if (responseData['redirectToLoginPage']) {
            window.location.href = `/login?redirectUri=${encodeURIComponent(window.location.href)}`
            return
          }
          break
        }
        default: {
          break
        }
      }

      if (this._subErrorHandler) {
        this._subErrorHandler(err)
      }

      const i18nPhrase = responseData?.phrase
      let errMessage = (i18nPhrase && i18n.te(i18nPhrase) ? i18n.t(i18nPhrase) : i18nPhrase) as string
      if (!errMessage) {
        errMessage = typeof responseData === 'string' ? responseData : 'Unknown error'
      }
      if (this._errorMsgHandler) {
        this._errorMsgHandler(errMessage, i18nPhrase)
      } else if (!this._mute) {
        showAlert(errMessage)
      }
      throw err
    })
  }

  protected _mute: boolean = false
  public setMute(mute: boolean) {
    this._mute = mute
  }

  protected _errorMsgHandler?: (errMsg: string, phrase: string) => void
  public setErrorMsgHandler(handler: (errMsg: string, phrase: string) => void) {
    this._errorMsgHandler = handler
  }

  protected _subErrorHandler?: (err: AppError) => void
}

export const MyAxios = (commonApi: ApiOptions) => {
  const builder = new _MyAxios()
  builder.setApiOptions(commonApi)
  return builder
}
