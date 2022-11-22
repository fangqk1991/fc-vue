import { AuthPluginForServer, MySession } from '../../auth'
import { BasicApp } from '../../app'

const app = new BasicApp({
  appName: 'Auth',
  session: MySession,
  plugins: [AuthPluginForServer()],
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
  ],
})
app.launch()
