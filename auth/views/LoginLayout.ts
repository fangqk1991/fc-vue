import { Component } from 'vue-property-decorator'
import { MySession } from '../services/MySession'
import { ViewController } from '../../src/ViewController'
import './signin.scss'

@Component({
  template: `
    <div style="width: 100vw; height: 100vh;" :style="style">
      <div class="pr-3 pt-3 font-weight-normal" style="text-align: right">{{ $session.config.appName }}</div>
      <router-view />
    </div>
  `,
})
export class LoginLayout extends ViewController {
  params = {
    email: '',
    password: '',
  }

  viewDidLoad() {
    MySession.redirectIfNeed()
  }

  get style() {
    return {
      'background': this.$session.config.background,
    }
  }

  async onSubmit() {
    await this.execHandler(async () => {
      await MySession.submitLogin(this.params)
      await MySession.onLoginSuccess()
    })
  }
}
