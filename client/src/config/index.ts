import getConfig from 'next/config'

const config: Config = {
  public: {
    ...getConfig().publicRuntimeConfig,
    // -- hot reload variables --
  },
  private: {
    ...getConfig().serverRuntimeConfig,
    // -- hot reload variables --
  },
}

export default config
