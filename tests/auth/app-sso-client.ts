import { BasicApp, SsoPlugin } from '../../app'
import { FrontendPluginProtocol } from '../../basic'
import { SsoUserView } from '../admin/SsoUserView'
import { AuthPluginForClient, MySession } from '../../auth'
import { AuthMode } from '@fangcha/account/lib/common/models'

const app = new BasicApp({
  appName: 'SSO Client',
  plugins: async () => {
    await app.session.reloadSessionInfo()

    const plugins: FrontendPluginProtocol[] = []
    const authMode = app.session.config['authMode'] as AuthMode
    switch (authMode) {
      case AuthMode.Simple:
        plugins.push(AuthPluginForClient())
        app.setSession(MySession)
        break
      case AuthMode.SSO:
        plugins.push(SsoPlugin())
        break
    }
    return plugins
  },
  homeView: SsoUserView,
})
app.launch()
