import { defineStore } from 'pinia'

export const usedefineStore = defineStore('user', () => {
  const minutes = ref(0)
  const seconds = ref(0)
  const isTimerRunning = ref(false)
  let timerInterval

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

  // const incrementSecond = () => {
  //   if (seconds.value < 59) {
  //     seconds.value++
  //   } else {
  //     seconds.value = 0
  //     minutes.value++
  //   }
  // }

  const toggleTimer = () => {
    isTimerRunning.value = !isTimerRunning.value
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

  const stopTimer = () => {
    clearInterval(timerInterval)
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
    stopTimer
  }
})
