import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import 'vue-loading-overlay/dist/css/index.css'

export const usedefineStore = defineStore('user', () => {
  const minutes = ref(0)
  const seconds = ref(0)
  const isTimerRunning = ref(false)
  const isShow = ref(false)
  let timerInterval
  const route = useRoute()

  const isLoading = ref(false)

  const submitLoading = (routing) => {
    if (isLogin.value === true && route.path !== routing) {
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    }
  }

  const toggleTimers = () => {
    isShow.value = !isShow.value
  }

  const formattedMinutes = computed(() => String(minutes.value).padStart(2, '0'))
  const formattedSeconds = computed(() => String(seconds.value).padStart(2, '0'))

  const formattedTime = computed(() => {
    return `${formattedMinutes.value}:${formattedSeconds.value}`
  })

  const decrementMinute = () => {
    if (minutes.value > 0) {
      minutes.value -= 5
    }
  }

  const incrementMinute = () => {
    minutes.value += 5
  }

  const decrementSecond = () => {
    if (seconds.value > 0) {
      seconds.value--
    } else if (minutes.value > 0) {
      seconds.value = 59
      minutes.value--
    }
  }
  const allPosts = ref([])
  const userRank = ref([])
  const BookList = ref([])
  const userInfo = ref([])
  const noteList = ref([])
  const data = ref('')

  onBeforeMount(async () => {
    try {
      submitLoading()
      await refreshApi()
      getBookList()
      getNoteList()
    } catch (error) {
      console.log(error)
    }
  })

  const getNoteList = async () => {
    const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
    const now = Date.now()
    if (now > tokenExpiredTime) {
      await refreshApi()
    }
    const data = await $fetch('/api/notes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      }
    })
    noteList.value = data.notes
    console.log(noteList)
    return data
  }

  async function refreshApi() {
    try {
      const data = await $fetch('/api/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({
          refresh_token: localStorage.getItem('refreshToken')
        })
      })
      const tokenExpiredTime = data.expire_at * 1000
      console.log(tokenExpiredTime)
      localStorage.setItem('tokenExpiredTime', tokenExpiredTime)
      userInfo.value = data
      isLogin.value = true
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const Router = useRouter()
  const username = ref('')
  const password = ref('')
  const loginError = ref('')
  const isLogin = ref(false)
  watch(
    () => isLogin,
    (newValue, oldValue) => {
      if (!newValue) {
        logOut()
      }
    }
  )

  const login = async () => {
    try {
      const data = await $fetch('api/auth/login', {
        method: 'POST',
        body: {
          username: username.value,
          password: password.value
        }
      })
      submitLoading()
      const tokenExpiredTime = data.expire_at * 1000
      localStorage.setItem('tokenExpiredTime', tokenExpiredTime)
      localStorage.setItem('refreshToken', data.refresh_token)
      username.value = ''
      password.value = ''
      userInfo.value = data
      isLogin.value = true
      document.cookie = 'cookie3=value3'
      getBookList()
      getNoteList()
      Router.push({ path: '/reading' })
    } catch (error) {
      console.log(error)
      loginError.value = error
    }
  }
  const signUp = async () => {
    try {
      const data = await $fetch('api/auth/signUp', {
        method: 'POST',
        body: {
          username: username.value,
          password: password.value
        }
      })
      console.log(data)
    } catch (error) {
      console.log(error)
      loginError.value = error
    }
    username.value = ''
    password.value = ''
    Router.push({ path: '/' })
  }

  const followingUsers = (id) => {
    return userRank.value.some((user) => user.user_id === id)
  }

  const FollowUser = async (id) => {
    const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
    const now = Date.now()
    if (now > tokenExpiredTime) {
      const refreshToken = localStorage.getItem('refreshToken')
      await refreshApi(refreshToken)
      console.log('refresh')
    }
    const res = await $fetch('/api/rank/follow', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      },
      body: {
        follow_user_id: id,
        follow_or_not: followingUsers(id) ? 0 : 1
      }
    })
    getRank()
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      }
    })
    Toast.fire({
      icon: 'success',
      title: '已更新關注名單！'
    })
  }

  const getBookList = async () => {
    const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
    const now = Date.now()
    if (now > tokenExpiredTime) {
      const refreshToken = localStorage.getItem('refreshToken')
      await refreshApi(refreshToken)
    }
    const res = await $fetch('/api/books', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      }
    })
    BookList.value = res.books
    console.log(res)
    return res.books
  }

  const getRank = async () => {
    const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
    const now = Date.now()
    if (now > tokenExpiredTime) {
      const refreshToken = localStorage.getItem('refreshToken')
      await refreshApi(refreshToken)
    }
    const res = await $fetch('/api/rank?type=follow', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      }
    })
    console.log(res)
    userRank.value = res.rank
    console.log('getrank')
    return res
  }
  const allUserRank = ref([])
  const getAllRank = async () => {
    const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
    const now = Date.now()
    if (now > tokenExpiredTime) {
      const refreshToken = localStorage.getItem('refreshToken')
      await refreshApi(refreshToken)
    }
    const res = await $fetch('/api/rank?type=all', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      }
    })
    console.log(res)
    allUserRank.value = res.rank
    return res
  }

  const toggleTimer = () => {
    isTimerRunning.value = !isTimerRunning.value
    isShow.value = !isShow.value
    if (isTimerRunning.value) {
      timerInterval = setInterval(() => {
        if (minutes.value === 0 && seconds.value === 0) {
          stopTimer()
          isTimerRunning.value = !isTimerRunning.value
          alert('已完成')
        } else {
          decrementSecond()
        }
      }, 1000)
    } else {
      stopTimer()
    }
  }

  const logOut = async () => {
    const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
    const now = Date.now()
    if (now > tokenExpiredTime) {
      const refreshToken = localStorage.getItem('refreshToken')
      await refreshApi(refreshToken)
    }
    const res = await $fetch('/api/auth/logout', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      }
    })
    console.log(res)
    localStorage.removeItem('refreshToken')
    document.cookie = 'cookie3=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    Router.push({ path: '/' })
    userInfo.value = []
    isLogin.value = false
  }

  const isTimerStop = ref(false)

  const stopTimer = () => {
    isTimerStop.value = !isTimerStop.value
  }

  return {
    minutes,
    seconds,
    isTimerRunning,
    timerInterval,
    formattedMinutes,
    formattedSeconds,
    formattedTime,
    decrementMinute,
    incrementMinute,
    toggleTimer,
    stopTimer,
    isShow,
    toggleTimers,
    userInfo,
    refreshApi,
    BookList,
    data,
    getBookList,
    noteList,
    getNoteList,
    login,
    username,
    password,
    loginError,
    isTimerStop,
    logOut,
    allPosts,
    signUp,
    isLogin,
    getRank,
    userRank,
    FollowUser,
    followingUsers,
    allUserRank,
    getAllRank,
    isLoading,
    submitLoading
  }
})
