import { AdminApp } from '../app-admin/AdminApp'
import { Red_View } from './admin/Red_View'
import { Blue_View } from './admin/Blue_View'
import { VisitorInfo } from '@fangcha/tools'
import { HomeView } from './admin/HomeView'
import { DialogDemoView } from './admin/DialogDemoView'
import { TableDemoView } from './table/TableDemoView'
import '../fangcha/fc-styles.scss'

const app = new AdminApp({
  appName: 'Fangcha Admin',
  homeView: HomeView,
  sidebarNodes: [
    {
      titleEn: 'Permission',
      titleZh: 'Permission',
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
    {
      titleEn: 'Components',
      titleZh: 'Components',
      icon: 'el-icon-menu',
      links: [
        {
          titleEn: 'Dialogs',
          titleZh: 'Dialogs',
          path: '/v1/dialog-demo',
        },
        {
          titleEn: 'Table Demo',
          titleZh: 'Table Demo',
          path: '/v1/table-demo',
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
    {
      path: '/v1/dialog-demo',
      component: DialogDemoView,
    },
    {
      path: '/v1/table-demo',
      component: TableDemoView,
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
