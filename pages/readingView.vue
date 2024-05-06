<template>
  <div class="body">
    <div class="progressbar-container">
      <div class="progressbar-content">
        <div class="progress">
          <div :style="{ width: progress + '%' }" class="progress__fill"></div>
          <span class="progress__text">{{ progress }}%</span>
        </div>
        <div class="book-page">
          <p>已完成3本書</p>
          <p>未完成4本書</p>
        </div>
      </div>
    </div>
    <div class="notebook-container">
      <div class="notebook-title">
        <div>帶看書單</div>
        <div>完成書單</div>
        <Icon
          class="icon"
          icon="material-symbols-light:add"
          style="color: black"
          @click="toggleShow"
        />
        <Icon
          class="icon"
          icon="material-symbols-light:add"
          style="color: black"
          @click="getBookList()"
        />
      </div>
      <div v-for="(notes, index) in post" :key="index" class="notebook-list">
        <div class="note-container">
          <div class="book-img"><img src="" alt="" /></div>
          <div class="booklist-content">
            <div>
              <h3 class="note-title">{{ notes.book_name }}</h3>
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
            <div class="note-content">
              <div>已完成{{ notes.page }}頁</div>
              <div>還剩下{{ post }}頁</div>
            </div>
            <div class="read-btn">
              <button>
                <nuxt-link :to="`/reading/${index}`">閲讀</nuxt-link>
              </button>
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

const data = ref([
  {
    title: 'rich dad poor dad',
    page: '30',
    pages: '400'
  },
  {
    title: 'rich dad poor dad',
    page: '30',
    pages: '400'
  }
])

const progress = ref(80)

let post = []

const getBookList = async () => {
  try {
    const res = await useFetch('/api/books')
    post = res.books
    console.log(res.data.book_id)
    return res.books
  } catch (error) {
    console.error('獲取書籍列表時出錯：', error)
    return null // 或者其他你想要返回的值
  }
}
</script>

<style lang="scss" scoped>
.progressbar-container {
  width: 959px;
  height: 185px;
  border-radius: 92.5px;
  background-color: #ffa15e;
  margin: auto;
  align-items: center;
  padding: 0 100px;
  color: white;
  display: flex;
  align-items: center;
}
.progressbar-content {
  width: 100%;
  > div {
    margin: 15px 0;
  }
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
  display: grid;
  grid-template-columns: 20% 80%;
  .note-content {
    display: flex;
    justify-content: space-between;
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

.booklist-content {
  line-height: 40px;
  > div:first-child {
    display: flex;
    justify-content: space-between;
  }
}

.read-btn {
  display: flex;
  justify-content: flex-end;
  button {
    background-color: #6a93f8;
    cursor: pointer;
    color: white;
    width: 50px;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 4px;
  }
}
</style>
