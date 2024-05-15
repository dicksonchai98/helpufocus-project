<template>
  <div>
    <div class="note-container">
      <div>
        <p>{{ notes.note_updated_time }}</p>
        <h2 class="note-title">{{ notes.note_title }}</h2>
        <div class="note-content">
          <p>{{ noted.note_content }}</p>
        </div>
      </div>
      <div>
        <div>
          <div class="icons">
            <Icon class="icon" icon="tabler:dots" width="20" height="20" style="color: black" />
            <ul class="delete-note" @click="deleteNote(id)">
              <li>
                <Icon icon="material-symbols:delete" width="20" height="20" style="color: orange" />
                <h3>刪除</h3>
              </li>
            </ul>
          </div>
          <div>
            <Icon
              v-if="notes.note_like == '1'"
              icon="mdi:heart"
              style="color: red"
              width="20"
              height="20"
              @click="likeNote(notes.note_id, notes.note_like)"
            />
            <Icon
              v-else
              icon="mdi:heart-outline"
              width="20"
              height="20"
              @click="likeNote(notes.note_id, notes.note_like)"
            />
          </div>
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
import Swal from 'sweetalert2'
const useStore = usedefineStore()
const props = defineProps(['notes', 'editNote'])
const id = props.notes.note_id
const likeNote = async (id, noteLikable) => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
  }
  const computeNoteLike = () => {
    if (noteLikable) {
      return 0
    } else {
      return 1
    }
  }
  const noteLike = computeNoteLike()
  const res = await $fetch(`/api/notes/like/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    },
    body: {
      note_like: noteLike
    }
  })
  useStore.getNoteList()
  console.log(res)
}

const noted = ref([])
const getNoted = async () => {
  const data = await $fetch(`/api/notes/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    }
  })
  noted.value = data
  return data
}

onMounted(() => {
  watchEffect(() => {
    getNoted()
  })
})

watch(
  () => useStore.noteList.value,
  () => {
    console.log('hello')
    getNoted()
  },
  { deep: true }
)

const deleteNote = async (id) => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
  }
  const res = await $fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    }
  })
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
    title: '已刪除成功！'
  })
}
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
    height: 64px;
    width: 420px;
    overflow: hidden;
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
  position: relative;
}

.icons:hover .delete-note {
  display: flex;
}

.note-container:hover .icon {
  opacity: 1;
}

.delete-note {
  position: absolute;
  right: 300px;
  margin-top: 10px;
  display: none;
  padding: 0px 10px;
  cursor: pointer;
  li {
    display: flex;
    width: 80px;
    height: 40px;
    background-color: #f5f5f5;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
