<template>
  <div class="body">
    <div class="timer-container">
      <p>現在就開始工作吧！</p>
      <a href=""><span class="timer-button"></span></a>
      <div class="timer">
        <div class="timer-display">
          <Icon class="icon" icon="ep:arrow-left-bold" @click="useStore.incrementMinute" />
          <h1 class="c1">{{ useStore.formattedTime }}</h1>
          <Icon class="icon" icon="ep:arrow-right-bold" @click="useStore.decrementMinute" />
        </div>
        <button @click="useStore.toggleTimer">
          {{ useStore.isTimerRunning ? '停止計時' : '開始計時' }}
        </button>
        <button @click="useStore.toggleTimer">筆記本</button>
        <button @click="useStore.toggleTimer">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const useStore = usedefineStore()
</script>

<style lang="scss" scoped>
.timer-container {
  width: 965px;
  background-color: #51a387;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  position: relative;
  .icon {
    display: block;
    color: transparent;
    transition: 0.3s ease;
    cursor: pointer;
  }
}
.timer-display:hover .icon {
  color: white;
}

.timer-display {
  width: 239px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.timer {
  margin-top: 10px;
  height: 100px;
  button {
    border: none;
    background-color: transparent;
    margin: 10px 20px;
    color: white;
  }
}
.timer button:hover {
  border-bottom: 1px dashed black;
  padding-bottom: 5px;
}
</style>
