<template>
  <div class="body">
    <div v-show="isShow" class="popup-box">
      <div class="popup">
        <div class="popup-title">
          <div @click="toggleShow">
            <Icon icon="mingcute:left-fill" width="25" height="25" style="color: black" />
            <p>選擇上傳筆記🏃🏻‍♀️</p>
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
            v-for="notes in noteLists"
            v-show="filters === 'all'"
            :key="notes.note_id"
            class="notebook-list"
          >
            <NoteListView :edit-note="editNote" :notes="notes" />
          </div>
          <div
            v-for="notes in flavoredNote"
            v-show="filters === 'flavored'"
            :key="notes.note_id"
            class="notebook-list"
          >
            <NoteListView :edit-note="editNote" :notes="notes" />
          </div>
        </div>
      </div>
    </div>
    <div class="social-container">
      <div class="post-container">
        <div v-for="(datas, index) in posts" :key="index" class="post">
          <div class="profile">
            <div>
              <img class="user-profile" src="../assets/scss/man.png" alt="" />
              <div class="tick" @click="useStore.FollowUser(datas.post_user_id)">
                <Icon
                  v-if="!useStore.followingUsers(datas.post_user_id)"
                  icon="teenyicons:plus-circle-solid"
                  width="25"
                  height="25"
                  style="color: green"
                />
                <Icon
                  v-else
                  icon="teenyicons:tick-circle-solid"
                  width="25"
                  height="25"
                  style="color: green"
                />
              </div>
              <h2>{{ datas.post_username }}</h2>
            </div>
            <div class="icons">
              <Icon
                v-show="datas.post_user_id === useStore.userInfo.user_id"
                class="icon"
                icon="tabler:dots"
                width="20"
                height="20"
                style="color: black"
              />
              <ul class="delete-note" @click="deleteNote(datas.post_id)">
                <li>
                  <Icon
                    icon="material-symbols:delete"
                    width="20"
                    height="20"
                    style="color: orange"
                  />
                  <h3>刪除</h3>
                </li>
              </ul>
            </div>
          </div>
          <div class="content">
            <p class="post-title">{{ datas.post_title }}</p>
            <p>
              {{ datas.post_content }}
            </p>
          </div>
          <div class="post-liked">
            <div>
              <div>
                <Icon
                  v-if="datas.post_likable"
                  icon="mdi:heart-outline"
                  width="24"
                  height="24"
                  style="color: grey"
                  @click="likePost(index, datas.post_id, datas.post_likable)"
                />
                <Icon
                  v-else
                  icon="mdi:heart"
                  width="24"
                  height="24"
                  style="color: red"
                  @click="likePost(index, datas.post_id, datas.post_likable)"
                />
              </div>
              <Icon
                v-if="!isFavored(datas.post_id)"
                icon="mdi:star-outline"
                width="24"
                height="24"
                style="color: #8d8d8d"
                @click="favorPost(datas.post_id)"
              />
              <Icon
                v-else
                icon="mdi:star"
                width="24"
                height="24"
                style="color: #ffd84f"
                @click="favorPost(datas.post_id)"
              />
            </div>
            <p v-if="!datas.isLike">{{ datas.post_likes }}次讚</p>
            <p v-else>
              <Icon icon="line-md:loading-alt-loop" width="24" height="24" style="color: black" />
            </p>
          </div>
        </div>
      </div>
      <div class="favour">
        <div class="post-status" :class="{ flex: isFocus }">
          <div>
            <input
              v-model="postTitle"
              placeholder="今天想分享什麽？"
              :class="{ 'write-note': isFocus }"
              @focus="toggleFocus"
            />
            <textarea v-show="isFocus" v-model="post" placeholder="寫點什麽吧！"></textarea>
            <div v-show="isFocus" class="btn">
              <button @click.prevent="toggleCancel">取消</button>
              <button
                :class="{ 'add-btn': postTitle == '' || post == '' }"
                @click.prevent="addPost"
              >
                新增
              </button>
            </div>
          </div>
          <div v-show="!isFocus" @click="toggleShow">
            <Icon icon="ph:note-pencil" width="20" height="20" style="color: orange" />
            <p>我的筆記</p>
          </div>
        </div>
        <div class="favor-container">
          <div v-for="datas in favorPosts" :key="datas.index" class="favour-content-container">
            <div class="favour-content">
              <div class="content">
                <p class="post-title">{{ datas.post_title }}</p>
                <p>
                  {{ datas.post_content }}
                </p>
              </div>
              <Icon
                icon="mdi:star"
                width="24"
                height="24"
                style="color: #ffd84f"
                @click="favorPost(datas.post_id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import NoteListView from '../components/noteListView.vue'
const useStore = usedefineStore()
definePageMeta({
  middleware: 'auth'
})

// 喜愛筆記
const flavoredNote = computed(() => {
  return noteLists.value.filter((note) => note.note_like === 1)
})
// 取得筆記内容及編輯
const isShow = ref(false)
const posts = ref([])
const postTitle = ref('')
const post = ref('')
const isFocus = ref(false)
const toggleShow = () => {
  isShow.value = !isShow.value
}
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
const editNote = async (id) => {
  const res = await getNoteContent(id)
  isFocus.value = !isFocus.value
  toggleShow()
  postTitle.value = res.note_title
  post.value = res.note_content
}
const toggleFocus = () => {
  if (isFocus.value === false) {
    isFocus.value = !isFocus.value
    console.log(isFocus.value)
  }
}
const toggleCancel = () => {
  isFocus.value = !isFocus.value
  postTitle.value = ''
  post.value = ''
}

const filters = ref('all')
const noteLists = ref([])

onMounted(() => {
  watchEffect(() => {
    posts.value = useStore.allPosts
    noteLists.value = useStore.noteList
    getFavorPost()
  })
})

// 點贊貼文
const likePost = async (index, id, postLikable) => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
    console.log('refresh')
  }
  const computePostLike = () => {
    if (postLikable) {
      return 1
    } else {
      return -1
    }
  }
  const postLike = computePostLike()
  posts.value[index].isLike = true
  const res = await $fetch(`/api/posts/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    },
    body: {
      post_likes: postLike
    }
  })
  await useStore.getAllPost()
  posts.value[index].isLike = false
}
// 選擇喜愛文章
const favorPost = async (id) => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
    console.log('refresh')
  }

  const res = await $fetch('/api/collections', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    },
    body: {
      collection_post_id: id,
      collection_or_not: isFavored(id) ? 0 : 1
    }
  })
  getFavorPost()
}
// 取得喜愛貼文
const favorPosts = ref([])
const getFavorPost = async () => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await refreshApi(refreshToken)
  }
  const res = await $fetch('/api/collections', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    }
  })
  console.log(res.collection_posts)
  favorPosts.value = res.collection_posts
}
const isFavored = (id) => {
  return favorPosts.value.some((post) => post.post_id === id)
}
// 刪除文章
const deleteNote = async (id) => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
  }
  const res = await $fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    }
  })
  useStore.getAllPost()
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
    title: '已刪除成！'
  })
}
// 上傳文章
const addPost = async () => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
  }
  if (post.content !== '') {
    const res = await $fetch('/api/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useStore.userInfo.access_token}`
      },
      body: {
        post_title: postTitle.value,
        post_content: post.value
      }
    })
    isFocus.value = !isFocus.value
    useStore.getAllPost()
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
      title: '貼文上傳成功！'
    })
  }
  postTitle.value = ''
  post.value = ''
}
</script>

<style lang="scss" scoped>
.popup-box {
  position: fixed;
  top: 0;
  right: -50;
  height: 100%;
  width: 100%;
  display: flex;
  transition: all 0.3s ease;
  z-index: 100;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #d9d9d9c7;
}

.popup {
  width: 85%;
  height: 90%;
  background-color: #fbfbfb;
  padding: 20px;
  border-radius: 4px;
  transition: all 0.3s ease;
  box-shadow: 0px 12px 32px 0px #00000012;
  margin: auto;
  color: #5c5c5c;
  overflow: hidden;
  overflow-y: scroll;
}
.popup::-webkit-scrollbar {
  display: none;
}
.popup-title {
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 10px;
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
.seleted-btn {
  text-align: center;
  line-height: 40px;
  width: 128px;
  border-radius: 4px;
  border: 1px solid #f75c5c;
  color: white;
  background-color: #f75c5c;
}

.user-profile {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.profile .tick {
  position: relative;
  top: 18px;
  left: -15px;
}
.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  div:first-child {
    display: flex;
    align-items: center;
  }
}
.icons:hover .delete-note {
  display: flex;
}

.icon {
  cursor: pointer;
  position: relative;
}

.delete-note {
  position: absolute;
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

.body {
  background-color: #fbfbfb;
}
.social-container {
  padding-top: 48px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
  width: 80%;
  margin: 60px auto 0px;
}

.content {
  width: 80%;
}
.post-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}
p {
  font-size: 12px;
}
.post-liked {
  display: flex;
  justify-content: space-between;
  > div {
    width: 68px;
    display: flex;
    justify-content: space-between;
  }
}
.post-container {
  overflow-y: scroll;
  height: 100vh;
}
.post-container::-webkit-scrollbar {
  display: none;
}
.post {
  row-gap: 24px;
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
}
.favour .flex {
  display: block;
}
.post-status {
  display: flex;
  align-items: center;
  width: 457px;
  background-color: white;
  padding: 16px 20px;
  .btn {
    display: flex;
    justify-content: space-between;
    .add-btn {
      background-color: #e1e1e1;
      color: white;
      border: none;
      pointer-events: none;
    }
  }

  button {
    cursor: pointer;
    color: #5c5c5c;
    width: 188px;
    height: 48px;
    border: 1px solid #bfbfbf;
    outline: none;
    border-radius: 4px;
    background-color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    margin-top: 80px;
  }
  button:last-child {
    background-color: black;
    color: white;
  }
  textarea {
    width: 100%;
    height: 300px;
    border: none;
    resize: none;
    outline: none;
    padding: 11px 20px;
  }
  > div:last-child {
    height: 32px;
    border: 1px solid #ff7512;
    font-size: 14px;
    padding: 4px 12px;
    line-height: 32px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 20px;
    cursor: pointer;

    p {
      color: #ff7512;
    }
  }
}
.write-note {
  width: 100%;
  margin-bottom: 15px;
  outline: none;
  background-color: white;
  font-size: 14px;
  font-weight: 700;
}
input {
  width: 283px;
  height: 38px;
  background-color: #f7f7f7;
  border: none;
  padding: 11px 20px;
}
.favour-content-container {
  margin-top: 24px;
}
.favor-container {
  overflow-y: scroll;
  height: 100vh;
}
.favor-container::-webkit-scrollbar {
  display: none;
}
.favour-content {
  width: 459px;
  height: auto;
  padding: 16px;
  background-color: white;
  display: flex;
  justify-content: space-between;

  p {
    width: 367px;
  }
}
</style>
