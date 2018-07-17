<template><!-- 下拉刷新上拉加载 -->
  <div id="refreshLoad" 
        @touchstart="touchStart" 
        @touchmove="touchMove" 
        @touchend="touchEnd"
        :style="{'margin-top': pullDownStatus ? downMarginTop+'px' : '', 'transition': pullDownStatus === 'refreshed' ? 'all .3s ease-in': ''}">
    <div class="down-refresh" :style="{'line-height': height+'px'}">
      <slot name="down-refresh-status">
        <image class="img" v-show="pullDownStatus === 'waiting'" v-imagesrc="'delaycare/coin.png'" />
        <image class="img" v-show="pullDownStatus === 'pending'" v-imagesrc="'delaycare/coin.png'" />

        <image class="img" v-show="pullDownStatus === 'refreshing'" v-imagesrc="'delaycare/coin.png'" />
        <image class="rotate-track" v-show="pullDownStatus === 'refreshing'" v-imagesrc="'delaycare/track1.png'" />

        <image class="img" v-show="pullDownStatus === 'refreshed'" v-imagesrc="'delaycare/coin.png'" />
      </slot>
    </div>
    <slot></slot>
    <div class="up-load" v-show="pullUpStatus">
      <span v-show="pullUpStatus === 'waiting'">上拉加载更多</span>
      <span v-show="pullUpStatus === 'loading'">加载中……</span>
    </div>
  </div>
</template>

<script>

const SPEED = 0.8
const MARGIN_TOP = -84

let _speed = SPEED
let _start_y
let _last_y
let _ready_to_refresh

export default {
  data() {
    return {
      height: -MARGIN_TOP,
      downMarginTop: MARGIN_TOP,
    }
  },

  props: {
    pullDownStatus: {
      type: String,
      default: '', //waiting, pending, refreshing, refreshed
    },
    pullUpStatus: {
      type: String,
      default: '', //waiting, loading
    },
  },

  watch: {
    pullDownStatus(newV) {
      if( newV === 'refreshed' ) {
        this.downMarginTop = MARGIN_TOP
      }
    }
  },

  methods: {
    touchStart(e) {
      let { pageY } = e.changedTouches[0]
      _last_y = _start_y = pageY
      _speed = SPEED
    },
    touchMove(e) {
      let { pageY } = e.changedTouches[0]
      let offsetY = pageY - _last_y
      _last_y = pageY
      
      return offsetY >= 0 // 每次移动的距离不超过10
        ? this.$_down_move(e, Math.min(offsetY, 10)) 
        : this.$_up_move(e, Math.min(offsetY, -10))
    },
    touchEnd(e) {
      let { pageY } = e.changedTouches[0]
      let offsetY = pageY - _start_y
      
      return offsetY >= 0 
        ? this.$_start_pull_down_refresh(e, offsetY) 
        : this.$_start_pull_up_load(e, offsetY)
    },

    $_down_move(e, offsetY) {
      if(!this.pullDownStatus) return

      this.pullDownStatus = 'pending'
      // 滚动条在顶部时触发
      if( document.querySelector('.a-layout-body').scrollTop === 0 ) {
        if(this.downMarginTop <= 0) {
          this.downMarginTop += offsetY
        } else {
          _speed -= 0.03
          this.downMarginTop += offsetY * Math.max(_speed, 0.2)
          this.pullDownStatus = 'pending'
        }
        //禁用ios webview 回弹效果
        e.preventDefault()
      }
    },
    $_up_move() {
      // TODO：滚动条在底部时触发

    },
    $_start_pull_down_refresh(e, offsetY) {
      // console.log(e)
      if(!this.pullDownStatus) return

      if(this.downMarginTop > 0 || this.pullDownStatus === 'refreshing') {
        this.downMarginTop = 0
        this.pullDownStatus = 'refreshing'
        _ready_to_refresh = true
      } else {
        this.downMarginTop = MARGIN_TOP
        this.pullDownStatus = 'waiting'
      }

      if(Math.abs(offsetY) >= Math.abs(MARGIN_TOP) && _ready_to_refresh ) {
        this.$emit('start-pull-down-refresh')
        _ready_to_refresh = false
      }
    },
    $_start_pull_up_load() {
      // TODO:上拉加载...
      this.$emit('start-pull-up-load')
    },
    $_update_style(marginTop, hasTransition) {
      let transition = hasTransition ? 'all .3s ease-in' : ''
      this.updateStyle = `margin-top:${marginTop}px;transition:${transition}`
    },
  }
}
</script>

<style lang="scss">
$rem: 1 / 18.75 * 1rem;

.down-refresh {
  position: relative;
  height: 84px;

  display: flex;
  justify-content:center;
  align-items:Center;
  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 68px;
    height: 68px;
    z-index: 1;
  }
  .rotate-track {

    width: 68px;
    height: 68px;
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% {transform: rotate(0deg);transform-origin:50% 50%;}
    100% {transform: rotate(360deg);transform-origin:50% 50%;}
  }
}
</style>