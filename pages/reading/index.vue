<template>
  <div class="body">
    <div class="container">
      <div v-show="isShow" class="popup-box">
        <div class="popup">
          <div class="content">
            <form action="#">
              <h2>新增書單</h2>

              <label id="dropcontainer" for="file" class="drop-container">
                <Icon
                  v-if="!book.file"
                  icon="wi:cloud-up"
                  width="48"
                  height="48"
                  style="color: black"
                />
                <span v-if="!book.file" class="drop-title">Drop files to upload or browser</span>
                <input
                  id="file"
                  :class="{ file: book.file }"
                  type="file"
                  accept="image/*"
                  required
                  @change="handleFileChange"
                />
              </label>
              <div>
                <label for=""><h2>書名</h2></label>
                <input id="book_name" v-model="book.title" name="book_name" required type="text" />
              </div>
              <div>
                <label for=""><h2>頁數</h2></label>
                <input
                  id="book_total_page"
                  v-model="book.page"
                  type="number"
                  required
                  name="book_total_page"
                />
              </div>
              <div>{{ errorMsg.statusMessage }}</div>
              <div>
                <button @click.prevent="toggleShow">取消</button>
                <button
                  :class="{ btn: book.page == '' || book.title == '' || book.file == null }"
                  @click.prevent="addBooks()"
                >
                  新增
                </button>
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
            <h1>{{ percentage }}<span>%</span></h1>
          </div>
          <div class="progress-container">
            <div class="progress">
              <div :style="{ width: percentage + '%' }" class="progress__fill"></div>
              <span class="progress__text"></span>
            </div>
            <p>還剩下{{ bookLists.length - bookFinished }}本書</p>
          </div>
        </div>
        <div class="book-img"><img src="../../public/graphic3.svg" alt="" /></div>
      </div>
      <div class="notebook-container">
        <div class="notebook-title">
          <ul>
            <li
              :class="{ bookList: bookList === 'uncompletedList' }"
              @click="bookList = 'uncompletedList'"
            >
              待看書單
            </li>
            <li
              :class="{ bookList: bookList === 'completedList' }"
              @click="bookList = 'completedList'"
            >
              完成書單
            </li>
          </ul>
          <div class="add-btn">
            <Icon
              class="icon"
              icon="material-symbols:add-circle"
              style="color: #ff7512"
              width="43px"
              height="43px"
              @click="toggleShow"
            />
          </div>
        </div>
        <div>
          <Icon icon="mingcute:right-fill" width="30" height="30" style="color: #cbcbcb" />
          <p>選一本好書吧 🏃🏻‍♀️</p>
        </div>
        <div v-if="bookList === 'uncompletedList'">
          <div v-for="note in uncompletedBookList" :key="note.book_id" class="notebook-list">
            <LazyBookView :note="note" />
          </div>
        </div>
        <div v-else>
          <div v-for="note in completedBookList" :key="note.book_id" class="notebook-list">
            <LazyBookView :note="note" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import BookView from '../../components/bookView.vue'
definePageMeta({
  middleware: 'auth'
})
const useStore = usedefineStore()
// 上傳file，拖拽
const dropContainer = ref(null)
const fileInput = ref(null)
const handleDrop = (event) => {
  event.preventDefault()
  dropContainer.value.classList.remove('drag-active')
  fileInput.value.files = event.dataTransfer.files
}
const handleDragEnter = () => {
  dropContainer.value.classList.add('drag-active')
}
const handleDragLeave = () => {
  dropContainer.value.classList.remove('drag-active')
}
const fileSelected = (event) => {
  const files = event.target.files
  console.log('上传的文件：', files)
  // 这里可以编写上传文件的逻辑，比如发送给服务器等
}
const handleFileChange = (event) => {
  const file = event.target.files[0]
  book.file = file // 将文件信息保存到 formData 中的 avatar 字段
}
// 新增完成書單
const bookLists = ref([])
const isShow = ref(false)
const wrapper = ref(null)
const errorMsg = ref('')
const bookList = ref('uncompletedList')
const book = reactive({
  title: '',
  page: '',
  file: null
})
const toggleShow = () => {
  isShow.value = !isShow.value
  book.title = ''
  book.page = ''
  book.file = null
}

const addBooks = async () => {
  try {
    isShow.value = !isShow.value
    const files = new FormData()
    files.append('file', book.file ? book.file : '')
    files.append('book_name', book.title)
    files.append('book_total_page', book.page)
    const res = await $fetch('/api/books', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useStore.userInfo.access_token}`
      },
      body: files
    })
    useStore.getBookList()
    console.log(res)
    book.title = ''
    book.page = ''
    book.file = null
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
      title: '書單已更新！'
    })
    return res
  } catch (error) {
    console.log(error)
    errorMsg.value = error
    return error
  }
}
// 取出未完成書單
const uncompletedBookList = computed(() => {
  return bookLists.value.filter((n) => n.book_read_page / n.book_total_page !== 1)
})
// 取出完成書單
const completedBookList = computed(() => {
  return bookLists.value.filter((n) => n.book_read_page / n.book_total_page === 1)
})
// 去除已完成書本數量
const bookFinished = computed(() => {
  let completeBook = 0
  bookLists.value.forEach((book) => {
    if (book.book_read_page / book.book_total_page === 1) completeBook++
  })
  return completeBook
})
// 完成書單百分比
const percentage = computed(() => {
  const percentages = ((bookFinished.value / bookLists.value.length) * 100).toFixed(0)
  return !isNaN(percentages) ? percentages : 0
})

onMounted(() => {
  watchEffect(() => {
    bookLists.value = useStore.BookList
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
    height: 43px;
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

.bookList {
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
    height: 40px;
    background: #ffffff;
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
  padding: 40px;
  border-radius: 4px;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0px 12px 32px 0px #00000012;

  input {
    width: 100%;
    height: 30px;
    padding: 20px 5px;
    font-size: 17px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #a6d1b2;
  }

  form {
    div:nth-child(3) {
      margin-top: 30px;
    }
    div:last-child {
      display: flex;
      justify-content: space-around;
    }
    // .file {
    //   width: 448px;
    //   height: 173px;
    //   padding: 10px;
    //   background-color: #f0f0f0;
    //   border: 1px dashed #ccc;
    //   cursor: pointer;
    //   text-align: center;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    //   align-items: center;
    //   margin: auto;
    // }
    .drop-container {
      margin-top: 30px;
      position: relative;
      display: flex;
      gap: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 200px;
      padding: 20px;
      border-radius: 10px;
      border: 2px dashed #a6d1b2;
      color: #444;
      background-color: #f4fbf6;
      cursor: pointer;
      transition:
        background 0.2s ease-in-out,
        border 0.2s ease-in-out;
    }

    .drop-container:hover,
    .drop-container.drag-active {
      background: #eee;
    }

    .drop-container:hover .drop-title,
    .drop-container.drag-active .drop-title {
      color: #222;
    }

    .drop-title {
      color: #444;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      transition: color 0.2s ease-in-out;
    }

    input[type='file'] {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    .file[type='file'] {
      display: block;
      width: 100%;
      height: 100%;
      color: #444;
      padding: 5px;
      border: none;
      opacity: 1;
    }
    input[type='file']::file-selector-button {
      display: none;
    }
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
    margin-top: 60px;
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
