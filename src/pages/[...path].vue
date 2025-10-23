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
  display: grid;
  place-items: center;
  max-width: 100vw;
  min-height: 100vh;
}

.contain {
  position: relative;
  transition: all 0.3s ease-in-out;
  margin: auto;
  box-shadow: 0 4px 12px color-mix(in oklch, var(--primary) 16%, transparent);
  border: 1px solid var(--accent);
  border-radius: 1.5rem;
  background: color-mix(in oklch, var(--accent) 90%, transparent);
  padding: 1rem;
  width: clamp(400px, 90%, 500px);
  height: 275px;
  min-height: clamp(225px, 250px, 300px);
  max-height: 300px;
  overflow: hidden;
}

.contain:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px color-mix(in oklch, var(--primary) 24%, transparent);
  border-color: color-mix(in oklch, var(--primary) 72%, transparent);
}

.window-controls {
  display: flex;
  position: absolute;
  top: 16px;
  left: 16px;
  gap: 8px;
  background: color-mix(in oklch, var(--accent) 90%, transparent);
}

.dot {
  transition: transform 0.2s;
  border-radius: 50%;
  width: 10px;
  height: 10px;
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
  line-height: 1.5;
  font-family: monospace;
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
