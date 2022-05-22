import { Component, ViewController } from '../../src'
import { FcChart } from '../../echarts/FcChart'

@Component({
  components: {
    'fc-chart': FcChart,
  },
  template: `
    <div>
      <el-card>
        <fc-chart />
      </el-card>
    </div>
  `,
})
export class ChartDemoView extends ViewController {}
