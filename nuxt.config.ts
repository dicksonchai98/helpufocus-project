// https://nuxt.com/docs/api/configuration/nuxt-config
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
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    },
    analyze: true,
    collapseBooleanAttributes: true,
    collapseWhitespace: false,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeAttributeQuotes: false,
    removeComments: false,
    removeEmptyAttributes: true,
    removeOptionalTags: false,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: false,
    removeStyleLinkTypeAttributes: false,
    removeTagWhitespace: false,
    sortClassName: false,
    trimCustomFragments: true,
    useShortDoctype: true
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
