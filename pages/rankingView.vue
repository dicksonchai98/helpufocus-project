<template>
  <div class="body">
    <div class="progressbar-container">
      <div class="progressbar-content">
        <div class="book-page">
          <p>
            <Icon icon="typcn:tick" width="25" height="25" style="color: #00a52e" />已經讀了70本書
          </p>
          <h1>40<span>%</span></h1>
        </div>
        <div class="progress-container">
          <div class="progress">
            <div :style="{ width: progress + '%' }" class="progress__fill"></div>
            <span class="progress__text">{{ progress }}%</span>
          </div>
          <p>還剩下24本書</p>
        </div>
      </div>
      <div class="book-img"><img src="../../public/graphic3.svg" alt="" /></div>
    </div>
    <div class="notebook-container">
      <div class="notebook-title">
        <ul>
          <li>全球排名</li>
          <li>觀察名單</li>
        </ul>
        <p>已完成</p>
      </div>
      <div class="ranking-container">
        <div>
          <div class="ranking-content">
            <p>1</p>
            <div class="profile">
              <span class="user-profile"></span>
              <h2>name</h2>
              <div class="tick">
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
                <div :style="{ width: progress + '%' }" class="progress__fill"></div>
                <span class="progress__text">80%</span>
              </div>
            </div>
            <div>
              <p>32/50</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
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
    margin-right: 50px;
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
  border: 1px solid black;
  background-color: black;
  margin-right: 10px;
}
.profile .tick {
  position: relative;
  top: 18px;
  left: -86px;
}
.profile {
  display: flex;
  align-items: center;
}

.notebook-title ul li:hover {
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
  background: #ff9f5a;
  transition: all 0.2s;
  border-radius: 32px;
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
}
</style>
