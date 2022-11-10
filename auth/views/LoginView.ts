import { Component } from 'vue-property-decorator'
import { KitAuthApis } from '@fangcha/backend-kit/lib/apis'
import '../assets/css/main.scss'
import { MySession } from '../services/MySession'
import { ViewController } from '../../src/ViewController'
import { MyAxios } from '../../basic'

@Component({
  template: `
    <div class="fc-sso-form">
      <div class="logo mb-4" />
      <h1 class="h3 mb-3 font-weight-normal">请登录</h1>
      <div class="input-group input-first">
        <input v-model="params.email" type="text" class="form-control" placeholder="邮箱" required autofocus />
      </div>
      <div class="input-group input-last">
        <input v-model="params.password" type="password" class="form-control" placeholder="密码" required @keyup.enter="onSubmit"/>
      </div>
      <button class="btn btn-lg btn-primary btn-block" :disabled="isLoading" @click="onSubmit">登录</button>
    </div>
  `,
})
export class LoginView extends ViewController {
  params = {
    email: '',
    password: '',
  }

  async onSubmit() {
    await this.execHandler(async () => {
      const request = MyAxios(KitAuthApis.Login)
      request.setBodyData(this.params)
      await request.quickSend()
      await MySession.onLoginSuccess()
    })
  }
}
