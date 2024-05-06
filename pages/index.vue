<template>
  <div class="body">
    <div :class="{ logins: useStore.userInfo.username }" class="login-page">
      <div class="page-info">
        <div class="page-info-container">
          <div v-if="page == '0'">
            <p>Welcome Back ,Buddy 👋</p>
            <img src="../public/graphic1.svg" alt="" />
          </div>
          <div v-else>
            <img src="../public/graphic2.svg" alt="" />
            <p>社群功能讓你輕鬆分享＆結交朋友</p>
          </div>
          <ul>
            <li :class="{ progress: page == '0' }"></li>
            <li :class="{ progress: page == '1' }"></li>
            <li :class="{ progress: page == '2' }"></li>
            <li :class="{ progress: page == '3' }"></li>
          </ul>
          <button @click="page += 1 && page < 3">Next</button>
        </div>
      </div>

      <div v-show="!useStore.userInfo.username">
        <div v-if="isLogin" class="login">
          <div class="login-container">
            <h1>Sign In</h1>
            <form @submit.prevent="useStore.login()">
              <div class="form-group">
                賬號
                <input
                  id="username"
                  v-model="useStore.username"
                  type="text"
                  name="username"
                  placeholder="輸入您的賬號"
                  required
                />
              </div>
              <div class="form-group">
                密碼
                <input
                  id="password"
                  v-model="useStore.password"
                  type="password"
                  name="password"
                  placeholder="輸入您的密碼"
                  required
                />
              </div>
              <p class="errormsg">{{ useStore.loginError }}</p>
              <button type="submit">登入</button>
              <p><a href="#">忘記密碼？/ 密碼</a></p>
              <p>還沒有帳號嗎？ 😢<a href="#" @click="toggleLogin"> 立即註冊吧</a></p>
            </form>
          </div>
        </div>
        <div v-else class="login">
          <div class="login-container">
            <h1>Sign Up</h1>
            <form @submit.prevent="useStore.signUp()">
              <div class="form-group">
                賬號
                <input
                  id="username"
                  v-model="useStore.username"
                  type="text"
                  name="username"
                  placeholder="輸入您的賬號"
                  required
                />
              </div>
              <div class="form-group">
                密碼
                <input
                  id="password"
                  v-model="useStore.password"
                  type="password"
                  name="password"
                  placeholder="輸入您的密碼"
                  required
                />
              </div>
              <p class="errormsg">{{ useStore.loginError.statusMessage }}</p>
              <button type="submit">注冊</button>
              <p>我已經有賬號咯？ 😢<a href="#" @click="toggleLogin()"> 立即登入吧</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isLogin = ref(true)
const page = ref(0)
const useStore = usedefineStore()
const test = () => {
  console.log(useStore.userInfo)
}
const user = ref('')
const toggleLogin = () => {
  isLogin.value = !isLogin.value
}

onMounted(() => {
  watchEffect(() => {
    if (useStore.userInfo) {
      user.value = useStore.userInfo
    }
  })
})
</script>

<style lang="scss" scoped>
body .logins {
  display: block;
  height: 95vh;
  grid-template-columns: 1fr;
}
.login-page {
  margin-top: 64px;
  width: 100%;
  height: 95vh;
  display: grid;
  grid-template-columns: 55% 45%;
  background-color: #fbfbfb;
}
.page-info {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .page-info-container {
    width: 485px;
    height: 459px;
    text-align: center;
    > div:first-child,
    > div:nth-child(2) {
      width: 483px;
      height: 270px;
    }
    img:nth-child(2) {
      margin-top: 33px;
      width: 317px;
      height: 191px;
    }
    p:first-child {
      font-size: 39px;
      color: color;
      font-weight: 700;
    }
    p:nth-child(2) {
      font-size: 32px;
      color: black;
      font-weight: 700;
      margin-top: 33px;
    }
    ul {
      width: 74px;
      height: 14px;
      display: flex;
      justify-content: space-between;
      margin: auto;
      margin-top: 33px;
      align-items: center;
    }
    .progress {
      width: 14px;
      height: 14px;
      background-color: #00b232;
      transition: 0.01s ease;
    }

    li {
      list-style: none;
      border-radius: 50%;
      width: 8px; /* 設定寬度 */
      height: 8px;
      display: inline-block;
      background-color: #e8e8e8;
    }
    button {
      background-color: #00b232;
      border: none;
      font-size: 24px;
      font-weight: 400;
      width: 183px;
      height: 53px;
      border-radius: 60px;
      margin-top: 33px;
    }
  }
}

.login {
  background-color: white;
  padding: auto;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  h1 {
    font-size: 40px;
    font-weight: 700;
  }
  form a:last-child {
    color: blue;
  }
}
.login-container {
  width: 382px;
  height: auto;
  a,
  p {
    color: black;
    text-align: center;
    list-style: none;
    text-decoration: none;
  }
}
.form-group {
  color: black;
}
form {
  margin-top: 34px;
  width: 100%;
  height: 100%;

  div {
    margin-bottom: 14px;
  }
}

form .errormsg {
  color: red;
  height: 48px;
  display: inline-block;
}
input {
  margin-top: 12px;
  border: none;
  background-color: #f5f5f5;
  height: 60px;
  width: 100%;
  padding: 0px 67px;
}
button {
  display: block;
  border-radius: 8px;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  background-color: #ff8a00;
  color: white;
  margin-bottom: 14px;
  border: none;
}
</style>
