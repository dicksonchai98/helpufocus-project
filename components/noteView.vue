<template>
  <div>
    <div class="note-container">
      <div>
        <p>{{ notes.note_updated_time }}</p>
        <h2 class="note-title">{{ notes.note_title }}</h2>
        <div class="note-content">
          <p>{{ note_content }}</p>
        </div>
      </div>
      <div>
        <div @click="toggleFavour(index)">
          <Icon class="icon" icon="tabler:dots" width="20" height="20" style="color: black" />
          <Icon icon="twemoji:red-heart" width="20" height="20" />
        </div>
        <div @click="editNote(notes.note_id)">
          <Icon icon="ph:note-pencil" width="20" height="20" style="color: white" />
          <p>編輯</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const useStore = usedefineStore()

const props = defineProps(['notes', 'editNote'])
const id = props.notes.note_id

const { note_content } = await $fetch(`/api/notes/${id}`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${useStore.userInfo.access_token}`
  }
})
</script>

<style lang="scss" scoped>
.note-container {
  width: 100%;
  height: 194px;
  background-color: white;
  display: grid;
  grid-template-columns: 8fr 2fr;
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
  div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2 {
      font-weight: 700;
      color: #306cc8;
    }
    p {
      font-size: 12px;
      color: #585858;
    }
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    > div:first-child {
      display: flex;
      flex-direction: row;
      width: 80px;
    }
    > div:nth-child(2) {
      display: flex;
      width: 188px;
      height: 48px;
      cursor: pointer;
      border-radius: 4px;
      background-color: #ff7512;
      justify-content: center;
      align-items: center;
      color: white;
      gap: 10px;
    }
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

.icon {
  opacity: 0;
  transition: 0.3s ease;
  cursor: pointer;
}

.note-container:hover .icon {
  opacity: 1;
}
</style>
