<script setup lang="ts">
import VNav from './components/VNav.vue'
</script>

<template>
  <div>
    <a href="#main" class="stm text-accent-foreground rounded-lg bg-accent shadow-sm" tabindex="0"
      >Skip to content</a
    >
    <VNav />
    <main id="main" role="main">
      <routerView />
    </main>
  </div>
</template>

<style scoped>
/* skipToContent */
.stm {
  position: absolute;
  margin: -1px;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  clip: rect(0, 0, 0, 0);
}

.stm:focus-visible {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 10;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  clip: auto;
}
</style>
