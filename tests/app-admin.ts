import { AdminApp } from '../app-admin'
import { Red_View } from './admin/Red_View'
import { Blue_View } from './admin/Blue_View'
import { I18nCode, VisitorInfo } from '@fangcha/tools'
import { HomeView } from './admin/HomeView'
import { DialogDemoView } from './admin/DialogDemoView'
import { TableDemoView } from './table/TableDemoView'
import '../fangcha/fc-styles.scss'
import { GridDemoView } from './table/GridDemoView'
import { BootstrapDemoView } from './admin/BootstrapDemoView'
import { WidgetsDemoView } from './admin/WidgetsDemoView'

const app = new AdminApp({
  appName: 'Fangcha Admin',
  homeView: HomeView,
  useRemoteLocale: false,
  profileViewUrl: '/v1/profile',
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
          titleEn: 'TableView Demo',
          titleZh: 'TableView Demo',
          path: '/v1/table-view-demo',
        },
        {
          titleEn: 'GridView Demo',
          titleZh: 'GridView Demo',
          path: '/v1/grid-view-demo',
        },
        {
          titleEn: 'Widgets Demo',
          titleZh: 'Widgets Demo',
          path: '/v1/widgets-demo',
        },
        {
          titleEn: 'Bootstrap Demo',
          titleZh: 'Bootstrap Demo',
          path: '/v1/bootstrap-demo',
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
      path: '/v1/table-view-demo',
      component: TableDemoView,
    },
    {
      path: '/v1/grid-view-demo',
      component: GridDemoView,
    },
    {
      path: '/v1/widgets-demo',
      component: WidgetsDemoView,
    },
    {
      path: '/v1/bootstrap-demo',
      component: BootstrapDemoView,
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
      locale: I18nCode.en,
    }
  },
})
app.launch()
