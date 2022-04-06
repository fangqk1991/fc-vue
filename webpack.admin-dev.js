const { WebpackBuilder } = require('@fangcha/webpack')

module.exports = new WebpackBuilder()
  .setDevMode(true)
  .setEntry('./tests/app-admin.ts')
  .setHtmlTitle('Fangcha Test')
  .build()
