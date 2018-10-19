<!-- 选择备选航班 -->
<template>
<div class="select-flight">
  <div class="panel a-page-head">
    <div class="a-page-title">8月14日 周一</div>
  </div>
  <div class="panel tab-bar" @click="tapSwitchTab">
    <div class="fx-row">
      <div ref="tabFlight" id="flight" :class="['tab', {'a-text-medium': tabId === 'flight'}]">按航班抢</div>
      <div id="time"  :class="['tab', {'a-text-medium': tabId === 'time'}]">按时间段抢</div>
    </div>
    <div ref="tabLine" class="line" :style="lineOffsetLeft"></div>
  </div>

  <div></div>

</div>
</template>

<script>
export default {
  data () {
    return {
      tabId: '',
      lineOffsetLeft: '',
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.tapSwitchTab()
  },

  methods: {
    tapSwitchTab(e) {
      let tabFlight = this.$refs.tabFlight
      let {
        id,
        offsetLeft,
        clientWidth
      } = e && e.target || tabFlight;

      if (!id) return

      let lineWidth = this.$refs.tabLine.clientWidth
      let x = offsetLeft - tabFlight.offsetLeft + (clientWidth - lineWidth)/2

      this.tabId = id
      this.lineOffsetLeft = `transform: translateX(${x}px)`
    }
  }
}

</script>
<style lang='scss' scoped>
$px: 1rem / 20;
.select-flight {
  min-height: 100vh;
  background-color: #f6f6f6;
}

.tab-bar {
  position: relative;
  color: #333;
  border-bottom: 1px solid rgba(1,1,1,.2);
  .tab {
    margin-right: 40*$px;
    padding-bottom: 10*$px;
  }
  .line {
    margin-bottom: -1px;
    width: 56*$px;
    height: 2px;
    border-radius: 1px;
    background-color: #1188FF;
    transform-origin: 0;
    transition: transform 300ms ease;
  }
}



.color-666 {
  color: #666;
}
.panel {
  padding-left: 20*$px;
  background-color: #fff;
}
</style>