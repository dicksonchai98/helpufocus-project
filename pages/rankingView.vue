<template>
  <div class="body">
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
          <p>還剩下{{ bookList.length - bookFinished }}本書</p>
        </div>
      </div>
      <div class="book-img"><img src="../public/graphic3.svg" alt="" /></div>
    </div>
    <div class="notebook-container">
      <div class="notebook-title">
        <ul>
          <li :class="{ 'ranking-global': page === 'allUser' }" @click="page = 'allUser'">
            全球排名
          </li>
          <li
            :class="{ 'ranking-global': page === 'followingUser' }"
            @click="page = 'followingUser'"
          >
            觀察名單
          </li>
        </ul>
        <p>已完成</p>
      </div>
      <div v-if="page === 'allUser'" class="ranking-container">
        <div v-for="(rank, index) in allUserRank" :key="rank.user_id">
          <div
            class="ranking-content"
            :class="{ user: rank.user_id === useStore.userInfo.user_id }"
          >
            <p>{{ index + 1 }}</p>
            <div class="profile">
              <NuxtImg src="/man.png" class="user-profile" alt="" />
              <h2>{{ rank.username }}</h2>
              <div class="tick" @click="useStore.FollowUser(rank.user_id)">
                <Icon
                  v-if="!useStore.followingUsers(rank.user_id)"
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
            </div>
            <div class="progress-container">
              <div class="progress">
                <div
                  :style="{
                    width:
                      rank.books_total !== 0
                        ? (rank.books_finished / rank.books_total) * 100 + '%'
                        : '0%'
                  }"
                  class="progress__fill"
                ></div>

                <span class="progress__text"></span>
              </div>
            </div>
            <div>
              <p>{{ rank.books_finished + '/' + rank.books_total }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="ranking-container">
        <div v-for="(rank, index) in userRank" :key="rank.user_id">
          <div
            class="ranking-content"
            :class="{ user: rank.user_id === useStore.userInfo.user_id }"
          >
            <p>{{ index + 1 }}</p>
            <div class="profile">
              <NuxtImg src="/man.png" class="user-profile" alt="" />
              <h2>{{ rank.username }}</h2>
              <div class="tick" @click="useStore.FollowUser(rank.user_id)">
                <Icon
                  icon="teenyicons:tick-circle-solid"
                  width="25"
                  height="25"
                  style="color: green"
                />
              </div>
            </div>
            <div class="progress-container">
              <div class="progress">
                <div
                  :style="{
                    width:
                      rank.books_total !== 0
                        ? (rank.books_finished / rank.books_total) * 100 + '%'
                        : '0%'
                  }"
                  class="progress__fill"
                ></div>

                <span class="progress__text"></span>
              </div>
            </div>
            <div>
              <p>{{ rank.books_finished + '/' + rank.books_total }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
definePageMeta({
  middleware: 'auth'
})
const page = ref('allUser')
const useStore = usedefineStore()
const allUserRank = ref([])
const userRank = ref([])
const bookList = ref([])
// 完成書單數量
const bookFinished = computed(() => {
  let completeBook = 0
  bookList.value.forEach((book) => {
    if (book.book_read_page / book.book_total_page === 1) completeBook++
  })
  return completeBook
})
// 完成書單百分比
const percentage = computed(() => {
  const percentages = ((bookFinished.value / bookList.value.length) * 100).toFixed(0)
  return !isNaN(percentages) ? percentages : 0
})
onMounted(() => {
  watchEffect(async () => {
    if (useStore.userInfo.username) {
      await useStore.getAllRank()
      allUserRank.value = useStore.allUserRank
      await useStore.getRank()
      userRank.value = useStore.userRank
      bookList.value = useStore.BookList
    }
  })
})
watch(
  () => useStore.userRank,
  () => {
    userRank.value = useStore.userRank
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.body {
  width: 77%;
  margin: auto;
}

.notebook-container {
  width: 100%;
  height: auto;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  z-index: 0;
  background-color: white;
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
  p {
    margin-right: 55px;
    color: #00a52e;
  }
  .icon {
    cursor: pointer;
  }
}
.user-profile {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  margin-right: 10px;
}
.profile .tick {
  position: absolute;
  margin-top: 33px;
  margin-left: 25px;
}
.profile {
  display: flex;
  align-items: center;
  width: 230px;
}

.notebook-title ul li:hover {
  border-bottom: 4px solid orange;
}

.ranking-global {
  border-bottom: 4px solid orange;
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
  z-index: 1;
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
.ranking-container {
  width: 100%;
}
.ranking-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  justify-content: space-around;
  margin-bottom: 10px;
  padding: 20px 36px 20px 36px;
  margin-top: 10px;
  .progress__fill {
    background: #ff7512;
  }
  .progress {
    background-color: #f4ecec;
  }
}
.user {
  background-color: #ffe7d7;
  padding: 20px 36px 20px 36px;
  border-radius: 8px;
}
</style>
