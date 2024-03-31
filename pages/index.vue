<template>
  <div class="body">
    <div class="cover-image">
      <div class="login-container">
        <form>
          <div class="form-group">
            <input id="username" type="text" name="username" placeholder="輸入您的賬號" required />
          </div>
          <div class="form-group">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="輸入您的密碼"
              required
            />
          </div>
          <button type="submit">登入</button>
          <a href="#">忘記密碼？</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const useStore = usedefineStore()
</script>

<style lang="scss" scoped>
.cover-image {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  width: 270px;

  height: 298px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 陰影效果：水平偏移量、垂直偏移量、模糊程度、顏色 */
  border-radius: 12px;
}
form {
  margin-top: 34px;
  width: 100%;
  height: 100%;
  text-align: center;
  div {
    margin-bottom: 14px;
  }
}
input {
  border: none;
  border-bottom: 1px dashed black;
  height: 50px;
  width: 220px;
  padding: 0px 67px;
}
button {
  display: block;
  border-radius: 100px;
  width: 140px;
  height: 44px;
  margin: 0 auto;
  background-color: #393e41;
  color: white;
  margin-bottom: 14px;
}
</style>
