import { BasicApp } from '../../app'
import { AxiosSettings, SessionHTTP } from '../../basic'
import { KitAuthApis } from '@fangcha/backend-kit/lib/apis'
import { SsoUserView } from '../admin/SsoUserView'

const app = new BasicApp({
  appName: 'SSO Client',
  appWillLoad: () => {
    AxiosSettings.loginUrl = KitAuthApis.RedirectLogin.route
  },
  appDidLoad: async () => {
    await SessionHTTP.getUserInfo()
  },
  homeView: SsoUserView,
})
app.launch()
