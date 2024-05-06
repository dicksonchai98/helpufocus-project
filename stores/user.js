import { defineStore } from 'pinia'

export const usedefineStore = defineStore('user', () => {
  const minutes = ref(0)
  const seconds = ref(0)
  const isTimerRunning = ref(false)
  const isShow = ref(false)
  let timerInterval

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
  const BookList = ref([])
  const userInfo = ref([])
  const noteList = ref([])
  const data = ref('')

  onBeforeMount(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      await refreshApi(refreshToken)
      await getBookList()
      await getNoteList()
      await getAllPost()
      console.log(BookList)
    } catch (error) {
      console.log(error)
    }
  })

  const getAllPost = async () => {
    const data = await $fetch('/api/posts', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      }
    })
    allPosts.value = data.posts
    console.log(allPosts)
    return data
  }

  const getNoteList = async () => {
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

  async function refreshApi(api) {
    try {
      const data = await $fetch('/api/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({
          refresh_token: api
        })
      })
      userInfo.value = data
      isLogin.value = true
      console.log(isLogin)

      console.log(userInfo.value)
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

  const login = async () => {
    try {
      const data = await $fetch('api/auth/login', {
        method: 'POST',
        body: {
          username: username.value,
          password: password.value
        }
      })
      localStorage.setItem('refreshToken', data.refresh_token)
      Router.push({ path: '/reading' })
      userInfo.value = data
      isLogin.value = true
      console.log(user)
      await getBookList()
      await getNoteList()
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

  const getBookList = async () => {
    const res = await $fetch('/api/books', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      }
    })
    BookList.value = res
    return res.books
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
    const res = await $fetch('/api/auth/logout', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.value.access_token}`
      }
    })
    console.log(res)
    localStorage.removeItem('refreshToken')
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
    getAllPost,
    signUp,
    isLogin
  }
})
