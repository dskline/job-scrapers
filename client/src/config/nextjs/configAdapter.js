/* eslint @typescript-eslint/no-var-requires:0 */
/**
 * TODO: convert this file to typescript (pending https://github.com/zeit/next.js/issues/9607)
 */
const convict = require('convict')
const defaultConfig = require('../default.json')

class NextConfigAdapter {
  publicConfig
  privateConfig

  constructor () {
    const config = convict(defaultConfig)

    // Load environment dependent configuration
    const env = config.get('env')
    config.loadFile(`./src/config/${env}.json`)

    this.privateConfig = Object.keys(defaultConfig).reduce((obj, key) => {
      obj[key] = config.get(key)
      return obj
    }, {})

    this.publicConfig = Object.keys(this.privateConfig).reduce((obj, key) => {
      if (defaultConfig[key].sensitive) {
        delete obj[key]
      }
      return obj
    }, this.privateConfig)
  }
}
const adapter = new NextConfigAdapter()

module.exports = {
  publicRuntimeConfig: adapter.publicConfig,
  serverRuntimeConfig: adapter.privateConfig,
}
