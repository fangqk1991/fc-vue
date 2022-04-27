import { Component, MenuMainNode, Prop, ViewController, VisibleLevel } from '../../src'
import { NotificationCenter } from 'notification-center-js'

@Component({
  template: `
    <el-menu :default-active="$route.path" :default-openeds="defaultOpeneds" :collapse="collapse" :unique-opened="uniqueOpened">
      <el-submenu
        v-for="menu in menus"
        :key="menu.titleZh"
        :index="menu.titleZh"
        popper-class="sidebar-popper"
      >
        <template slot="title">
          <i class="title-icon" :class="menu.icon" />
          <span slot="title">{{ $i18n.locale === 'zh' ? menu.titleZh : menu.titleEn }}</span>
        </template>
        <el-menu-item
          v-for="link in getMenuVisibleLinks(menu)"
          :key="link.path ? link.path : link.url"
          :index="link.path ? link.path : link.url"
          :disabled="!$app.checkPathAccessible(link.path)"
        >
          <a v-if="link.isHyperlink" :href="link.url" target="_blank">
            <div style="display: inline-block; width: 100%">
              <span style="margin-right: 8px">▪</span>
              <span>{{ $i18n.locale === 'zh' ? link.titleZh : link.titleEn }}</span>
            </div>
          </a>
          <router-link v-else :to="{ path: link.path }">
            <div style="display: inline-block; width: 100%;">
              <span style="margin-right: 8px">▪</span>
              <span>{{ $i18n.locale === 'zh' ? link.titleZh : link.titleEn }}</span>
            </div>
          </router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  `,
})
export class AppMenu extends ViewController {
  @Prop({ default: false, type: Boolean }) readonly collapse!: boolean
  @Prop({ default: false, type: Boolean }) readonly uniqueOpened!: boolean

  sidebarOptions: MenuMainNode[] = []
  defaultOpeneds: string[] = []

  viewDidLoad() {
    this.reloadSidebar()
    if (!this.uniqueOpened) {
      this.defaultOpeneds = this.sidebarOptions.map((item) => item.titleZh)
    }
    NotificationCenter.defaultCenter().addObserver('__onSidebarOptionsChanged', () => {
      this.reloadSidebar()
    })
  }

  getMenuVisibleLinks(menu: MenuMainNode) {
    return menu.links.filter(
      (link) => link.visibleLevel !== VisibleLevel.Private || this.$app.checkPathAccessible(link.path!)
    )
  }

  get menus() {
    return this.sidebarOptions.filter((menu) => this.getMenuVisibleLinks(menu).length > 0)
  }

  reloadSidebar() {
    this.sidebarOptions = this.$app.sidebarNodes()
  }
}
