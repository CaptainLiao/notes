<template>
  <div class="g-tab-bar" :style="{ backgroundColor }">
    <div v-for="(item, i) in list" :key="i" class="g-tab-item" @click="onClickTabItem(i)">
      <img :src="i === currentIndex ? item.selectedIcon : item.icon" class="g-tab-item-icon" />
      <div class="g-tab-item-text" :style="{ color: (i === currentIndex ? selectedColor : color) }">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#708999'
    },
    selectedColor: {
      type: String,
      default: '#1188FF'
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    list: {
      type: Array
    },
    currentIndex: {
      type: Number
    }
  },

  methods: {
    onClickTabItem(index) {
      const item = this.list[index]
      if (item && index !== this.currentIndex) {
        this.$emit('clickTabItem', item);
      }
    }
  }
};
</script>

<style>
.g-tab-bar {
  position: fixed;
  z-index: 9;
  bottom: 0;
  left: 0;
  
  display: flex;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.g-tab-item {
  padding-top: 2px;
  width: 0;
  height: 50px;
  box-sizing: border-box;

  flex: 1;
  text-align: center;
}
.g-tab-item-icon {
  height: 30px;
  vertical-align: top;
}
.g-tab-item-text {
  font-size: 10px;
}
</style>
