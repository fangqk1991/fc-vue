import Vue from 'vue'
import { AuthPluginForClient, MySession } from '../../auth'
import { BasicApp } from '../../app'

Vue.prototype.$session = MySession

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
