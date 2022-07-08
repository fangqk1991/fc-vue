import { Component, MyCheckbox, ViewController } from '../../src'
import { JsonTreeView } from '../../json'

@Component({
  components: {
    'my-checkbox': MyCheckbox,
    'json-tree-view': JsonTreeView,
  },
  template: `
    <div>
      <el-card>
        <my-checkbox v-model="checkboxValue">Check: {{ checkboxValue }}</my-checkbox>
      </el-card>
      <el-card class="mt-4">
        <json-tree-view :data="jsonData" />
      </el-card>
    </div>
  `,
})
export class WidgetsDemoView extends ViewController {
  checkboxValue = 1
  jsonData = {
    a: 1,
    b: 2,
    c: {
      c1: 'Value 1',
      c2: 'Value 2',
      c4: ['A', 'B', 'C', 'D', 'E']
    }
  }
}
