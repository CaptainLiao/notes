<template>
  <div class="loading-overlay" :class="{'hidden':!show}" @touchmove.prevent>
    <div class="a-spinner-wrapper">
      <div class="a-spinner a-spinner-M a-spinner-light">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div v-if="title" class="loading-title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: String
    }
  };
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 300ms ease;
  opacity: 1;
  z-index: 1000;
  &.hidden {
    opacity: 0;
  }
}

.a-spinner-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(0,0,0,0.75);
  border-radius: 6px;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.loading-title {
  margin-top: 8px;
  font-size: 12px;
  color: #ddd;
  width: 80%;
  // white-space: nowrap;
  // overflow: hidden;
  text-align: center;
}

.a-spinner {
  display: inline-block;
  position: relative;
}
.a-spinner div {
  animation: a-spinner 1.2s linear infinite;
  position: absolute;
  border-radius: 20%;
}

.a-spinner-light div {
  background: #ccc;
}
.a-spinner-dark div {
  background: #888;
}

.a-spinner-L {
  width: 58px;
  height: 58px;
}
.a-spinner-L div {
  transform-origin: 2px 28px;
  left: 28px;
  width: 3px;
  height: 15px;
}

.a-spinner-M {
  width: 48px;
  height: 48px;
}
.a-spinner-M div {
  transform-origin: 1px 23px;
  left: 22px;
  width: 3px;
  height: 14px;
}

.a-spinner-S {
  width: 32px;
  height: 32px;
}
.a-spinner-S div {
  transform-origin: 1px 15px;
  left: 15px;
  width: 2px;
  height: 8px;
}

.a-spinner-XS {
  width: 20px;
  height: 20px;
}
.a-spinner-XS div {
  transform-origin: 1px 9px;
  left: 9px;
  width: 2px;
  height: 5px;
}

.a-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.a-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.a-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.a-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.a-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.a-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.a-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.a-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.a-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.a-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.a-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.a-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes a-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
