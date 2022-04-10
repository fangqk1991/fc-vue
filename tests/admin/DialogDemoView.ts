import { Component, HtmlDisplayPanel, HtmlEditorDialog, HtmlPreviewDialog, ViewController } from '../../src'

@Component({
  components: {
    'html-display-panel': HtmlDisplayPanel,
  },
  template: `
    <div>
      <el-card>
        <h4>HTML Dialogs</h4>
        <div>
          <el-button @click="onClick_HtmlPreviewDialog">HtmlPreviewDialog</el-button>
          <el-button @click="onClick_HtmlEditorDialog">HtmlEditorDialog</el-button>
        </div>
      </el-card>
      <el-card class="mt-3">
        <h4>HtmlDisplayPanel</h4>
        <html-display-panel v-model="demoHTML" :show-iframe="true" :editable="true" />
      </el-card>
    </div>
  `,
})
export class DialogDemoView extends ViewController {
  demoHTML = `
<html>
  <style>
    body, p { margin: 0; }
  </style>
  <body>
    <p style="height: 100vh; overflow-x: hidden; overflow-y: auto; background: #4b5cc4">Some Text.</p>
  </body>
</html>
  `
  onClick_HtmlPreviewDialog() {
    HtmlPreviewDialog.previewHTML(this.demoHTML)
  }

  onClick_HtmlEditorDialog() {
    const dialog = HtmlEditorDialog.dialogForEdit(this.demoHTML)
    dialog.show(async (content) => {
      console.info(content)
    })
  }
}
