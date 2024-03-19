<template>
  <div class="navbar">
    <h2 class="title">HELP U FOCUS</h2>
    <div>
      <ul class="menu">
        <li>閱讀總覽</li>
        <li>我的植物</li>
        <li>排名</li>
        <li>社群</li>
      </ul>
    </div>
    <div>登入</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  height: 64px;
  padding: 0px 80px;
  //   margin: 0 80px;
  align-items: center;
}

.menu {
  display: flex;
  list-style: none;
  li {
    margin-right: 24px;
  }
}
</style>
