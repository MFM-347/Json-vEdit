<template>
  <div class="px-4 py-5">
    <div class="my-5 text-center">
      <img class="d-block mx-auto mb-4" src="/logo.svg" alt="" width="75" />
      <h1 class="display-5 fw-bold text-body-emphasis">JSON VisualEdit</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Effortlessly manage and edit your JSON data with our powerful visualization tool. Upload,
          explore, and modify JSON in real time with interactive views. Now with new
          <b>CSV support</b> for enhanced flexibility. Export seamlessly—all in one place. Perfect
          for developers and analysts.
        </p>
        <div class="d-grid d-sm-flex justify-content-sm-center">
          <RouterLink to="/editor" class="btn btn-primary btn-lg px-4 gap-3">
            Launch App
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
