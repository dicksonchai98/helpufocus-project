<template>
  <div class="body">
    <div v-show="isShow" class="popup-box">
      <div class="popup">
        <div class="content">
          <header>
            <h3>新增筆記本</h3>
            <Icon
              class="icon"
              icon="material-symbols-light:close"
              style="color: black"
              @click="toggleShow"
            />
          </header>
          <hr />
          <form action="#" @submit="addNote">
            <div>
              <label>目錄</label>
              <input v-model="data.title" type="text" />
            </div>
            <div>
              <label>内容</label>
              <textarea v-model="data.content"></textarea>
            </div>
            <button @click.prevent="addNote">新增</button>
          </form>
        </div>
      </div>
    </div>
    <div class="progressbar-container">
      <div class="book-img"></div>
      <div class="progressbar-content">
        <div><h3>長壽商機崛起</h3></div>
        <div class="book-page">
          <p>已經讀了70頁</p>
          <p>剩下70頁</p>
        </div>
        <div class="progress">
          <div :style="{ width: progress + '%' }" class="progress__fill"></div>
          <span class="progress__text">{{ progress }}%</span>
        </div>
      </div>
    </div>
    <div class="notebook-container">
      <div class="notebook-title">
        <div>總覽</div>
        <div>本書筆記</div>
        <Icon
          class="icon"
          icon="material-symbols-light:add"
          style="color: black"
          @click="toggleShow"
        />
        <Icon class="icon" icon="material-symbols-light:add" style="color: black" @click="show" />
        <div ref="wrapper" class="timer">
          <Icon
            class="header"
            icon="material-symbols:drag-indicator"
            style="color: black"
            @mousedown="onMouseDown"
          />
          <Icon icon="material-symbols:cancel" style="color: black" />
          <p>計時器</p>
          <p>{{ useStore.formattedTime }}</p>
        </div>
      </div>
      <div v-for="(notes, index) in note" :key="index" class="notebook-list">
        <div class="note-container">
          <h3 class="note-title">{{ notes.title }}</h3>
          <div class="note-content">
            {{ notes.content }}
          </div>
          <hr />
          <div class="bottom-content">
            <div class="note-date">{{ notes.formattedDate }}</div>
            <div class="note-setting">
              <Icon icon="tabler:dots" style="color: white" />
              <ul class="menu">
                <li @click="editNote(notes.title, notes.content, index)">
                  <Icon icon="material-symbols-light:edit" style="color: black" />Edit
                </li>
                <li @click="deleteNote(index)">
                  <Icon icon="material-symbols-light:delete" style="color: black" />Delete
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const useStore = usedefineStore()
const progress = ref(80)
const note = ref([])

const data = reactive({
  title: '',
  content: '',
  formattedDate: ''
})

const isEdit = ref(false)
const updateId = ref(0)

const deleteNote = (index) => {
  note.value.splice(index, 1)
}
const editNote = (titles, contents, index) => {
  isEdit.value = !isEdit.value
  data.title = titles
  data.content = contents
  updateId.value = index
  toggleShow()
}
const show = () => {
  console.log(note.value[updateId.value])
  console.log(note.value)
  console.log(note.value[1])
}
const addNote = () => {
  if (data.title !== '' && data.content !== '') {
    if (!isEdit.value) {
      const currentDate = new Date()
      // 格式化日期
      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      data.formattedDate = currentDate.toLocaleDateString('en-US', options)
      const newData = { ...data }

      note.value.push(newData)
      isShow.value = !isShow.value
    } else {
      const currentDate = new Date()
      // 格式化日期
      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      data.formattedDate = currentDate.toLocaleDateString('en-US', options)
      const newData = { ...data }
      note.value[updateId.value] = newData
      isShow.value = !isShow.value
      isEdit.value = !isEdit.value
    }
  }
  // 清空 data 中的 title 和 content
  data.title = ''
  data.content = ''
  data.formattedDate = ''
}

const isShow = ref(false)
const toggleShow = () => {
  console.log('hello')
  isShow.value = !isShow.value
}

const wrapper = ref(null)

const onMouseDown = (event) => {
  const initialLeft = wrapper.value.offsetLeft
  const initialTop = wrapper.value.offsetTop
  const initialX = event.clientX
  const initialY = event.clientY

  const onMouseMove = (e) => {
    const movementX = e.clientX - initialX
    const movementY = e.clientY - initialY

    wrapper.value.style.left = `${initialLeft + movementX}px`
    wrapper.value.style.top = `${initialTop + movementY}px`
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
}
.notebook-container {
  width: 965px;
  height: 100vh;
  margin: 20px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 0;
}
.notebook-title {
  display: flex;
  width: 100%;
  align-items: center;
  div {
    margin-right: 10px;
  }
}
.notebook-list {
  margin-top: 10px;
  width: 100%;
}
.note-container {
  width: 100%;
  height: 140px;
  background-color: rgb(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 15px;
  .note-content {
    margin-top: 10px;
  }
  hr {
    margin-top: 13px;
  }
}
.bottom-content {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.note-setting {
  position: relative;
  ul {
    list-style: none;
    width: 100px;
    height: auto;
    line-height: 30px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    position: absolute;
    bottom: 20px;
    left: 10px;
    transform: scale(0);
    transition: 0.1s ease;
    transform-origin: bottom left;
    li:hover {
      background-color: rgb(187, 207, 226);
    }
  }
}
.note-setting:hover ul {
  transform: scale(1);
}

.popup-box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

header {
  display: flex;
  justify-content: space-between;
}
.popup {
  width: 500px;
  height: auto;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  transition: all 0.3s ease;
  input,
  textarea {
    width: 100%;
    height: 30px;
    padding: 10px;
    outline: none;
    font-size: 17px;
    border-radius: 4px;
    border: 1px solid #999;
    margin-bottom: 10px;
  }
  textarea {
    height: 300px;
    resize: none;
  }
  form {
    margin-top: 20px;
  }
  hr {
    margin-top: 20px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  button {
    background-color: #6a93f8;
    cursor: pointer;
    color: white;
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 4px;
  }
}
.menu li {
  cursor: pointer;
}

.timer {
  display: flex;
  align-items: center;
  width: 200px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  justify-content: space-around;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  cursor: grab;
}

.progressbar-container {
  width: 959px;
  height: 185px;
  border-radius: 92.5px;
  background-color: #ffa15e;
  margin: auto;
  align-items: center;
  padding: 0 100px;
  display: grid;
  grid-template-columns: 20% 80%;
  color: white;
}
.progressbar-content {
  width: 100%;
  > div {
    margin: 15px 0;
  }
}
.book-img {
  width: 100px;
  height: 150px;
  overflow: hidden;
  border: 1px solid #6a93f8;
}
.book-page {
  display: flex;
  justify-content: space-between;
}

.progress {
  position: relative;
  width: 100%;
  height: 20px;
  background: #9cbab4;
  border-radius: 5px;
  overflow: hidden;
}

.progress__fill {
  width: 0%;
  height: 100%;
  background: #009579;
  transition: all 0.2s;
}

.progress__text {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  font:
    bold 14px 'Quicksand',
    sans-serif;
  color: #ffffff;
}
</style>
