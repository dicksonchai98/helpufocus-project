// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: ['~/plugins/spline-viewer.client.ts'],

  // compiler options
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag === 'spline-viewer'
      }
    }
  },
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
          Roboto: true,
          Inter: [200, 700],
          'Josefin+Sans': true,
          Lato: [100, 300],
          Raleway: {
            wght: [100, 400],
            ital: [100]
          },
          Inter: '200..700',
          'Crimson Pro': {
            wght: '200..900',
            ital: '200..700'
          }
        }
      }
    ]
  ],

  imports: {
    dirs: ['./stores']
  },
  runtimeConfig: {
    firebaseKey: '',
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
