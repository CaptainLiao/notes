
<template>
<div class="timeline">
  <div class="timeline-item">
    <div v-if="isLast" class="timeline-item-line"></div>
    <div :class="['timeline-item-node', circle ? 'circle' : '']">
      <slot name="node"></slot>
    </div>
    <div class="timeline-item-content">
      <slot name="content">测试内容</slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    isLast: false,
    circle: false,
  },
}

</script>
<style lang='scss' scoped>
$px: 1rem/20;

.timeline-item {
  position: relative;

}
.timeline-item-line {
  position: absolute;
  left: 8*$px;

  height: 100%;
  border-left: 1px dotted rgba(204, 204, 204, 1);
}

.timeline-item-node {
  position: absolute;
  left: 0;
  width: 16*$px;
  height: 16*$px;
  line-height: 16*$px;
  border-radius: 2*$px;

  font-size: 12*$px;
  text-align: center;
  color: #fff;
  background: rgba(25, 133, 255, 1);
}
.timeline-item-node.circle {
  border-radius: 50*$px;
}
.timeline-item-content {
  position: relative;
  top: -3*$px;
  padding-left: 20*$px;
}

</style>


