<!-- 
下拉刷新上拉加载 
<scroll-view 
      :pull-down-status="pullDownStatus" 
      @scrolltoupper="onStartPullDownRefresh"
      :lower-threshold="'100'" // 默认50
      @scrolltolower="onStartPullUpLoad">
  <div>xxxxxxxxxxxxxxx</div>
</scroll-view>
-->
<template>
<div id="refreshLoad">
  <!-- 下拉刷新区 -->
  <div class="down-refresh" :style="pullDownStyle">
    <slot name="down-refresh" ref="down-refresh">
      <image class="img" v-show="pullDownStatus === 'refreshed'" v-imagesrc="'delaycare/coin.png'" />

      <image class="img" v-show="pullDownStatus === 'refreshing'" v-imagesrc="'delaycare/coin.png'" />
      <image class="rotate-track" v-show="pullDownStatus === 'refreshing'" v-imagesrc="'delaycare/track1.png'" />
    </slot>
  </div>

  <!-- 内容区域 -->
  <div class="conent-wrapper"
      @touchstart="touchStart" 
      @touchmove="touchMove"
      @touchend="touchEnd">
    <slot></slot>
  </div>

  <!-- 上拉加载区 -->
  <div class="up-load">
    <slot name="up-load"></slot>
  </div>
</div>

</template>

<script>
// 可自定义
const MARGIN_TOP = 84
const SCROLL_ELEM = '.a-layout-body'

const WINDOW_HEIGHT = window.innerHeight
const SPEED = 0.8

let _start_y
let _last_y
let _speed = SPEED
let _pull_down_margin_top = -MARGIN_TOP
let _scroll_elem

export default {
  data() {
    return {
      pullDownStyle: `height:${MARGIN_TOP}px;margin-top:${_pull_down_margin_top}px`
    }
  },

  props: { // 由父组件控制状态
    pullDownStatus: {
      type: String,
      default: '', //refreshing, refreshed
    },
    lowerThreshold: { //距底部多远时（单位px），触发 scrolltolower 事件
      type: Number,
      default: 50
    },
  },

  watch: {
    pullDownStatus(newV) {
      if( newV === 'refreshed' ) {
        _pull_down_margin_top = -MARGIN_TOP
        _speed = SPEED
        this.$_update_down_style({ addTransition: true })
      }
    }
  },

  methods: {
    touchStart(e) {
      let { pageY } = e.changedTouches[0]
      _last_y = _start_y = pageY
      _scroll_elem = document.querySelector(SCROLL_ELEM)
    },
    touchMove(e) {
      let { pageY } = e.changedTouches[0]
      let offsetY = pageY - _last_y
      _last_y = pageY
      
      return offsetY >= 0 // 每次move的距离不超过10px
        ? this.$_down_move(e, Math.min(offsetY, 10)) 
        : this.$_up_move(e, Math.min(offsetY, -10))
    },
    touchEnd(e) {
      let { pageY } = e.changedTouches[0]
      let offsetY = pageY - _start_y
      
      return offsetY >= 0 
        ? this.$_trigger_refresh(e, offsetY) 
        : this.$_trigger_load(e, offsetY)
    },

    $_down_move(e, offsetY) {
      // 滚动条在顶部才触发 down move
      let isReachTop = _scroll_elem.scrollTop === 0;

      if(!this.pullDownStatus || !isReachTop) return

      // 模拟下拉时先快后慢效果
      this.pullDownStatus = 'refreshed'
      if(_pull_down_margin_top <= -MARGIN_TOP * 2/3) {
        _pull_down_margin_top += offsetY
      } else {
        _speed -= 0.03
        _pull_down_margin_top += offsetY * Math.max(_speed, 0.2)
      }
      this.$_update_down_style()
      //禁用ios webview 回弹效果
      e.preventDefault()
    },
    $_up_move(){},

    $_trigger_refresh(e, offsetY) {
      if(!this.pullDownStatus) return

      if(_pull_down_margin_top >= 0) {
        _pull_down_margin_top = 0
        this.pullDownStatus = 'refreshing'
        this.$emit('scrolltoupper')
      } else {
        _pull_down_margin_top = -MARGIN_TOP
      }

      this.$_update_down_style({addTransition: true})
    },
    $_trigger_load(e, offsetY) {
      // 上拉加载...
      let isReachBottom = WINDOW_HEIGHT + 
        _scroll_elem.scrollTop + 
        this.lowerThreshold >= _scroll_elem.scrollHeight;

      if(!isReachBottom) return
      this.$emit('scrolltolower')
    },
    $_update_down_style({addTransition} = {}) {
      let transition = addTransition ? 'margin-top .3s ease-in' : ''
      this.pullDownStyle = `
        height:${MARGIN_TOP}px;
        margin-top:${_pull_down_margin_top}px;
        transition:${transition}
      `
    },
  }
}
</script>

<style lang="scss">
$rem: 1 / 18.75 * 1rem;

.down-refresh {
  position: relative;

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
    0% {transform: rotate(60deg);transform-origin:50% 50%;}
    100% {transform: rotate(420deg);transform-origin:50% 50%;}
  }
}
</style>