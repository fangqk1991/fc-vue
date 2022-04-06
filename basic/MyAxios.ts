import { ApiOptions, axiosBuilder } from '@fangcha/app-request'
import { MessageBox } from 'element-ui'
import { i18n } from '../src/i18n'

function showAlert(content: any, title: any) {
  if (content.errorMessage) {
    content = content.errorMessage
  }
  MessageBox.alert(content, title, {
    confirmButtonText: 'OK',
    showClose: false,
  })
}

interface MyAxiosExtras {
  mute?: boolean
  useRedirecting?: boolean
}

export const AxiosSettings = {
  loginUrl: '/api/v1/login'
}

export const MyAxios = (commonApi?: ApiOptions, extras: MyAxiosExtras = {}) => {
  if (extras.useRedirecting === undefined) {
    extras.useRedirecting = true
  }

  const builder = axiosBuilder()
  builder.addHeader('x-requested-with', 'XMLHttpRequest')
  if (commonApi) {
    builder.setApiOptions(commonApi)
  }
  builder.setErrorHandler((err) => {
    if (extras.useRedirecting) {
      switch (err.statusCode) {
        case 401: {
          if (new URLSearchParams(window.location.search).get('_noRedirecting') !== null) {
            break
          }
          window.location.href = AxiosSettings.loginUrl
          return
        }
      }
    }
    if (!extras.mute) {
      showAlert(i18n.t(err.message), i18n.t('Error'))
    }
    throw err
  })
  return builder
}
