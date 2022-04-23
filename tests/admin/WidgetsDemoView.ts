import { Component, MyCheckbox, ViewController } from '../../src'

@Component({
  components: {
    'my-checkbox': MyCheckbox,
  },
  template: `
    <div>
      <el-card>
        <my-checkbox v-model="checkboxValue">Check: {{ checkboxValue }}</my-checkbox>
      </el-card>
    </div>
  `,
})
export class WidgetsDemoView extends ViewController {
  checkboxValue = 1
}
