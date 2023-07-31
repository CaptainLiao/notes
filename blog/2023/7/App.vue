<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="keepAliveIncludes">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { keepAliveIncludes, addKeepAliveInclude } from './router/keep-alive'

const route = useRoute()

watch(route, (to) => {
  addKeepAliveInclude(to)
})
</script>

<style lang="scss"></style>
