<template>
  <div class="body">
    <div class="social-container">
      <div class="post-container">
        <div v-for="datas in posts" :key="datas.index" class="post">
          <div class="profile">
            <span class="user-profile"></span>
            <div class="tick">
              <Icon
                icon="teenyicons:tick-circle-solid"
                width="25"
                height="25"
                style="color: green"
              />
            </div>
            <h2>namedwdwd</h2>
          </div>
          <div class="content">
            <p class="post-title">nihao</p>
            <p>
              {{ datas.post_content }}
            </p>
          </div>
          <div class="post-liked">
            <div>
              <Icon icon="mdi:heart" width="24" height="24" style="color: red" /><Icon
                icon="material-symbols:star"
                width="24"
                height="24"
                style="color: #ffd84f"
              />
            </div>
            <p>10次讚</p>
          </div>
        </div>
      </div>
      <div class="favour">
        <div class="post-status" :class="{ flex: isFocus }">
          <div>
            <input
              placeholder="今天想分享什麽？"
              :class="{ 'write-note': isFocus }"
              @focus="toggleFocus"
            />
            <textarea v-show="isFocus" v-model="post" placeholder="寫點什麽吧！"></textarea>
            <div v-show="isFocus" class="btn">
              <button @click.prevent="toggleCancel">取消</button>
              <button @click.prevent="addPost">新增</button>
            </div>
          </div>
          <div v-show="!isFocus">
            <Icon icon="ph:note-pencil" width="20" height="20" style="color: orange" />
            <p>我的筆記</p>
          </div>
        </div>
        <div class="favor-container">
          <div v-for="datas in data" :key="datas.index" class="favour-content-container">
            <div class="favour-content">
              <div class="content">
                <p class="post-title">{{ datas.title }}</p>
                <p>
                  {{ datas.content }}
                </p>
              </div>
              <Icon icon="material-symbols:star" width="24" height="24" style="color: #ffd84f" />
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

const toggleFocus = () => {
  if (isFocus.value === false) {
    isFocus.value = !isFocus.value
    console.log(isFocus.value)
  }
}
const toggleCancel = () => {
  isFocus.value = !isFocus.value
}

const posts = ref([])
const post = ref('')
const isFocus = ref(false)
const data = ref([
  {
    name: 'chai',
    title: 'this is title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem faceremaxime fugiat expedita, cumque sapiente quo tempora itaque nemo dolore ex culpamaiores necessitatibus veritatis aperiam est quod voluptates?'
  },
  {
    name: 'chai',
    title: 'this is title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem faceremaxime fugiat expedita, cumque sapiente quo tempora itaque nemo dolore ex culpamaiores necessitatibus veritatis aperiam est quod voluptates?'
  },
  {
    name: 'chai',
    title: 'this is title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem faceremaxime fugiat expedita, cumque sapiente quo tempora itaque nemo dolore ex culpamaiores necessitatibus veritatis aperiam est quod voluptates?'
  },
  {
    name: 'chai',
    title: 'this is title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem faceremaxime fugiat expedita, cumque sapiente quo tempora itaque nemo dolore ex culpamaiores necessitatibus veritatis aperiam est quod voluptates?'
  },
  {
    name: 'chai',
    title: 'this is title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem faceremaxime fugiat expedita, cumque sapiente quo tempora itaque nemo dolore ex culpamaiores necessitatibus veritatis aperiam est quod voluptates?'
  },
  {
    name: 'chai',
    title: 'this is title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem faceremaxime fugiat expedita, cumque sapiente quo tempora itaque nemo dolore ex culpamaiores necessitatibus veritatis aperiam est quod voluptates?'
  },
  {
    name: 'chai',
    title: 'this is title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, autem faceremaxime fugiat expedita, cumque sapiente quo tempora itaque nemo dolore ex culpamaiores necessitatibus veritatis aperiam est quod voluptates?'
  }
])

onMounted(() => {
  watchEffect(() => {
    posts.value = useStore.allPosts
  })
})

const addPost = async () => {
  if (post.content !== '') {
    const res = await $fetch('/api/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useStore.userInfo.access_token}`
      },
      body: {
        post_content: post.value
      }
    })
    isFocus.value = !isFocus.value
    useStore.getAllPost()
    console.log(res)
  }
  post.content = ''
}
</script>

<style lang="scss" scoped>
.user-profile {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: black;
  margin-right: 10px;
}
.profile .tick {
  position: relative;
  top: 18px;
  left: -25px;
}
.profile {
  display: flex;
  align-items: center;
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
