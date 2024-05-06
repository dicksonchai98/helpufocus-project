<template>
  <div>
    <div class="popup-box">
      <div class="popup">
        <form @submit.prevent="changePassword()">
          <h1>Change Password</h1>
          <div class="content">
            <div>
              <label for="">
                <Icon
                  icon="lets-icons:done-ring-round-fill"
                  width="16"
                  height="16"
                  style="color: #00a52e"
                />
                <p>舊密碼</p></label
              >
              <input v-model="data.current_password" required type="password" />
            </div>
            <div>
              <label for="">
                <Icon
                  icon="lets-icons:done-ring-round-fill"
                  width="16"
                  height="16"
                  style="color: #00a52e"
                />
                <p>新密碼</p></label
              >
              <input v-model="data.new_password" required type="password" />
            </div>
            <div>
              <label for="">
                <Icon
                  icon="lets-icons:done-ring-round-fill"
                  width="16"
                  height="16"
                  style="color: #00a52e"
                />
                <p>確認新密碼</p></label
              >
              <input v-model="data.confirm_password" required type="password" />
            </div>
            <div>{{ errorMsg.statusMessage }}</div>
            <div>
              <button type="submit">新增</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const Router = useRouter()
const useStore = usedefineStore()

const data = reactive({
  current_password: '',
  new_password: '',
  confirm_password: ''
})

const errorMsg = ref(false)

const changePassword = async () => {
  const ans = confirm('你確定要修改密碼嗎？')
  if (ans) {
    try {
      const res = await $fetch('/api/auth/changePassword', {
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `Bearer ${useStore.userInfo.access_token}`
        }
      })
      Router.push({ path: '/' })
      console.log(res)
    } catch (error) {
      console.log(error)
      errorMsg.value = error
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-box {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  form h1 {
    font-weight: 700;
  }
  .content {
    margin-top: 20px;
  }
  label {
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
  }
}

.popup {
  width: 419px;
  height: 578px;
  background-color: white;
  padding: 40px;
  border-radius: 4px;
  transition: all 0.3s ease;
  z-index: 100;

  input {
    width: 382px;
    height: 60px;
    padding: 20px;
    font-size: 17px;
    background-color: #f5f5f5;
    border-radius: 4px;
    border: none;
  }

  button {
    cursor: pointer;
    color: white;
    width: 382px;
    height: 60px;
    border: none;
    border-radius: 8px;
    background-color: #ff8a00;
    font-size: 24px;
    font-weight: 700;
    margin-top: 60px;
    padding: 12px 48px 12px 48px;
  }
}
</style>
