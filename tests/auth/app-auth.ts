import Vue from 'vue'
import { AuthFrontendPlugin, MySession } from '../../auth'
import { BasicApp } from '../../app'

Vue.prototype.$session = MySession

const app = new BasicApp({
  appName: 'Auth',
  plugins: [AuthFrontendPlugin()],
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
  ],
})
app.launch()
