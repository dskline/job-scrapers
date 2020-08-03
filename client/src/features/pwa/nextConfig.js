// TODO: refactor to typescript (pending https://github.com/zeit/next.js/issues/9607)
/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('../../../package.json')
const { palette } = require('../../config/css/colors.json')

function rgb2hex (rgb) {
  return '#' + ('00000' + (rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16)).slice(-6).toUpperCase()
}

const prod = process.env.NODE_ENV === 'production'

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512]

const plugins = [
  'next-manifest',
  'next-pwa'
]
const withPlugins = config => plugins.reduce((previousValue, plugin) => require(plugin)(previousValue), config)

module.exports = extraOptions => withPlugins({
  ...extraOptions,
  pwa: {
    disable: !prod,
    dest: 'public',
    skipWaiting: false,
  },
  manifest: {
    output: './public',
    name: 'Fantasy Survivor',
    shortName: 'Fantasy Survivor',
    display: 'minimal-ui',
    description: packageJson.description,
    // eslint-disable-next-line @typescript-eslint/camelcase
    start_url: '/',
    themeColor: rgb2hex(palette.primary['500']),
    // backgroundColor: chakraColors.default.gray['200'],
    icons: iconSizes.map(size => ({
      src: `/favicon/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png'
    })),
  }
})
