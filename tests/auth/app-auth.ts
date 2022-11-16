import Vue from 'vue'
import { AuthPluginForClient, MySession } from '../../auth'
import { BasicApp } from '../../app'

Vue.prototype.$session = MySession

const app = new BasicApp({
  appName: 'Auth',
  plugins: [AuthPluginForClient()],
  pluginsDidLoad: async () => {
    MySession.config.appName = 'SSO Demo'
    MySession.config.logoCss = 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)'
    MySession.config.background = 'linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)'
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
  ],
})
app.launch()
