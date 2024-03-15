// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/scss/styles.scss"],
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
      "@pinia/nuxt",
      {
        autoImports: [
          // 自动引入 `defineStore()`
          "defineStore",
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],
  ],
  imports: {
    dirs: ["./stores"],
  },
  runtimeConfig: {
    firebaseKey: '',
    accessTokenSecret: '',
    refreshTokenSecret: '',
  }
});
