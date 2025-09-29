<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: 'About - JSON vEdit',
  description:
    'JSON vEdit is a powerful Vue.js-based editor for JSON and CSV data. Explore, edit, convert, and analyze data effortlessly with an intuitive interface.',
  ogTitle: 'About - JSON vEdit',
  ogDescription:
    'Discover JSON vEdit, the ultimate tool for developers and analysts to interactively manage JSON and CSV data. Fast, intuitive, and open-source.',
  twitterTitle: 'About - JSON vEdit',
  twitterDescription:
    'JSON vEdit: An interactive editor for JSON & CSV with visualization, conversion, and analysis features.',
})
</script>

<template>
  <div class="container py-16 min-h-screen">
    <h1 class="title my-4">About</h1>
    <section id="intro" aria-labelledby="intro-heading" class="mb-8">
      <h2 class="sub-title" id="intro-heading">What This App Does</h2>
      <p class="text-base leading-relaxed">
        JSON vEdit allows you to effortlessly edit, explore, and convert JSON and CSV data. Enjoy an
        interactive visualization experience that simplifies data analysis and manipulation. Upload,
        modify, and export your data in multiple formats—all within a sleek, developer-friendly
        interface.
      </p>
    </section>
    <section id="about-author" aria-labelledby="author-heading" class="mb-8">
      <h2 class="sub-title" id="author-heading">About the Author</h2>
      <p class="text-base leading-relaxed">
        Developed by
        <a
          href="https://github.com/MFM-347"
          class="link-primary underline decoration-primary/20 underline-offset-2 hover:decoration-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Farhan Madni </a
        >, an open-source enthusiast and Vue.js frontend developer. Passionate about crafting
        intuitive, high-performance web apps that enhance productivity and developer workflows.
      </p>
    </section>
    <section id="powered-by" aria-labelledby="powered-heading" class="mb-8">
      <h2 class="sub-title" id="powered-heading">Tech Stack</h2>
      <ul class="text-base leading-relaxed list-disc list-inside space-y-2">
        <li>
          <strong>Vite.js</strong> – A lightning-fast build tool offering instant hot module
          replacement and optimized bundling.
        </li>
        <li>
          <strong>Vite SSG</strong> – Enables static site generation for Vue apps with optimal
          performance.
        </li>
        <li>
          <strong>Vue.js</strong> – A progressive framework for building dynamic, reactive user
          interfaces.
        </li>
        <li>
          <strong>UnoCSS</strong> – Highly customizable, atomic-first CSS framework for fast
          styling.
        </li>
        <li>
          <strong>Unicons</strong> – A modern icon collection providing vector icons for UI
          consistency.
        </li>
      </ul>
    </section>
  </div>
</template>
