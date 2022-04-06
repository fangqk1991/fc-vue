import '../fangcha/fc-styles.scss'
import { AdminApp } from '../app-admin/AdminApp'
import { Red_View } from './Red_View'
import { Blue_View } from './Blue_View'
import { VisitorInfo } from '@fangcha/tools'

const app = new AdminApp({
  appName: 'Fangcha Admin',
  sidebarNodes: [
    {
      titleEn: 'Menu 1',
      titleZh: 'Menu 1',
      icon: 'el-icon-user',
      links: [
        {
          titleEn: 'Red',
          titleZh: 'Red',
          path: '/v1/page-red',
        },
        {
          titleEn: 'Blue',
          titleZh: 'Blue',
          path: '/v1/page-blue',
        },
      ],
    },
  ],
  routes: [
    {
      path: '/v1/page-red',
      require: 'Red',
      component: Red_View,
    },
    {
      path: '/v1/page-blue',
      require: 'Blue',
      component: Blue_View,
    },
  ],
  reloadUserInfo: async (): Promise<VisitorInfo> => {
    return {
      iamId: 0,
      email: 'xxx@email.com',
      name: 'Fangcha',
      permissionKeyMap: {
        Red: 1,
      },
      isAdmin: true,
    }
  },
})
app.launch()
