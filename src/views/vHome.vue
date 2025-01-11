<template>
  <div class="px-4 py-5">
    <div class="my-5 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="/logo.svg"
        alt=""
        width="72"
        height="57"
      />
      <h1 class="display-5 fw-bold text-body-emphasis">JSON VisualEdit</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Effortlessly manage your JSON data list with our intuitive
          visualization and editing tool. Upload your JSON files, explore their
          structure with interactive views, make real-time edits, and export
          your data seamlessly—all in one place. Perfect for developers,
          analysts, and anyone working with JSON. Ready to simplify your
          workflow? Click below to launch the app and get started!
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <RouterLink to="/editor" class="btn btn-primary btn-lg px-4 gap-3">
            Launch App
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
