<!-- 左滑删除 
  TODO：上下滑动
-->
<template>
  <div class="slide"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        @touchcancel="touchcancel"
        :style="{'transform': transform, 'transition': transition}"
        >
    <slot>
      <div class="wrapper">
        <div class="box">测试测测测试测测测试测测测试测测测试测测测试测测测试测测测试测测</div>
        <div class="empty"></div>
        <div class="del"><div class="text">删除</div></div>
      </div>
    </slot>
  </div>
</template>

<script>
const MIN_OFFSET_X = 40 
const MAX_OFFSET_X = 80
const TRANSITION = `all .8s cubic-bezier(.15,.85,.35,1)`
const SPEED_X = 0.6

// 记录上一次move，手指的位置
let __lastX
let __lastY

let __direction // 滑动方向
let __has_lr_direction// 已经左/右滑出去了吗

export default {
  data () {
    return {
      transition: '',
      offsetY: 0
    };
  },
  props: {
    offsetX: {
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
      __lastY = pageY
      __direction = ''
      __has_lr_direction = Math.abs(this.offsetX) === MAX_OFFSET_X

      this.$emit('touchstart') // 开始滑动之前，重置所有位移
    },
    touchmove(e) {
      let { pageX, pageY } = e.changedTouches[0]
      let offsetX = pageX - __lastX
      let offsetY = pageY - __lastY
      let distance = 0
      __lastX = pageX
      __lastY = pageY

      this.transition = '' // move中不需要transition

      if( Math.abs(offsetX) <= Math.abs(offsetY) ) {
        //上下滑时禁止左右滑
        if( __direction === 'left' || __direction === 'right' ) 
          return e.preventDefault()

        __direction = offsetY < 0 ? 'up' : 'down'
        distance = offsetY
      } else {
        // 左右滑时禁止上下滑
        if( __direction === 'up' || __direction === 'down' )
          return e.preventDefault()

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
      let executor = {
        up: this.$_up_end,
        down: this.$_down_end,
        left: this.$_left_end,
        right: this.$_right_end,
      }[__direction] || this.$_reset

      return executor(e) 
    },
    touchcancel() {
      this.$_reset()
    },

    $_left_move(e, distance) {
      // 已经左/右滑出去了就重置
      if( __has_lr_direction ) {
        this.$_reset()
        return e.preventDefault()
      };

      let speed = Math.abs(this.offsetX) < MAX_OFFSET_X * 2/3
        ? 1
        : SPEED_X

      this.offsetX += distance * speed
      e.preventDefault()
    },
    $_right_move(e, distance) {
      // 避免滑出容器
      this.offsetX += Math.min(Math.abs(this.offsetX), distance)
      e.preventDefault()
    },

    $_left_end(e) {
      // 左滑结束，滑动块回到合适位置
      if(Math.abs(this.offsetX) > MIN_OFFSET_X ) {
        this.offsetX = -MAX_OFFSET_X
      } else {
        this.offsetX = 0
      }

      this.transition = TRANSITION
      e.preventDefault()
    },
    $_right_end(e) {
      this.$_reset()
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
.wrapper {
  margin: 10px 0;
  display: table;
  width: 200%;
}
.box {
  display: table-cell;
  width: 100vw;
  padding: 20px 0;
  background-color: #ccc;
}
.empty {
  display: table-cell;
  width: 10px;
}
.del {
  display: table-cell;
  color: #fff;
  background:red;
  vertical-align: middle;
  .text {
    width: 70px;
    text-align: center;
  }
}
</style>