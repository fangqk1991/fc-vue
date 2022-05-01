import { Component, MySelect, MyTableView, TableViewProtocol, ViewController } from '../../src'
import { CommonAPI } from '@fangcha/app-request'
import { MyAxios } from '../../basic'
import { DownloadApis } from '@fangcha/oss-service/lib/common/apis'
import { ResourceTaskModel, ResourceTaskStatus } from '@fangcha/oss-service/lib/common/models'

@Component({
  components: {
    'my-select': MySelect,
    'my-table-view': MyTableView,
  },
  template: `
    <div>
      <h2>下载列表</h2>
      <my-table-view ref="tableView" :delegate="delegate">
        <el-table-column label="导出时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | ISO8601 }}
          </template>
        </el-table-column>
        <el-table-column label="文件名" prop="fileName" />
        <el-table-column label="文件大小">
          <template slot-scope="scope">
            <span v-if="scope.row.size">{{ formatSize(scope.row.size) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务状态" prop="taskStatus" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.taskStatus === ResourceTaskStatus.Processing">
              <span>文件生成中 {{ scope.row.current }} / {{ scope.row.total }}</span>
            </template>
            <template v-if="scope.row.taskStatus === ResourceTaskStatus.Fail">
              <span>生成失败</span>
              |
              <a href="javascript:" @click="retryDownload(scope.row)">重新下载</a>
            </template>
            <a v-if="scope.row.taskStatus === ResourceTaskStatus.Success" :href="scope.row.downloadUrl" target="_blank">下载</a>
          </template>
        </el-table-column>
      </my-table-view>
    </div>
  `,
})
export class ResourceTaskListView extends ViewController {
  ResourceTaskStatus = ResourceTaskStatus
  filterParams: any = this.initFilterParams(true)

  initFilterParams(useQuery = false) {
    const query = useQuery ? this.$route.query : {}
    return {
      _: query['_'] || '',
    }
  }

  async viewDidLoad() {
    this.tableView().resetFilter(true)
  }

  onFilterUpdate() {
    this.tableView().onFilterUpdate()
  }

  resetFilter(useQuery = false) {
    this.filterParams = this.initFilterParams(useQuery)
    this.tableView().reloadData()
  }

  tableView() {
    return this.$refs.tableView as MyTableView
  }
  get delegate(): TableViewProtocol {
    return {
      loadData: async (retainParams) => {
        const params: any = {
          ...retainParams,
          ...this.filterParams,
        }
        const request = MyAxios(new CommonAPI(DownloadApis.ResourceTaskPageDataGet))
        request.setQueryParams(params)
        return request.quickSend()
      },
      reactiveQueryParams: (retainQueryParams) => {
        return Object.assign({}, retainQueryParams, this.filterParams)
      },
    }
  }

  formatSize(size: number) {
    let unit
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    while ((unit = units.shift()) && size > 1024) {
      size = size / 1024
    }
    return `${unit === 'B' ? size : size.toFixed(2)}${unit}`
  }

  async retryDownload(data: ResourceTaskModel) {
    const request = MyAxios(new CommonAPI(DownloadApis.ResourceTaskRetry, data.taskKey))
    await request.quickSend()
    this.$message.success('已提交重试')
    this.tableView().reloadData()
  }
}
