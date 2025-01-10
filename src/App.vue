<script setup>
import JsonEditor from "./components/JsonEditor.vue";
import vNav from "./components/vNav.vue";
import { Analytics } from "@vercel/analytics/vue";
</script>

<template>
  <vNav />
  <JsonEditor />
  <Analytics />
</template>
