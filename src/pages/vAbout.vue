<template>
  <div class="wf p-4">
    <div class="container">
      <h1 class="fw-semibold">About</h1>
      <section id="intro" aria-labelledby="intro-heading" class="mb-4">
        <h2 id="intro-heading" class="fw-semibold">What This App Does</h2>
        <p>
          Effortlessly edit and convert your JSON/CSV data with our powerful visualization tool.
          Upload, explore, and modify JSON with interactive views. Now with CSV support for more
          flexibility. Export, Analyze, Edit, Convert — all in one place. The best choice for
          developers and analysts.
        </p>
      </section>

      <section id="about-author" aria-labelledby="author-heading" class="mb-4">
        <h2 id="author-heading" class="fw-semibold">About the Author</h2>
        <p>
          This app was created by
          <a
            href="https://github.com/MFM-347"
            class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Farhan Madni </a
          >, an open-source contributor and Vue.js frontend developer passionate about building
          intuitive, high-performance web applications.
        </p>
      </section>

      <section id="powered-by" aria-labelledby="powered-heading">
        <h2 id="powered-heading" class="fw-semibold">Empowered By</h2>
        <ul>
          <li>
            <strong>Vite.js</strong> – A lightning-fast, next-generation build tool that enhances
            the development experience with instant hot module replacement.
          </li>
          <li>
            <strong>Vue.js</strong> – A progressive JavaScript framework dedicated to building
            dynamic and reactive user interfaces.
          </li>
          <li>
            <strong>Bootstrap</strong> – A robust CSS framework that helps create responsive and
            visually appealing UIs.
          </li>
          <li>
            <strong>Bootstrap Icons</strong> – A collection of modern icons to complement
            Bootstrap-based UI elements.
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: 'About - JSON vEdit',
  ogTitle: 'About - JSON vEdit',
  twitterTitle: 'About - JSON vEdit'
})
</script>
