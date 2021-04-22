<!-- tab -->
<template>
  <div class="d-tab fx-row">
    <div v-for="(item, index) in list" :key="index"
      class="fx-1 fx-center l"
      :class="{ active: index == activeIndex }"
      @click="$emit(index)"
    >{{item.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [{name: '机票预订'}, {name: '省钱管家'}]
    },
    activeIndex: 0
  },

  methods: {

  }
}

</script>
<style lang='scss' scoped>
@import "@/scss/_vars.scss";
.d-tab {
  padding-top: 10 * $px;
  font-size: 15 * $px;
  line-height: 21 * $px;
  font-weight: 500;
  text-align: center;
  background-color: #ffffff;

  .l,
  .r {
    position: relative;
    padding-bottom: 8 * $px;
  }

  .active {
    color: #1188ff;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 25 * $px;
      height: 2 * $px;
      background-color: #1188ff;
      transform: translateX(-50%);
    }
  }
}
</style>