<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: '404 - Page not found',
  meta: [{ property: 'og:title', content: '404 - Page not found' }],
})
</script>

<template>
  <div class="a">
    <div class="contain">
      <div class="window-controls">
        <div class="dot red" />
        <div class="dot yellow" />
        <div class="dot green" />
      </div>
      <div class="code-block">
        <p class="code-line keyword">const <span class="object">message</span> = {</p>
        <p class="code-line indent">type: <span class="string">'Error'</span>,</p>
        <p class="code-line indent">title: <span class="string">'404'</span>,</p>
        <p class="code-line indent">description: <span class="string">'Page Not Found',</span></p>
        <p class="code-line keyword">}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.a {
  max-width: 100vw;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.contain {
  position: relative;
  margin: auto;
  width: clamp(400px, 90%, 500px);
  height: 275px;
  min-height: clamp(225px, 250px, 300px);
  max-height: 300px;
  padding: 1rem;
  overflow: hidden;
  background: color-mix(in oklch, var(--accent) 90%, transparent);
  border: 1px solid var(--accent);
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px color-mix(in oklch, var(--primary) 16%, transparent);
  transition: all 0.3s ease-in-out;
}

.contain:hover {
  border-color: color-mix(in oklch, var(--primary) 72%, transparent);
  box-shadow: 0 8px 20px color-mix(in oklch, var(--primary) 24%, transparent);
  transform: scale(1.02);
}

.window-controls {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
  background: color-mix(in oklch, var(--accent) 90%, transparent);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transition: transform 0.2s;
}

.dot:hover {
  transform: scale(1.1);
}

.red {
  background: #fb2c36;
}

.yellow {
  background: #efb100;
}

.green {
  background: #00c951;
}

.code-block {
  margin-top: 1.5rem;
  max-height: 12rem;
  overflow: hidden;
  font-size: clamp(20px, 1.2vw, 24px);
  font-family: monospace;
  line-height: 1.5;
}

.keyword {
  color: #ae63e4;
}

.object {
  color: #ffdd40;
}

.string {
  color: #47cf73;
}

.indent {
  margin-left: 1.2rem;
}
</style>
