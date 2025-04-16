<script setup>
import vNav from './components/vNav.vue'
</script>

<template>
  <a href="#main" class="stm" tabindex="0">Skip to content</a>
  <div>
    <vNav />
    <main id="main" role="main">
      <routerView />
    </main>
  </div>
</template>
<style scoped>
.stm {
  position: absolute;
  margin: -1px;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(100%);
}
.stm:focus {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 50;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  overflow: visible;
  color: #000;
  white-space: normal;
  background-color: #f3f4f6;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  clip: auto;
  clip-path: none;
}
</style>
