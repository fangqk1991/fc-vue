import { AuthPluginForClient, MySession } from '../../auth'
import { BasicApp } from '../../app'

const app = new BasicApp({
  appName: 'Auth',
  session: MySession,
  plugins: [AuthPluginForClient()],
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
  ],
})
app.launch()
