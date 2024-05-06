<template>
  <div class="timer-container">
    <img src="../public/graphic4.svg" alt="" /> <a href=""><span class="timer-button"></span></a>
    <div class="timer">
      <div class="timer-display">
        <Icon class="icon" icon="ep:arrow-left-bold" @click="useStore.incrementMinute" />
        <h1 class="c1">{{ useStore.formattedTime }}</h1>
        <Icon class="icon" icon="ep:arrow-right-bold" @click="useStore.decrementMinute" />
      </div>
      <button @click="useStore.toggleTimer">
        {{ useStore.isTimerRunning ? '停止計時' : '開始計時' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const useStore = usedefineStore()
</script>

<style lang="scss" scoped>
.timer-container {
  width: 346px;
  height: 287px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #454545;
  position: absolute;
  padding: 32px;
  box-shadow: 0px 12px 32px 0px #00000012;
  top: 320px;
  right: 170px;
  z-index: 1000;
  .icon {
    display: block;
    color: transparent;
    transition: 0.3s ease;
    cursor: pointer;
  }
}
.timer-display:hover .icon {
  color: #454545;
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
}

button {
  cursor: pointer;
  color: #ffff;
  width: 100%;
  height: 40px;
  outline: none;
  border-radius: 4px;
  background-color: black;
  font-size: 20px;
  font-weight: 700;
  margin-top: 32px;
}
</style>
