import { Component, ViewController } from '../../src'
import { MyPieChart } from '../../echarts/MyPieChart'
import { MyLineChart } from '../../echarts/MyLineChart'

@Component({
  components: {
    'my-pie-chart': MyPieChart,
    'my-line-chart': MyLineChart,
  },
  template: `
    <div>
      <h4>Charts</h4>
      <el-tabs type="card" class="mt-4" value="line-chart">
        <el-tab-pane label="Pie Chart" name="pie-chart">
          <my-pie-chart />
        </el-tab-pane>
        <el-tab-pane label="Line Chart" name="line-chart">
          <my-line-chart />
        </el-tab-pane>
      </el-tabs>
    </div>
  `,
})
export class ChartDemoView extends ViewController {}
