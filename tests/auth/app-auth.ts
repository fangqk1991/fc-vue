import { AuthPluginForClient } from '../../auth'
import { BasicApp } from '../../app'

const app = new BasicApp({
  appName: 'Auth',
  plugins: [AuthPluginForClient()],
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
  ],
})
app.launch()
