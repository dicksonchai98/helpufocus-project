<template>
  <div class="body">
    <div class="container">
      <div v-show="isShow" class="popup-box">
        <div class="popup">
          <div class="content">
            <div class="progressbar-content">
              <div class="book-page">
                <p>
                  <Icon icon="typcn:tick" width="25" height="25" style="color: #00a52e" />我已看了{{
                    books.book_read_page
                  }}頁
                </p>
                <h1>
                  {{ ((books.book_read_page / books.book_total_page) * 100).toFixed(0)
                  }}<span>%</span>
                </h1>
              </div>
              <div class="progress-container">
                <div class="progress">
                  <div
                    :style="{
                      width: ((books.book_read_page / books.book_total_page) * 100).toFixed(0) + '%'
                    }"
                    class="progress__fill"
                  ></div>
                  <span class="progress__text"></span>
                </div>
                <p>{{ books.book_read_page }}/{{ books.book_total_page }}</p>
              </div>
            </div>

            <form v-show="isShow" action="#">
              <div>
                <input v-model="data.title" placeholder="點擊開始打字..." type="text" />
              </div>
              <div>
                <img v-show="!data.content" src="../../public/Graphic 6.svg" alt="" />
                <textarea
                  v-model="data.content"
                  :class="{ 'text-area': data.content }"
                  placeholder="開始寫點東西吧....."
                ></textarea>
              </div>
              <div>
                <button @click.prevent="toggleShow()">取消</button>
                <button
                  v-if="!isEdit"
                  :class="{ btn: data.content == '' || data.title == '' }"
                  @click.prevent="addNotes()"
                >
                  新增
                </button>
                <button v-else @click.prevent="editNotes(updateId)">新增</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="progressbar-container">
        <div class="progressbar-content">
          <div class="book-page">
            <p>
              <Icon icon="typcn:tick" width="25" height="25" style="color: #00a52e" />已經讀了{{
                bookFinished
              }}本書
            </p>
            <h1>{{ percentage || 0 }}<span>%</span></h1>
          </div>
          <div class="progress-container">
            <div class="progress">
              <div :style="{ width: percentage + '%' }" class="progress__fill"></div>
              <span class="progress__text"></span>
            </div>
            <p>還剩下{{ bookList.length - bookFinished }}本書</p>
          </div>
        </div>
        <div class="book-img"><img src="../../public/graphic3.svg" alt="" /></div>
      </div>
      <div class="notebook-container">
        <div class="notebook-title">
          <ul>
            <li>待看書單</li>
            <li>完成書單</li>
          </ul>
          <div class="add-btn">
            <Icon
              class="icon"
              icon="material-symbols:add-circle"
              style="color: #ff7512"
              width="43px"
              height="43px"
              @click="test()"
            />
            <ul>
              <li @click="toggleShow()">
                <Icon icon="ph:note-pencil" width="20" height="20" style="color: orange" />
                <h3>新增筆記</h3>
              </li>

              <li
                :class="{
                  'no-icon':
                    ((books.book_read_page / books.book_total_page) * 100).toFixed(0) === '100'
                }"
                @click="useStore.toggleTimers()"
              >
                <Icon icon="ph:clock-light" width="20" height="20" style="color: orange" />
                <h3>更新頁面</h3>
              </li>
            </ul>
          </div>
          <UpdatePageView v-show="useStore.isShow" :id="id" :books="books" />
        </div>
        <div>
          <div>
            <Icon icon="mingcute:left-fill" width="25" height="25" style="color: black" />
            <nuxt-link to="/reading"
              ><p>{{ bookName }} 🏃🏻‍♀️</p></nuxt-link
            >
          </div>
          <ul>
            <li :class="{ 'seleted-btn': filters === 'all' }" @click.prevent="filters = 'all'">
              所有筆記
            </li>
            <li
              :class="{ 'seleted-btn': filters === 'flavored' }"
              @click.prevent="filters = 'flavored'"
            >
              喜愛筆記
            </li>
          </ul>
        </div>
        <div>
          <div
            v-for="notes in book"
            v-show="filters === 'all'"
            :key="notes.note_id"
            class="notebook-list"
          >
            <NoteView :edit-note="editNote" :notes="notes" />
          </div>
          <div
            v-for="notes in flavoredNote"
            v-show="filters === 'flavored'"
            :key="notes.note_id"
            class="notebook-list"
          >
            <NoteView :edit-note="editNote" :notes="notes" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import UpdatePageView from '../components/updatePageView.vue'
import NoteView from '../components/noteView.vue'
const useStore = usedefineStore()
const { id } = useRoute().params
const filters = ref('all')
const noteLists = ref([])
const bookList = ref([])
const books = ref([])
// 取得完成書單數量
const bookFinished = computed(() => {
  let completeBook = 0
  bookList.value.forEach((book) => {
    if (book.book_read_page / book.book_total_page === 1) completeBook++
  })
  return completeBook
})
// 完成書單百分比
const percentage = computed(() => {
  return ((bookFinished.value / bookList.value.length) * 100).toFixed(0) | '0'
})
// 取得書名
const bookName = computed(() => {
  const foundBook = bookList.value.find((book) => book.book_id === id)
  return foundBook ? foundBook.book_name : null
})
// 取得該書單頁數及完成頁數
const bookReadPage = () => {
  const foundBook = bookList.value.find((book) => book.book_id === id)
  if (foundBook) {
    books.value = foundBook
  }
}
// 取得該筆記的書本
const book = computed(() => {
  formattedDates()
  return noteLists.value.filter((n) => n.note_book_id === id)
})
// 喜愛筆記
const flavoredNote = computed(() => {
  return book.value.filter((note) => note.note_like === 1)
})
// 日期轉換
const formattedDates = () => {
  noteLists.value.forEach(function (item) {
    // 将日期字符串转换为 Date 对象
    const dateObj = new Date(item.note_updated_time)

    // 使用适当的日期时间函数或库来格式化日期，这里示例为 YYYY/MM/DD 格式
    const formattedDate = dateObj.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

    // 更新原始数组中的日期值
    item.note_updated_time = formattedDate

    // 输出更新后的 noteLists 数组
  })
}

// 取得筆記
const getNoteContent = async (id) => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
  }
  const res = await $fetch(`/api/notes/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    }
  })
  return res
}
// 編輯筆記
const data = reactive({
  title: '',
  content: ''
})
const isEdit = ref(false)
const updateId = ref(0)
const editNote = async (id) => {
  const res = await getNoteContent(id)
  toggleShow(res)
}
const isShow = ref(false)
const toggleShow = (res) => {
  isShow.value = !isShow.value
  if (res) {
    data.title = res.note_title
    data.content = res.note_content
    updateId.value = res.note_id
    isEdit.value = !isEdit.value
  } else {
    data.title = ''
    data.content = ''
    if (isEdit.value) {
      isEdit.value = !isEdit.value
    }
  }
}
const editNotes = async (id) => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
  }
  const res = await $fetch(`/api/notes/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    },
    body: {
      note_title: data.title,
      note_content: data.content
    }
  })
  isShow.value = !isShow.value
  isEdit.value = !isEdit.value
  useStore.getNoteList()
  console.log(res)
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
    title: '筆記已更新！'
  })
}
// 上傳筆記
const addNotes = async () => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
  }
  if (data.title !== '' && data.content !== '') {
    if (!isEdit.value) {
      const res = await $fetch('/api/notes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useStore.userInfo.access_token}`
        },
        body: {
          note_title: data.title,
          note_content: data.content,
          note_book_id: id
        }
      })
      isShow.value = !isShow.value
      useStore.getNoteList()
      console.log(res)
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
        title: '筆記已更新！'
      })
    } else {
      isShow.value = !isShow.value
      isEdit.value = !isEdit.value
    }
  }
  data.title = ''
  data.content = ''
}

onMounted(() => {
  watchEffect(() => {
    noteLists.value = useStore.noteList
    bookList.value = useStore.BookList
    bookReadPage()
  })
})
</script>

<style lang="scss" scoped>
.white {
  background-color: white;
}

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
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    a {
      list-style: none;
      text-decoration: none;
    }
    div {
      display: flex;
      align-items: center;
    }
    p {
      font-size: 24px;
      color: black;
    }
    ul {
      display: flex;
      list-style: none;
      width: 256px;
      border-radius: 4px;
      border: 1px solid #f75c5c;
      li:first-child {
      }
      li {
        text-align: center;
        line-height: 40px;
        width: 128px;
      }
    }
  }
  > div:nth-child(3) {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
}
.seleted-btn {
  text-align: center;
  line-height: 40px;
  width: 128px;
  border-radius: 4px;
  border: 1px solid #f75c5c;
  color: white;
  background-color: #f75c5c;
}

.notebook-title {
  justify-content: space-between;
  font-size: 20px;
  display: flex;
  height: 43px;
  width: 100%;
  align-items: center;
  ul:first-child {
    pointer-events: none;
    li {
      color: #9a9a9a;
    }
  }
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
  .no-icon {
    pointer-events: none;
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
  height: 150px;
  background-color: white;
  position: absolute;
  top: 312px;
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
    background: #e6e6e6;
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
    height: 100px;
    resize: none;
    padding: auto;
    text-align: center;
  }
  .text-area {
    height: 307px;
    text-align: left;
  }
  form {
    img {
      width: 143px;
      height: 207px;
    }
    margin-top: 20px;
    div:last-child {
      display: flex;
      justify-content: space-around;
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      align-items: center;
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
  .btn {
    background-color: #e1e1e1;
    color: white;
    border: none;
    pointer-events: none;
  }
}

.menu li {
  cursor: pointer;
}
.timers {
  height: 280px;
  display: block;
  text-align: center;
  width: 270px;
  background-color: #ffffff;
  position: absolute;
  top: -270px;
  img {
    margin-top: 10px;
  }
  div {
    display: flex;
    gap: 15px;
    justify-content: center;
  }
  button {
    cursor: pointer;
    color: black;
    width: 40%;
    height: 48px;
    outline: none;
    border-radius: 4px;
    background-color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
  }
  button:last-child {
    background-color: black;
    color: #ffffff;
  }
}

.timer {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  width: 270px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  justify-content: space-around;
  box-shadow: 0px 12px 32px 0px #00000012;
  border-radius: 8px;
  cursor: grab;
  padding: 0px 10px;
  p {
    font-weight: 700;
    font-size: 26px;
  }
  p:last-child {
    margin-top: 5px;
    color: #454545;
  }
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
  background: #fbfbfb;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
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
