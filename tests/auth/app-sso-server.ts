import { AuthPluginForServer } from '../../auth'
import { BasicApp } from '../../app'

const app = new BasicApp({
  appName: 'Auth',
  plugins: [AuthPluginForServer()],
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
  ],
})
app.launch()
