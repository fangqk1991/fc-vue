import { Component } from 'vue-property-decorator'
import { AppSidebar } from './AppSidebar'
import { AppDropdownMenu } from './AppDropdownMenu'
import { Page403 } from './Page403'
import { LinkDropdownItem } from '../../src/widgets'
import { ViewController } from '../../src/ViewController'
import { I18nCode, I18nCodeDescriptor } from '@fangcha/tools'

@Component({
  components: {
    'app-sidebar': AppSidebar,
    'link-dropdown-item': LinkDropdownItem,
    'app-dropdown-menu': AppDropdownMenu,
    'page-403': Page403,
  },
  template: `
    <div v-if="!$app.isReady" v-loading="true" style="width: 100vw; height: 100vh;" />
    <el-container v-else class="fc-theme" style="height: 100vh; overflow-x: hidden; overflow-y: auto;">
      <el-header class="app-header">
        <div class="title-wrapper">
          <app-dropdown-menu class="only-narrow-screen"/>
          <div class="title">
            <router-link to="/" style="color: white">{{ $app.appName() }}</router-link>
          </div>
        </div>
        <div>
          <el-dropdown @command="changeLocale">
            <span class="el-dropdown-link"> {{ locale() | describe_locale }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="option in i18nCodeOptions" :key="option.value" :command="option.value">{{ option.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown class="ml-2">
            <span class="el-dropdown-link"> {{ $app.visitorInfo.email }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                {{ $app.visitorInfo.name }}
                <el-tag v-if="$app.visitorInfo.isAdmin" size="mini">管理员</el-tag>
              </el-dropdown-item>
              <link-dropdown-item :link="$app.config.logoutUrl">{{ LS('Logout') }}</link-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <app-sidebar class="only-wide-screen"/>
        <el-main>
          <router-view v-if="$app.checkPathAccessible($route.path)" :key="$route.path" />
          <page-403 v-else :permission-key="$app.getPathPermissionKey($route.path)" />
        </el-main>
      </el-container>
    </el-container>
  `,
})
export class AppView extends ViewController {
  i18nCodeOptions = I18nCodeDescriptor.options()

  changeLocale(locale: I18nCode) {
    this.$app.setLocale(locale)
  }
  locale() {
    return this.$app.getLocale()
  }
}