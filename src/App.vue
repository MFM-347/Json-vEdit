<script setup>
import vNav from "./components/vNav.vue";
import { Analytics } from "@vercel/analytics/vue";
</script>

<template>
  <vNav />
  <RouterView class="wf" />
  <Analytics />
</template>
