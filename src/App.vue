<script setup>
import { ref, onMounted } from 'vue'
import vNav from './components/vNav.vue'

const isLoading = ref(true)
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <vNav />
  <div v-if="isLoading" class="lc">
    <h4 class="fw-semibold">Loading...</h4>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <div>
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}
.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
.lc {
  /*  loading container  */
  position: fixed;
  background-color: color-mix(in oklab, var(--body-bg) 90%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  z-index: 50;
}
</style>
