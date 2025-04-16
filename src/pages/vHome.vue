<template>
  <section id="hero" class="wf hero px-4">
    <div class="container">
      <div class="row min-vh-100 align-items-center">
        <div class="col-12 text-center">
          <img class="img" src="/logo.svg" loading="lazy" alt="Logo for JSON vEdit application" />
          <h1 class="display-4 fw-bold mb-4">JSON vEdit</h1>
          <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">
              Effortlessly manage and edit your JSON data with our powerful visualization tool.
              Upload, explore, and modify JSON in real time with interactive views. Now with new
              <span class="badge bg-primary">CSV support</span> for enhanced flexibility. Export
              seamlessly—all in one place. Perfect for developers and analysts.
            </p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <RouterLink
                to="/editor"
                class="btn btn-primary btn-lg px-4 gap-3"
                role="button"
                aria-label="Launch JSON vEdit App"
              >
                Launch App
                <i class="bi bi-arrow-right ms-2"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="features">
    <div class="container px-4 py-5">
      <h2 class="pb-2 border-bottom">Features</h2>
      <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <section class="feature col" aria-labelledby="feature-speed">
          <div class="icon">
            <span class="bi bi-speedometer"></span>
          </div>
          <h3 id="feature-speed" class="fs-2 text-body-emphasis">Lightning Fast</h3>
          <p>
            JSON vEdit is optimized for high performance with fast loading times and minimal memory
            usage, making it a lightweight and efficient tool for any workflow.
          </p>
        </section>
        <section class="feature col" aria-labelledby="feature-ui">
          <div class="icon">
            <span class="bi bi-box"></span>
          </div>
          <h3 id="feature-ui" class="fs-2 text-body-emphasis">Minimal UI</h3>
          <p>
            A minimal, user-friendly interface makes JSON vEdit easy to use for both experienced
            developers and newcomers.
          </p>
        </section>
        <section class="feature col" aria-labelledby="feature-bracket-free">
          <div class="icon">
            <span class="bi bi-code-slash"></span>
          </div>
          <h3 id="feature-bracket-free" class="fs-2 text-body-emphasis">Bracket Free</h3>
          <p>
            Say goodbye to brackets and commas—JSON vEdit handles the structure for you so you can
            focus on your data.
          </p>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'JSON vEdit - Free Online JSON Editor',
  meta: [{ property: 'og:title', content: 'JSON vEdit - Free Online JSON Editor' }],
})
</script>

<style scoped>
.hero {
  background: var(--bs-body-tertiary);
  transition: all 250ms ease;
}
.img {
  margin: 0 auto 1rem auto;
  width: 100px;
  display: block;
}
.btn-primary {
  background: linear-gradient(120deg, #2563eb, #4f46e5);
  border: none;
  transition: all 300ms ease;
}
.btn-primary:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  transform: translateY(-2px);
}
.icon {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;
  margin-bottom: 1rem;
  width: 4rem;
  height: 4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background-image: linear-gradient(
    45deg,
    rgba(127.5, 127.5, 127.5, 0.25),
    rgba(127.5, 127.5, 127.5, 0.05)
  );
  border-radius: 0.75rem;
}
</style>
