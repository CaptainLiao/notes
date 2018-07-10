<template><!-- 下拉刷新上拉加载 -->
  <div id="refreshLoad" 
        @touchstart="touchStart" 
        @touchmove="touchMove" 
        @touchend="touchEnd"
        :style="{'margin-top': downMarginTop+'px'}">
    <div class="down-refresh" v-if="pullDownStatus" :style="{'line-height': height+'px'}">
      <slot name="down-refresh-status">
        <span class="down-waiting" v-show="pullDownStatus === 'waiting'">下拉刷新</span>
        <span class="down-refreshing" v-show="pullDownStatus === 'pending'">松开刷新数据</span>
        <span class="down-loading" v-show="pullDownStatus === 'refreshing'">加载中……</span>
      </slot>
    </div>
    <slot></slot>
    <div class="up-load" v-show="pullUpStatus">
      <span v-show="pullUpStatus === 'waiting'">上啦加载更多</span>
      <span v-show="pullUpStatus === 'loading'">加载中……</span>
    </div>
  </div>
</template>

<script>
const SPEED_MUTIPLE = 0.98
const SPEED = 1
const MARGIN_TOP = -120

let _speed = SPEED
let _start_y
let _last_y

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
      default: 'waiting', //waiting, pending, refreshing, refreshed
    },
    pullUpStatus: {
      type: String,
      default: 'waiting', //waiting, loading
    },
  },

  watch: {
    pullDownStatus(newV, oldV) {
      if( newV === 'refreshed' ) {
        this.downMarginTop = MARGIN_TOP
        this.pullDownStatus = 'waiting'
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
      
      return offsetY >= 0 
        ? this.$_down_move(e, offsetY) 
        : this.$_up_move(e, offsetY)
    },
    touchEnd(e) {
      let { pageY } = e.changedTouches[0]
      let offsetY = pageY - _start_y

      return offsetY >= 0 
        ? this.$_start_pull_down_refresh(e, offsetY) 
        : this.$_start_pull_up_load(e, offsetY)
    },

    $_down_move(e, offsetY) {
      // 滚动条在顶部时触发
      if( document.querySelector('.a-layout-body').scrollTop === 0 ) {
        if(this.downMarginTop <= 0) {
          this.downMarginTop += offsetY
        } else {
          _speed *= SPEED_MUTIPLE
          this.downMarginTop += offsetY * _speed
          this.pullDownStatus = 'pending'
        }
        //禁用ios webview 回弹效果
        e.preventDefault()
      }
    },
    $_up_move() {
      // TODO：滚动条在底部时触发
      
    },
    $_start_pull_down_refresh() {
      if(this.downMarginTop > 0 || this.pullDownStatus === 'refreshing') {
        this.downMarginTop = 0
        this.pullDownStatus = 'refreshing'
      } else {
        this.downMarginTop = MARGIN_TOP
        this.pullDownStatus = 'waiting'
      }

      this.$emit('start-pull-down-refresh')
    },
    $_start_pull_up_load() {
      // TODO:上拉加载...
      this.$emit('start-pull-up-load')
    },
  }
}
</script>

<style lang="scss">
#refreshLoad { //可根据实际情况增删样式
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.down-refresh {
  text-align: center;
}
</style>