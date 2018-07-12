<!-- 手势组件 -->
<template>
  <div class="slide"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        @touchcancel="touchcancel"
        :style="{'transform': transform, 'transition': transition}"
        >
    <slot></slot>
  </div>
</template>

<script>
const MIN_OFFSET_X = 40 
const MAX_OFFSET_X = 80
const TRANSITION = `all .7s cubic-bezier(.15,.85,.35,1)`
const SPEED_X = 0.2

let __startX
let __startY
let __lastX
let __lastY
let __direction

export default {
  data () {
    return {
      transition: '',
    };
  },
  props: {
    offsetX: {
      type: Number,
      default: 0
    },
    offsetY: {
      type: Number,
      default: 0
    },
  },
  computed: {
    transform() {
      return `translate(${this.offsetX}px, ${this.offsetY}px)`
    },
  },
  methods: {
    touchstart(e) {
      let { pageX, pageY } = e.changedTouches[0]

      __lastX = pageX 
      __startX = pageX
      __lastY = pageY
      __startY = pageY
      __direction = ''
      
      this.$emit('touchstart')
    },
    touchmove(e) {
      let { pageX, pageY } = e.changedTouches[0]
      let offsetX = pageX - __lastX
      let offsetY = pageY - __lastY
      let distance = 0
      __lastX = pageX
      __lastY = pageY
      this.transition = ''

      if( Math.abs(offsetX) <= Math.abs(offsetY) ) { // 上下滑动
        if( __direction === 'left' || __direction === 'right' )
          return;
        __direction = offsetY < 0 ? 'up' : 'down'
        distance = offsetY
      } else { // 左右滑动
        if( __direction === 'up' || __direction === 'down' )
          return;
        __direction = offsetX < 0 ? 'left' : 'right'
        distance = offsetX
      }
      
      let executor = {
        up: this.$_up_move,
        down: this.$_down_move,
        left: this.$_left_move,
        right: this.$_right_move,
      }[__direction] || this.$_reset

      return executor(e, distance) 
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
      
      let executor = {
        up: this.$_up_end,
        down: this.$_down_end,
        left: this.$_left_end,
        right: this.$_right_end,
      }[__direction] || this.$_reset

      return executor(e, distance)
    },
    touchcancel() {
      this.$_reset()
    },

    $_left_move(e, distance) {
      let speed = Math.abs(this.offsetX) < MAX_OFFSET_X
        ? 1
        : SPEED_X
  
      this.offsetX += distance * speed
      e.preventDefault()
    },
    $_right_move(e, distance) {
      let abs_offset = Math.abs(this.offsetX)
      if(abs_offset === MAX_OFFSET_X) {
        this.$_reset()
      } else {
        this.offsetX += Math.min(abs_offset, distance)
      }
      
      e.preventDefault()
    },

    $_left_end(e, distance) {
      if(Math.abs(distance) > MIN_OFFSET_X ) {
        this.offsetX = -MAX_OFFSET_X
      } else {
        this.offsetX = 0
      }

      this.transition = TRANSITION
      e.preventDefault()
    },
    $_right_end(e, distance) {
      e.preventDefault()
    },
    $_reset() {
      this.transition = TRANSITION
      this.offsetX = 0
    }, 
  }
}

</script>
<style lang='scss' scoped>
$rem: 1 / 18.75 * 1rem;
.slide {
  width: 100%;
  overflow: hidden;
}
</style>