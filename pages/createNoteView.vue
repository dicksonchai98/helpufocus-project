<template>
  <div class="body">
    <div class="container">
      <div v-show="isShow" class="popup-box">
        <div class="popup">
          <div class="content">
            <div class="progressbar-content">
              <div class="book-page">
                <p>
                  <Icon
                    icon="typcn:tick"
                    width="25"
                    height="25"
                    style="color: #00a52e"
                  />我已看了77頁
                </p>
                <h1>40<span>%</span></h1>
              </div>
              <div class="progress-container">
                <div class="progress">
                  <div :style="{ width: progress + '%' }" class="progress__fill"></div>
                  <span class="progress__text">{{ progress }}%</span>
                </div>
                <p>124 / 240</p>
              </div>
            </div>

            <form action="#" @submit="addNote">
              <div>
                <input v-model="data.title" placeholder="點擊開始打字..." type="text" />
              </div>
              <div>
                <textarea v-model="data.content"></textarea>
              </div>
              <div>
                <button @click.prevent="toggleShow">取消</button>
                <button @click.prevent="addNote">新增</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="progressbar-container">
        <div class="progressbar-content">
          <div class="book-page">
            <p>
              <Icon icon="typcn:tick" width="25" height="25" style="color: #00a52e" />已經讀了70本書
            </p>
            <h1>40<span>%</span></h1>
          </div>
          <div class="progress-container">
            <div class="progress">
              <div :style="{ width: progress + '%' }" class="progress__fill"></div>
              <span class="progress__text">{{ progress }}%</span>
            </div>
            <p>還剩下24本書</p>
          </div>
        </div>
        <div class="book-img"><img src="../../public/graphic3.svg" alt="" /></div>
      </div>
      <div class="notebook-container">
        <div class="notebook-title">
          <ul>
            <li>待看書單</li>
            <li>完成書單</li>
            <li>喜愛書單</li>
          </ul>
          <div class="add-btn">
            <Icon
              class="icon"
              icon="material-symbols:add-circle"
              style="color: #ff7512"
              width="43px"
              height="43px"
              @click="getBookList()"
            />
          </div>

          <div v-show="useStore.isTimerRunning" ref="wrapper" class="timer">
            <Icon
              class="header"
              icon="material-symbols:add-circle"
              style="color: black"
              @mousedown="onMouseDown"
            />
            <Icon icon="material-symbols:cancel" style="color: black" />
            <p>計時器</p>
            <p>{{ useStore.formattedTime }}</p>
          </div>
        </div>
        <div>
          <Icon icon="mingcute:right-fill" width="30" height="30" style="color: #cbcbcb" />
          <p>選一本好書吧 🏃🏻‍♀️</p>
        </div>
        <div>
          <div v-for="notes in bookLists.books" :key="notes.book_id" class="notebook-list">
            <div class="note-container">
              <div class="img-container"><img src="" alt="" /></div>
              <div>
                <h2 class="note-title">{{ notes.book_name }}</h2>
                <div class="note-content">
                  <p></p>
                </div>
                <div class="progress-container">
                  <div class="progress">
                    <div
                      :style="{ width: notes.book_read_page / notes.book_total_page + '%' }"
                      class="progress__fill"
                    ></div>
                  </div>
                  <p>{{ notes.book_read_page }} / {{ notes.book_total_page }}</p>
                </div>
              </div>
              <div>
                <nuxt-link :to="`/reading/${notes.book_id}`">
                  <p>筆記本</p>
                  <Icon icon="mingcute:right-fill" width="20" height="20" style="color: #ff7512" />
                </nuxt-link>
              </div>
              <!-- <div class="bottom-content">
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
                  </div> -->
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
const progress = computed((a, b) => {
  return a / b
})
const note = ref([
  {
    title: '書本',
    content:
      '書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容',
    formattedDate: new Date()
  },
  {
    title: '書本',
    content:
      '書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容書本内容',
    formattedDate: new Date()
  }
])

const data = reactive({
  title: '書本',
  content: '書本内容',
  formattedDate: new Date()
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

const addNotes = async () => {
  try {
    const data = await $fetch('api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })
    console.log(data)
    localStorage.setItem('refreshToken', data.refresh_token)
    Router.push({ path: '/createNoteView' })
    user.value = data
    console.log(useStore.userInfo)
  } catch (error) {
    console.log(error.data)
    loginError.value = error.data.message
  }
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

const bookLists = ref([])

onMounted(() => {
  watchEffect(() => {
    bookLists.value = useStore.BookList
    console.log(bookLists.value.books)
  })
})
</script>

<style lang="scss" scoped>
.body {
  background-color: #fbfbfb;
  .container {
    width: 77%;
    margin: auto;
  }
}

.notebook-container {
  width: 100%;
  height: auto;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  z-index: 0;
  > div:nth-child(2) {
    padding: 19px 0;
    display: flex;
    align-items: center;
    p {
      font-size: 24px;
      color: #cbcbcb;
    }
  }
  > div:nth-child(3) {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
}
.notebook-title {
  justify-content: space-between;
  font-size: 20px;
  display: flex;
  height: 43px;
  width: 100%;
  align-items: center;
  ul {
    text-decoration: none;
    list-style: none;
    display: flex;
    gap: 30px;
    height: 100%;
    li {
      display: inline-block;
      height: 100%;
      line-height: 43px;
      font-size: 20px;
      font-weight: 700;
      color: #6f6f6f;
      cursor: pointer;
    }
  }
  .icon {
    cursor: pointer;
  }
}

.notebook-title ul li:hover {
  border-bottom: 4px solid orange;
}

.add-btn:hover ul {
  display: flex;
}
.add-btn ul {
  width: 200px;
  height: 200px;
  background-color: white;
  position: absolute;
  right: 160px;
  padding: 16px 20px 16px 20px;
  border-radius: 8px;
  display: none;
  flex-direction: column;
  text-align: center;
  box-shadow: 0px 12px 36px 0px #00000012;
  gap: 0px;

  li {
    border-bottom: 0.5px solid #d7d7d7;
    width: 160px;
    height: 53px;
    line-height: 53px;
    display: flex;
    padding: auto;
    align-items: center;
    justify-content: center;
    h3 {
      margin-left: 5px;
    }
  }
}
.notebook-list {
  width: 100%;
  height: auto;
}
.note-container {
  width: 100%;
  height: 194px;
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  margin-bottom: 20px;
  padding: 28px 48px 28px 48px;
  gap: 30px;
  border-radius: 15px;
  box-shadow: 0px 6px 16px 0px #00000012;
  .img-container {
    width: 91px;
    height: 138px;
    background-color: #00a52e;
    margin: auto;
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2 {
      font-weight: 700;
    }
    p {
      font-size: 12px;
    }
  }
  > div:nth-child(3) {
    a {
      display: flex;
      text-decoration: none;
      color: black;
    }
    display: flex;
    align-items: flex-end;

    justify-content: flex-end;
  }
  .note-content {
    height: 60px;
    width: 420px;
  }
  .progress-container {
    display: flex;
    align-items: center;
  }
  .progress {
    width: 80%;
    margin-right: 10px;
    background-color: #e6e6e6;
    height: 13px;
  }
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
  right: -450px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 100;
  .progress-container {
    justify-content: space-between;
  }
  .progress {
    position: relative;
    width: 70%;
    height: 20px;
    background: #9cbab4;
    border-radius: 32px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    z-index: 0;
  }

  .progress__fill {
    width: 10%;
    height: 100%;
    background: #00a52e;
    transition: all 0.2s;
    border-radius: 32px;
  }
}

.popup {
  width: 509px;
  height: 90%;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0px 12px 32px 0px #00000012;

  input,
  textarea {
    width: 100%;
    height: 30px;
    padding: 10px;
    outline: none;
    font-size: 17px;
    border-radius: 4px;
    border: none;
    margin-bottom: 10px;
  }
  textarea {
    height: 300px;
    resize: none;
  }
  form {
    margin-top: 20px;
    div:last-child {
      display: flex;
      justify-content: space-around;
    }
  }
  hr {
    margin-top: 20px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  button {
    cursor: pointer;
    color: #ff7512;
    width: 188px;
    height: 48px;
    border: 1px solid #ff7512;
    outline: none;
    border-radius: 4px;
    background-color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    margin-top: 80px;
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
  margin-top: 96px;
  width: 100%;
  height: 153px;
  border-radius: 8px;
  background-color: #f1f1f1;
  padding: 24px 60px 24px 60px;
  display: grid;
  grid-template-columns: 3fr 1fr;
}
.progressbar-content {
  width: 100%;
}
.book-img {
  width: 88px;
  height: 105px;
  overflow: hidden;
  margin: auto;
  margin-right: 60px;
}
.book-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 24px;
    font-weight: 700;
  }
  h1 {
    font-size: 64px;
    font-weight: 700;
    color: #00a52e;
  }
  span {
    font-size: 35px;
    font-weight: 700;
  }
}

.progress {
  position: relative;
  width: 567px;
  height: 20px;
  background: #9cbab4;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  z-index: 0;
}

.progress__fill {
  width: 10%;
  height: 100%;
  background: #00a52e;
  transition: all 0.2s;
  border-radius: 32px;
}
.progress-container {
  display: flex;
  justify-content: space-between;

  p {
    width: 105px;
    font-size: 14px;
  }
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
