<template>
  <div class="body">
    <div>
      <!-- 你的計時器顯示部分 -->
      <div v-if="timerRunning">
        <p>計時器正在運行...</p>
        <p>剩餘時間: {{ remainingTime }}</p>
      </div>
      <!-- 當計時器運行時阻止訪問其他頁面的警告訊息 -->
      <div v-if="timerRunning">
        <p>請勿離開本頁面，計時器仍在運行。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const timerRunning = ref(true) // 計時器是否在運行
const remainingTime = ref(10) // 剩餘時間，假設為600秒

const startTimer = () => {
  setTimeout(() => {
    timerRunning.value = false
    // 在計時器結束後，你可以觸發任何相應的操作，例如警告用戶或執行其他任務
  }, remainingTime.value * 1000)
}

const handleBeforeUnload = (event) => {
  // 如果計時器仍在運行，阻止用戶離開頁面
  if (timerRunning.value) {
    event.preventDefault()
    // 確保瀏覽器顯示你設置的警告訊息
    event.returnValue = ''
  }
}

startTimer() // 啟動計時器

// 在組件被卸載前，清理事件監聽器
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style lang="scss" scoped></style>
