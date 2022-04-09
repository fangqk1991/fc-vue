import { Component, HtmlEditorDialog, HtmlPreviewDialog, ViewController } from '../../src'

@Component({
  template: `
    <div>
      <h4>Dialogs</h4>
      <div>
        <el-button @click="onClick_HtmlPreviewDialog">HtmlPreviewDialog</el-button>
        <el-button @click="onClick_HtmlEditorDialog">HtmlEditorDialog</el-button>
      </div>
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
