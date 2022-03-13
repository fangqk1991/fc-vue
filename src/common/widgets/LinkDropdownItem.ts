import { Component, Prop } from 'vue-property-decorator'
import { ViewController } from '../ViewController'
@Component({
  template: `
    <a :href="link" @click="$emit('click')">
      <el-dropdown-item :class="customClass">
        <img v-if="iconUrl" :src="iconUrl" alt='icon'/>
        <slot />
      </el-dropdown-item>
    </a>
  `,
})
export class LinkDropdownItem extends ViewController {
  @Prop({ default: 'javascript:', type: String }) readonly link!: string
  @Prop({ default: '', type: String }) readonly iconUrl!: string
  @Prop({ default: '', type: String }) readonly customClass!: string
}
