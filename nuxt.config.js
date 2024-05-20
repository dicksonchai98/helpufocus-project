// https://nuxt.com/docs/api/configuration/nuxt-config
const CompressionWebpackPlugin = require
export default defineNuxtConfig({
  uglify: {
    uglifyOptions: {
      comments: false,
      compress: {
        drop_console: true
      }
    }
  },
  build: {
    extend(config, { isDev, isClient }) {
      if (!isDev && isClient) {
        config.plugins.push(
          new CompressionWebpackPlugin({
            filename: '[path].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
          })
        )
      }
    },
    optimization: {
      minimize: true,
      minimizer: [],
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '-',
        maxSize: 102400,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          common: {
            minChuank: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  devtools: { enabled: true },

  // compiler options

  css: ['~/assets/scss/styles.scss'],
  //   vite: {
  //     css: {
  //       preprocessorOptions: {
  //         scss: {
  //           additionalData: '@use "~/assets/function.scss" as *;'
  //         }
  //       }
  //     }
  //   }
  // })
  // modules: [
  //   // ...
  //   [
  //     '@pinia/nuxt',
  //     {
  //       autoImports: [
  //         // 自动引入 `defineStore()`
  //         'defineStore',
  //         // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
  //         ['defineStore', 'definePiniaStore']
  //       ]
  //     }
  //   ],
  //   ['@nuxtjs/google-fonts', { families: { Inter: '200' } }]
  // ],

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ['defineStore', 'definePiniaStore']
        ]
      }
    ],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Inter: '200..700'
        },
        subsets: ['latin'],
        display: 'swap',
        prefetch: false,
        preconnect: true,
        preload: true,
        download: true,
        base64: true
      }
    ],
    '@nuxt/image'
  ],

  imports: {
    dirs: ['./stores']
  },
  runtimeConfig: {
    firebaseKey: {
      type: '',
      projectId: '',
      privateKeyId: '',
      privateKey: '',
      clientEmail: '',
      clientId: '',
      authUri: '',
      tokenUri: '',
      authProviderX509CertUrl: '',
      clientX509CertUrl: '',
      universeDomain: ''
    },
    accessTokenSecret: '',
    refreshTokenSecret: '',
    firebaseStorage: {
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
    }
  }
})
