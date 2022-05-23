import { Component, Prop } from 'vue-property-decorator'
import { ViewController } from '../src/ViewController'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { EChartsOption } from 'echarts'
const VChart = require('vue-echarts').default

use([CanvasRenderer, GridComponent, TitleComponent, TooltipComponent, ToolboxComponent, LegendComponent, LineChart])

export interface LineChartLegend {
  name: string
  data: {}
}

export interface LineChartData {
  title: string
  xAxisValues: (string | number)[]
  xAxisLabelFormat?: (val: string | number) => string
  legends: LineChartLegend[]
}

/**
 * @description https://github.com/ecomfe/vue-echarts
 */
@Component({
  components: {
    'v-chart': VChart,
  },
  template: `<v-chart :option="options" :style="{ height: height }" :autoresize="true"></v-chart>`,
})
export class MyLineChart extends ViewController {
  @Prop({ default: '600px', type: String }) readonly height!: string
  @Prop({ default: null, type: Object }) readonly data!: LineChartData

  get options(): EChartsOption {
    const legends = this.data.legends
    const xAxisValues = this.data.xAxisValues
    return {
      title: {
        text: this.data.title,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        // orient: 'vertical',
        // left: 'left',
        bottom: '0',
        data: legends.map((item) => item.name),
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisValues,
        axisLabel: {
          formatter: this.data.xAxisLabelFormat,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: legends.map((item) => {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          data: xAxisValues.map((xVal) => item.data[xVal]),
        }
      }),
    }
  }
}
