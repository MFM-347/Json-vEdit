<script setup lang="ts">
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
        <button class="btn btn-ghost" title="Home">
          <UilHomeAlt class="size-5" />
          <span class="sr-only">Home</span>
        </button>
      </RouterLink>
      <RouterLink to="/editor">
        <button class="btn btn-ghost" title="Editor">
          <UilPen class="size-5" />
          <span class="sr-only">Editor</span>
        </button>
      </RouterLink>
      <RouterLink to="/export">
        <button class="btn btn-ghost" title="Export">
          <UilFileExport class="size-5" />
          <span class="sr-only">Export</span>
        </button>
      </RouterLink>
      <RouterLink to="/about">
        <button class="btn btn-ghost" title="About">
          <UilInfoCircle class="size-5" />
          <span class="sr-only">About</span>
        </button>
      </RouterLink>
      <button class="btn btn-ghost" title="Toggle Theme" @click="toggleTheme">
        <UilMoon class="size-5 rotate-0 scale-100 transition-all dark:scale-0 dark:-rotate-90" />
        <UilSun
          class="size-5 rotate-90 scale-0 transition-all absolute dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </button>
    </div>
  </div>
</template>
