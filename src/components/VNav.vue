<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { RouterLink } from 'vue-router'

const mode = useColorMode()

function toggleTheme() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div
    class="px-0.25 border rounded-lg bg-background-subtle flex h-10 shadow-primary/40 shadow-sm translate-x-1/2 items-center right-1/2 top-4 justify-center fixed z-10"
  >
    <div class="flex gap-1 justify-around">
      <RouterLink to="/">
        <button title="Home" class="btn btn-ghost">
          <span class="i-uil-home-alt h-5 w-5" />
          <span class="sr-only">Home</span>
        </button>
      </RouterLink>
      <RouterLink to="/editor">
        <button title="Editor" class="btn btn-ghost">
          <span class="i-uil-pen h-5 w-5" />
          <span class="sr-only">Editor</span>
        </button>
      </RouterLink>
      <RouterLink to="/export">
        <button title="Export" class="btn btn-ghost">
          <span class="i-uil-file-export h-5 w-5" />
          <span class="sr-only">Export</span>
        </button>
      </RouterLink>
      <RouterLink to="/about">
        <button title="About" class="btn btn-ghost">
          <span class="i-uil-info-circle h-5 w-5" />
          <span class="sr-only">About</span>
        </button>
      </RouterLink>
      <button title="Toggle Theme" class="btn btn-ghost" @click="toggleTheme">
        <span
          name="uil:moon"
          class="i-uil-moon h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0 dark:-rotate-90"
        />
        <span
          name="uil:sun"
          class="i-uil-sun h-5 w-5 rotate-90 scale-0 transition-all absolute dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </button>
    </div>
  </div>
</template>
