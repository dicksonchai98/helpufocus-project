<template>
  <div class="navbar">
    <h2 class="title"><NuxtLink to="/">HELP U FOCUS</NuxtLink></h2>
    <div>
      <ul class="menu">
        <li><NuxtLink to="/readingView">閱讀總覽</NuxtLink></li>
        <li><NuxtLink to="/myPlantView">我的植物</NuxtLink></li>
        <li><NuxtLink to="/rankingView">排名</NuxtLink></li>
        <li><NuxtLink to="/threadsView">社群</NuxtLink></li>
      </ul>
    </div>
    <div>登入</div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  height: 64px;
  padding: 0px 80px;
  //   margin: 0 80px;
  align-items: center;
  a {
    text-decoration: none;
  }
}

.menu {
  display: flex;
  list-style: none;
  li {
    margin-right: 24px;
    a {
      text-decoration: none;
    }
  }
}
</style>
