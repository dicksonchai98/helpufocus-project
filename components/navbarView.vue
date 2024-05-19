<template>
  <div class="navbar">
    <div>
      <ul class="menu">
        <li>
          <NuxtLink to="/"><h2 class="title">HELP U FOCUS</h2> </NuxtLink>
        </li>
        <li>
          <NuxtLink no-prefetch to="/reading" @click="submitLoading">閱讀總覽</NuxtLink>
        </li>
        <li>
          <NuxtLink no-prefetch to="/rankingView" @click="submitLoading">排名</NuxtLink>
        </li>
        <li>
          <NuxtLink no-prefetch to="/threadsView" @click="submitLoading">社群</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="user">
      <img class="user-profile" src="/man.png" alt="" />
      <p>{{ useStore.userInfo.username }}</p>
      <div v-show="useStore.isLogin" class="setting">
        <ul>
          <li>
            <NuxtLink to="/changePasswordView"> 修改賬密 </NuxtLink>
          </li>
          <li @click.prevent="useStore.logOut()"><a href="">登出</a></li>
        </ul>
      </div>
    </div>
  </div>
  <loading :active="isLoading" :can-cancel="true" :is-full-page="true" />
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const useStore = usedefineStore()

const isLoading = ref(false)

const submitLoading = () => {
  isLoading.value = true
  // simulate AJAX
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  position: fixed;
  z-index: 2;
  justify-content: space-between;
  width: 100%;
  background-color: #00b432;
  height: 64px;
  padding: 0px 129px;
  //   margin: 0 80px;
  align-items: center;
  a {
    text-decoration: none;
    color: white;
  }
}

.menu {
  display: flex;
  gap: 60px;
  align-items: center;
  list-style: none;
  li {
    height: 64px;
    line-height: 64px;
  }

  a {
    text-decoration: none;
  }
}
.menu li:nth-child(n + 2):nth-last-child(-n + 5):hover {
  border-bottom: 5px solid white;
}

.user-profile {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  margin-right: 10px;
}
.user {
  display: flex;
  align-items: center;
  width: 94px;
  height: 64px;
  p {
    color: white;
  }
  .setting {
    width: 120px;
    height: 100px;
    background-color: #00a52e;
    padding: 16px 20px 16px 20px;
    border-radius: 8px;
    position: absolute;
    top: 60px;
    display: none;
    justify-content: center;
    align-items: center;

    ul {
      text-decoration: none;
      list-style: none;
      li {
        text-align: center;
        line-height: 35px;
      }
    }
  }
}

.user:hover .setting {
  display: flex;
}
</style>
