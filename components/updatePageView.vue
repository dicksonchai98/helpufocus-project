<template>
  <div class="timer-container">
    <img src="../public/graphic4.svg" alt="" /> <a href=""><span class="timer-button"></span></a>
    <div class="timer">
      <div class="timer-display">
        <div class="qty-input">
          <button class="qty-count qty-count--minus" type="button" @click="minus">-</button>
          <input
            v-model="page"
            class="product-qty"
            type="number"
            name="product-qty"
            min="0"
            :max="10"
          />
          <button class="qty-count qty-count--add" type="button" @click="plus">+</button>
        </div>
      </div>
      <button class="button" @click="updatePage()">更新頁數</button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
const useStore = usedefineStore()
const prop = defineProps(['id', 'books'])
const updatePage = async () => {
  const tokenExpiredTime = localStorage.getItem('tokenExpiredTime')
  const now = Date.now()
  if (now > tokenExpiredTime) {
    const refreshToken = localStorage.getItem('refreshToken')
    await useStore.refreshApi(refreshToken)
  }
  const res = await $fetch(`/api/books/${prop.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${useStore.userInfo.access_token}`
    },
    body: {
      book_read_page: prop.books.book_read_page + page.value
    }
  })
  useStore.getNoteList()
  useStore.getBookList()
  useStore.toggleTimers()
  useStore.getAllRank()
  useStore.getRank()
  page.value = 1
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
    title: '頁數已更新！'
  })
}
// 更新頁數
const page = ref(1)
const plus = () => {
  if (page.value < prop.books.book_total_page - prop.books.book_read_page) {
    page.value++
  }
}
const minus = () => {
  if (page.value > 1) {
    page.value--
  }
}
</script>

<style lang="scss" scoped>
.timer-container {
  width: 346px;
  height: 287px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #454545;
  position: absolute;
  padding: 32px;
  box-shadow: 0px 12px 32px 0px #00000012;
  top: 320px;
  right: 170px;
  z-index: 1000;
  .icon {
    display: block;
    color: transparent;
    transition: 0.3s ease;
    cursor: pointer;
  }
}
.timer-display:hover .icon {
  color: #454545;
}

.timer-display {
  width: 239px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.timer {
  margin-top: 20px;
  height: 100px;
}

.button {
  cursor: pointer;
  color: #ffff;
  width: 100%;
  height: 40px;
  outline: none;
  border-radius: 4px;
  background-color: black;
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
}

$black: #000;
$white: #fff;
$gray: #ccc;
$smoke: #e2e2e2;
$disable: #f2f2f2;

.qty-input {
  color: $black;
  background: white;
  display: flex;
  align-items: center;
  overflow: hidden;

  .product-qty,
  .qty-count {
    background: transparent;
    color: inherit;
    font-weight: bold;
    font-size: inherit;
    border: none;
    display: inline-block;
    min-width: 0;
    height: 2.5rem;

    &:focus {
      outline: none;
    }
  }

  .product-qty {
    width: 50px;
    min-width: 0;
    display: inline-block;
    text-align: center;
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
  }

  .qty-count {
    padding: 0;
    cursor: pointer;
    width: 2.5rem;
    font-size: 1.25em;
    text-indent: -100px;
    overflow: hidden;
    position: relative;

    &:before,
    &:after {
      content: '';
      height: 2px;
      width: 10px;
      position: absolute;
      display: block;
      background: $black;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    &--minus {
      border-right: 1px solid $smoke;
    }
    &--add {
      border-left: 1px solid $smoke;
      &:after {
        transform: rotate(90deg);
      }
    }

    &:disabled {
      color: $gray;
      background: $disable;
      cursor: not-allowed;
      border-color: transparent;

      &:before,
      &:after {
        background: $gray;
      }
    }
  }
}
</style>
