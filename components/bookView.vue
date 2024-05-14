<template>
  <div class="note-container">
    <div class="img-container"><img src="../assets/scss/1401684.png" alt="" /></div>
    <div>
      <h2 class="note-title">{{ note.book_name }}</h2>
      <div class="note-content">
        <p></p>
      </div>
      <div class="progress-container">
        <div class="progress">
          <div
            :style="{
              width: ((note.book_read_page / note.book_total_page) * 100).toFixed(0) + '%'
            }"
            class="progress__fill"
          ></div>
        </div>
        <p>{{ note.book_read_page }} / {{ note.book_total_page }}</p>
      </div>
    </div>
    <div>
      <nuxt-link :to="`/reading/${note.book_id}`">
        <p>共{{ notes.length }}本筆記</p>
        <Icon icon="mingcute:right-fill" width="20" height="20" style="color: #ff7512" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const useStore = usedefineStore()

const props = defineProps(['note'])
const id = props.note.book_id
const { notes } = await $fetch(`/api/books/${id}`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${useStore.userInfo.access_token}`
  }
})
console.log(notes)
</script>

<style lang="scss" scoped>
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
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
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
  .progress__fill {
    width: 10%;
    height: 100%;
    background: #00a52e;
    transition: all 0.2s;
    border-radius: 32px;
  }
}
</style>
