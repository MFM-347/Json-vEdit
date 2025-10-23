<script setup lang="ts">
defineProps({
  size: { type: Number, default: 24 },
  cla: { type: String, default: '' },
})
</script>

<template>
  <svg
    class="drop-shadow-primary/40 drop-shadow-sm"
    :class="[cla]"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
  >
    <rect class="fill-primary-foreground" width="64" height="64" rx="12" />
    <path
      class="fill-primary"
      d="M20 18c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h4v-4h-2V22h2v-4h-4zm24 0h-4v4h2v20h-2v4h4c1.1 0 2-.9 2-2V20c0-1.1-.9-2-2-2zM26 32h12v-4H26v4zm0 8h8v-4h-8v4z"
    />
  </svg>
</template>
