<!--
  _slide.vue 上下左右滑动组件，业务无关

  以this.$emit(customEvents, event, distance)对外输出，
  父组件只需捕获customEvents做相应的（对应业务）操作

  * customEvents: 自定义事件
  * event: 原生事件
  * distance: 滑动位移，值为带正负号的数字，上/右滑为负，下/左滑为正

  其中，
  customEvents = { 
    'touch-start',
    'slide-start',
    'touch-cancel',

    'up-slide',
    'down-slide',
    'left-slide',
    'right-slide',

    'up-slide-end',
    'down-slide-end',
    'left-slide-end',
    'right-slide-end',
  }

-->

<template>
  <div @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        @touchcancel="touchcancel">

    <slot></slot>    

  </div>
</template>

<script>
let __startX
let __startY
let __startTime
let __lastX
let __lastY
let __direction
let __speed


export default {

  methods: {
    touchstart(e) {
      let { pageX, pageY } = e.changedTouches[0]

      __lastX = pageX 
      __startX = pageX
      __lastY = pageY
      __startY = pageY
      __direction = ''
      __startTime = Date.now()
      
      this.$emit('touch-start', e)
    },
    touchmove(e) {
      this.$emit('slide-start', e);

      let { pageX, pageY } = e.changedTouches[0]
      let offsetX = pageX - __lastX
      let offsetY = pageY - __lastY
      let distance = 0
      __lastX = pageX
      __lastY = pageY

      if (Math.abs(offsetX) <= Math.abs(offsetY)) { // 上下滑动
        if (__direction === 'left' || __direction === 'right') 
          return this.$_stopPropagation(e);

        __direction = offsetY < 0 ? 'up' : 'down'
        distance = offsetY
      } else { // 左右滑动
        if (__direction === 'up' || __direction === 'down') 
          return this.$_stopPropagation(e);

        __direction = offsetX < 0 ? 'left' : 'right'
        distance = offsetX
      }

      __speed = distance / (Date.now() - __startTime)
      
      let events = {
        up: 'up-slide',
        down: 'down-slide',
        left: 'left-slide',
        right: 'right-slide',
      }

      return this.$emit(events[__direction], e, Math.round(distance), __speed)
    },
    touchend(e) {
      let { pageX, pageY } = e.changedTouches[0]
      let offsetX = pageX - __startX
      let offsetY = pageY - __startY
      let distance

      if(__direction === 'up' || __direction === 'down')
        distance = offsetY
      if(__direction === 'left' || __direction === 'right')
        distance = offsetX
      
      let events = {
        up: 'up-slide-end',
        down: 'down-slide-end',
        left: 'left-slide-end',
        right: 'right-slide-end',
      }

      return this.$emit(events[__direction], e, Math.round(distance), __speed)
    },
    touchcancel(e) {
      this.$emit('touch-cancel', e)
    },

    $_stopPropagation(e) {
      e.preventDefault()
      e.stopPropagation()
      return false;
    }
  }
}

</script>
