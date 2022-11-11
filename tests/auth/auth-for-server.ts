import Vue from 'vue'
import { AuthPluginForServer, MySession } from '../../auth'
import { BasicApp } from '../../app'

Vue.prototype.$session = MySession

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
