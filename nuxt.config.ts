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
  modules: [
    // ...
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
    ['@nuxtjs/google-fonts', { families: { Inter: '200' } }]
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
