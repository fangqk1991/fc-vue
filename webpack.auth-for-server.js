const { WebpackBuilder } = require('@fangcha/webpack')

module.exports = new WebpackBuilder()
  .setDevMode(true)
  .setPort(16129)
  .setEntry('./tests/auth/app-sso-server.ts')
  .setExtras({
    devServer: {
      proxy: {
        '/api': `http://localhost:16130`,
      },
    },
  })
  .build()
