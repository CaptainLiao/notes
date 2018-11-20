<!-- 倒计时组件 -->
<template>
  <div class="wrap" :style="{'height': height + 'px', 'line-height': height + 'px' }">
    <div v-for="(item, index) in initTime" :key="index" class="t" :style="animationStyle[index]">
      <template v-if="item && item < 10">
        <span v-for="i in Array(Number(item)+1).fill().map(function(a, i) {return i}).concat(0)" :key="i">{{i}}</span>
      </template>
      <template v-else>
        <span>{{item}}</span>
      </template>
    </div>
  </div>  
</template>

<script>
const ONE_SECOND = 1000
import _ from '@/utils/datetime'
let isNum = a => Number(a).toString() === a

export default {
  data () {
    return {
      initTime: '59:59'.split(''),
      countTime: _.format(this.format, this.time).split(''),
      animationStyle: [],
    }
  },
  props: {
    time: { // 时间戳，毫秒
      type: Number,
      required: true,
      default: 30*60*ONE_SECOND 
    },
    format: {
      type: String,
      default: '%M:%S'
    },
    height: {
      type: Number,
      default: 30
    },
    gap: {// 数字之间的距离
      type: String,
      default: '4px'
    },
    transitionTime: {
      type: Number,
      default: 300
    }
  },
  mounted() {
    this.countdown(this.format, this.time-ONE_SECOND)
  },

  methods: {
    countdown(fmt, time) {
      this.$_lastTime = this.countTime
      this.countTime = time ? _.format(fmt, time).split('') : '00:00'.split('')
      this.setStyle()
      
      if(time >= 0) {
        clearTimeout(this.countdown.timer)
        this.countdown.timer = setTimeout(() => {
          this.countdown(fmt, time - ONE_SECOND)
        }, ONE_SECOND)
      }
    },
    setStyle() {
      let nextTime = this.countTime
      this.$_lastTime.forEach((item, index) => {
          let style = ''
          if( isNum(item) ) {
            style = `transform: translateY(-${(item)*this.height}px); 
                      transition: transform ${this.transitionTime/1000}s;
                    `
          }
          this.animationStyle.splice( index,  1,  style + `margin-right: ${this.gap}` )

          if(item == 0 && nextTime[index] !== '0') {
            setTimeout(() => {
              let offsetY = `-${(Number(this.initTime[index]) + 1)*this.height}px`
              let s = `transform: translateY(${offsetY}); 
                        margin-right: ${this.gap}`
              this.animationStyle.splice(index, 1, s)
            }, this.transitionTime)
          }
        })
    },
  }
}

</script>
<style lang='scss' scoped>
$rem: 1 / 18.75 * 1rem;

.wrap {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.t {
  display: flex;
  flex-direction: column;
  &:last-child {
    margin-right: 0
  }
}
</style>