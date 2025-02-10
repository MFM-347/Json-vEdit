<template>
  <div class="hero px-4" data-bs-theme="dark">
    <div class="container">
      <div class="row min-vh-100 align-items-center">
        <div class="col-12 text-center">
          <img class="img" src="/logo.svg" alt="JSON-VisualEdit Logo" />
          <h1 class="display-4 fw-bold mb-4">JSON VisualEdit</h1>
          <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">
              Effortlessly manage and edit your JSON data with our powerful visualization tool.
              Upload, explore, and modify JSON in real time with interactive views. Now with new
              <span class="badge bg-primary">CSV support</span> for enhanced flexibility. Export
              seamlessly—all in one place. Perfect for developers and analysts.
            </p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <RouterLink to="/editor" class="btn btn-primary btn-lg px-4 gap-3">
                Launch App
                <i class="bi bi-arrow-right ms-2"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background: var(--bs-body-tertiary);
  transition: all 250ms ease;
}

.img {
  width: 100px;
  display: block;
  margin: 0 auto 1rem auto;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.btn-primary {
  background: linear-gradient(120deg, #2563eb, #4f46e5);
  border: none;
  transition: all 300ms ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}
</style>
