import { Component, Prop } from 'vue-property-decorator'
import { ViewController } from '../src/ViewController'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { EChartsOption } from 'echarts'
const VChart = require('vue-echarts').default

use([
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  LineChart,
  BarChart,
])

export interface LineChartLegend {
  name: string
  data: {}
  lineStyle?: {
    type: 'solid' | 'dashed' | 'dotted'
  }
}

export interface LineChartData {
  title: string
  xAxisValues: (string | number)[]
  xAxisLabelFormat?: (val: string | number) => string
  legends: LineChartLegend[]
  onClick?: (params: ChartClickParams) => void
}

export interface ChartClickParams {
  seriesName: string
  xValue: string
  yValue: number
}

interface RawChartClickEventParams {
  // 当前点击的图形元素所属的组件名称，
  // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
  componentType: string
  // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
  seriesType: string
  // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
  seriesIndex: number
  // 系列名称。当 componentType 为 'series' 时有意义。
  seriesName: string
  // 数据名，类目名
  name: string
  // 数据在传入的 data 数组中的 index
  dataIndex: number
  // 传入的原始数据项
  data: Object
  // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
  // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
  // 其他大部分图表中只有一种 data，dataType 无意义。
  dataType: string
  // 传入的数据值
  value: number | number[]
  // 数据图形的颜色。当 componentType 为 'series' 时有意义。
  color: string
}

/**
 * @description https://github.com/ecomfe/vue-echarts
 */
@Component({
  components: {
    'v-chart': VChart,
  },
  template: `<v-chart :option="options" :style="{ height: height }" :autoresize="true" @click="onClick" />`,
})
export class MyLineChart extends ViewController {
  @Prop({ default: '600px', type: String }) readonly height!: string
  @Prop({ default: null, type: Object }) readonly data!: LineChartData

  seriesType: string = 'line'

  onClick(params: RawChartClickEventParams) {
    if (this.data.onClick) {
      this.data.onClick({
        seriesName: params.seriesName,
        xValue: params.name,
        yValue: params.value as number,
      })
    }
  }

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
        axisPointer: {
          label: {
            formatter: this.data.xAxisLabelFormat
              ? (params) => {
                  return this.data.xAxisLabelFormat!(params.value as any)
                }
              : undefined,
          },
        },
      },
      yAxis: {
        type: 'value',
      },
      series: legends.map((item) => {
        return {
          name: item.name,
          type: this.seriesType as any,
          smooth: true,
          data: xAxisValues.map((xVal) => item.data[xVal]),
          lineStyle: {
            ...(item.lineStyle || {}),
          },
        }
      }),
    }
  }
}
