<template>
  <div>
    <hb-header v-bind:title="title"></hb-header>
    <div class="content">
      首页内容
    </div>
  </div>
</template>

<script>
import header from "../../components/header/index";
import loading from "../../components/loading/index";
let loadingInstance = null;

export default {
  components: {
    'hb-header': header
  },

  mounted() {
    loadingInstance = loading({
      text: '正在加载中。。。',
      fullscreen: true
    });

    setTimeout(function() {
      loadingInstance.close();  
    }, 1000);
  },

  data() {
    return {
      title: '首页'
    }
  }
}
</script>

<style>

</style>
