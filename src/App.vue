<template>
  <div>
    <a class="stm text-accent-foreground rounded-lg bg-accent shadow-sm" href="#main" tabindex="0"
      >Skip to content</a
    >
    <VNav />
    <main id="main" role="main">
      <routerView />
    </main>
  </div>
</template>

<style scoped>
/* skipToContent */
.stm {
  position: absolute;
  margin: -1px;
  border-width: 0;
  padding: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.stm:focus-visible {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 10;
  padding: 0.5rem 1rem;
  width: auto;
  height: auto;
  clip: auto;
}
</style>
