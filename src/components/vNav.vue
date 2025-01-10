<template>
  <header
    class="sticky top-0 z-50 py-2 px-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shadow-sm"
  >
    <nav class="container mx-auto w-full flex items-center">
      <div class="flex gap-2 items-center">
        <span
          class="text-xl sm:text-2xl font-extrabold text-primary-600 dark:text-primary-400"
        >
          JSON Editor
        </span>
      </div>
      <ul class="flex gap-2 md:gap-4 ml-auto text-xl capitalize items-center">
        <li>
          <button
            @click="toggleTheme"
            class="px-3 py-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            :aria-label="isDark ? 'Enable Light Mode' : 'Enable Dark Mode'"
          >
            Dark Mode
          </button>
        </li>
        <li>
          <button
            @click="openGithub"
            class="px-3 py-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="View Source Code on GitHub"
          >
            Github
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isDark = ref(false);
const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("dark-mode", isDark.value ? "enabled" : "disabled");
  document.documentElement.classList.toggle("dark", isDark.value);
};
onMounted(() => {
  const mode = localStorage.getItem("dark-mode");
  if (mode === "enabled") {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});
const openGithub = () => {
  window.open("https://github.com/MFM-347/Expense-Tracker", "_blank");
};
</script>
