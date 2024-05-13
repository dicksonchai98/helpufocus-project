<template>
  <div class="navbar">
    <div>
      <ul class="menu">
        <li>
          <NuxtLink to="/"><h2 class="title">HELP U FOCUS</h2> </NuxtLink>
        </li>
        <li><NuxtLink to="/reading">閱讀總覽</NuxtLink></li>
        <li><NuxtLink to="/rankingView">排名</NuxtLink></li>
        <li><NuxtLink to="/threadsView">社群</NuxtLink></li>
      </ul>
    </div>
    <div class="user">
      <span class="user-profile"
        ><Icon icon="iconamoon:profile-fill" width="23" height="23" style="color: grey"
      /></span>
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
</template>

<script setup>
import { Icon } from '@iconify/vue'
const useStore = usedefineStore()
const test = () => {
  console.log(useStore.isLogin)
}
console.log(useStore.isLogin)
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  position: fixed;

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
  border: 1px solid white;
  background-color: white;
  margin-right: 10px;
  line-height: 38px;
  padding: 0 2px;
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
    width: 168px;
    height: 142px;
    background-color: #00a52e;
    padding: 16px, 20px, 16px, 20px;
    border-radius: 8px;
    position: absolute;
    top: 60px;
    right: 85px;
    display: none;
    justify-content: center;
    align-items: center;

    ul {
      text-decoration: none;
      list-style: none;
      li {
        height: 53px;
        font-size: 24px;
        text-align: center;
        line-height: 53px;
      }
    }
  }
}

.user:hover .setting {
  display: flex;
}
</style>
