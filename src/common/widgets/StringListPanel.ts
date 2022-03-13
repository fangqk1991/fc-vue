import { Component, Model, Prop } from 'vue-property-decorator'
import { ViewController } from '../ViewController'
import { SimpleInputDialog } from '../dialogs'

@Component({
  template: `
    <div style="line-height: 2">
      <el-tag
        v-for="(str, $index) in strList"
        class="mr-2"
        :key="$index"
        closable
        size="small"
        @close="onRemoveItemAtIndex($index)"
      >
        {{ str }}
      </el-tag>
      <el-tag class="cursor-pointer" size="small" type="warning" @click="onAddItem">
        <i class="el-icon-plus"></i>
      </el-tag>
    </div>
  `,
})
export class StringListPanel extends ViewController {
  @Model('update:value', { type: Array, default: () => [] }) readonly strList!: string[]
  @Prop({ default: null, type: Function }) readonly inputFunc?: () => Promise<string>

  onDataChanged() {
    this.$emit('update:value', this.strList)
    this.$emit('change', this.strList)
  }

  async onAddItem() {
    if (this.inputFunc) {
      this.strList.push(await this.inputFunc())
    } else {
      const dialog = SimpleInputDialog.textInputDialog()
      dialog.show(async (content) => {
        this.strList.push(content)
      })
    }
  }

  onRemoveItemAtIndex(index: number) {
    this.strList.splice(index, 1)
  }
}
