import { Component } from 'vue-property-decorator'
import { ViewController } from '../../src/ViewController'
import { MySession } from '../services/MySession'
import { LoginLayout } from './LoginLayout'

@Component({
  components: {
    'login-layout': LoginLayout,
  },
  template: `
    <login-layout>
      <div v-if="$session.curUser" class="mb-4">Email: {{ $session.curUser.email }}</div>
      <button class="btn btn-danger" style="width: 100%;" @click="onLogout">登出</button>
    </login-layout>
  `,
})
export class ProfileView extends ViewController {
  async onLogout() {
    window.location.href = MySession.logoutApiPath
  }
}
