<template>
  <div class="wf hero px-4" data-bs-theme="dark">
    <div class="container">
      <div class="row min-vh-100 align-items-center">
        <div class="col-12 text-center">
          <img class="img" src="/logo.svg" loading="lazy" alt="JSON-vEdit Logo" />
          <h1 class="display-4 fw-bold mb-4">JSON vEdit</h1>
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
  <div id="features">
    <div class="container px-4 py-5">
      <h2 class="pb-2 border-bottom">Features</h2>
      <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div class="feature col">
          <div class="icon">
            <span class="bi bi-speedometer"></span>
          </div>
          <h3 class="fs-2 text-body-emphasis">Lightning Fast</h3>
          <p>
            JSON Visual Edit has pre-optimized high performance, fast loading and neglectable
            storage making it lightning fast and storage independent choice.
          </p>
        </div>
        <div class="feature col">
          <div class="icon">
            <span class="bi bi-box"></span>
          </div>
          <h3 class="fs-2 text-body-emphasis">Minimal UI</h3>
          <p>
            JSON vEdit provides Minimal and user friendly UI. Whether you are a pro or just getting
            started, you can easily start using JSON vEdit
          </p>
        </div>
        <div class="feature col">
          <div class="icon">
            <span class="bi bi-code-slash"></span>
          </div>
          <h3 class="fs-2 text-body-emphasis">Bracket Free</h3>
          <p>
            Using JSON vEdit, you no longer will have to struggle with brackets and commas. The will
            make your work totally bracket free.
          </p>
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
.icon {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bs-primary);
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
  height: 4rem;
  width: 4rem;
  font-size: 2rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
}
</style>
