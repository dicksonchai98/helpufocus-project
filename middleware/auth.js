export default defineNuxtRouteMiddleware((from, to) => {
  const useStore = usedefineStore()

  const isLogin = useStore.isLogin
  console.log(isLogin)
  setTimeout(() => {
    if (!isLogin) {
      console.log('hi')
      console.log(isLogin)
      return navigateTo('/')
    }
  }, 2000)
})
