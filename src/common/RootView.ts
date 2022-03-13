import { Component } from 'vue-property-decorator'
import { ViewController } from './ViewController'

@Component({
  template: `<router-view />`,
})
export class RootView extends ViewController {}
