import { Component } from 'vue-property-decorator'
import { KitAuthApis } from '@fangcha/backend-kit/lib/apis'
import { MySession } from '../services/MySession'
import { ViewController } from '../../src/ViewController'
import { MyAxios } from '../../basic'
import './signin.scss'

@Component({
  template: `
    <div class="fc-sso-form">
      <div v-if="$session.curUser" class="mb-4">Email: {{ $session.curUser.email }}</div>
      <button class="btn btn-danger" style="width: 100%;" @click="onLogout">登出</button>
    </div>
  `,
})
export class ProfileView extends ViewController {
  async onLogout() {
    await MyAxios(KitAuthApis.Logout).quickSend()
    await MySession.reloadSessionInfo()
    MySession.redirectIfNeed()
  }
}
