export default defineNuxtRouteMiddleware((from, to) => {
  const isLogin = useCookie('cookie3')
  console.log(isLogin)
  if (!isLogin.value) {
    alert('麻煩先登入!')
    return navigateTo('/')
  }
})