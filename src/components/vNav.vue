<template>
  <header class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fs-4" to="/">
        <img src="/logo.svg" class="mb-1" width="24" alt="JsonEditor Logo" />
        Json vEdit
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li>
            <RouterLink class="nav-link px-2 fs-5" :class="{ active: route.path === '/' }" to="/">
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="nav-link px-2 fs-5"
              :class="{ active: route.path === '/editor' }"
              to="/editor"
            >
              Editor
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="nav-link px-2 fs-5"
              :class="{ active: route.path === '/about' }"
              to="/about"
            >
              About
            </RouterLink>
          </li>
        </ul>
        <div class="text-end">
          <button type="button" class="btn" @click="dark">
            <i class="bi bi-moon-fill"></i>
          </button>
          <a
            href="https://github.com/MFM-347/Json-VisualEdit"
            target="_blank"
            rel="noopener noreferrer"
            class="btn"
          >
            <i class="bi bi-github"></i>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const dark = () => {
  const html = document.documentElement
  if (html.getAttribute('data-bs-theme') === 'dark') {
    html.removeAttribute('data-bs-theme')
  } else {
    html.setAttribute('data-bs-theme', 'dark')
  }
}
</script>
