<script setup lang="ts">
useSeoMeta({
  title: 'JSON vEdit - Free Online JSON Editor',
  description:
    'Visualize and edit your JSON/CSV data with our free tool. You just need to upload your JSON files, explore their structure, make changes, and export your data — all in one place.',
  ogTitle: 'JSON vEdit - Free Online JSON Editor',
  ogDescription:
    'Visualize and edit JSON or CSV data instantly in your browser. Secure, fast, and easy to use.',
  twitterTitle: 'JSON vEdit - Free Online JSON Editor',
  twitterDescription:
    'Visualize and edit JSON or CSV data instantly in your browser. Secure, fast, and easy to use.',
})

const features = [
  {
    icon: 'UilTachometerFastAlt',
    title: 'Lightning Fast',
    text: 'Optimized for performance with fast loading and minimal memory usage.',
  },
  {
    icon: 'UilBox',
    title: 'Minimal UI',
    text: 'A clean, distraction-free interface that works for pros and newcomers alike.',
  },
  {
    icon: 'UilCode',
    title: 'Bracket Free',
    text: 'Focus on your data while JSON vEdit takes care of the structure.',
  },
  {
    icon: 'UilExchange',
    title: 'CSV Ready',
    text: 'Import and export CSV seamlessly for flexible workflows.',
  },
  {
    icon: 'UilCloudUpload',
    title: 'Secure & Local',
    text: 'All editing happens in your browser—no data leaves your device.',
  },
  {
    icon: 'UilPaintTool',
    title: 'UnoCSS Powered',
    text: 'Instant styling with dark mode support out of the box.',
  },
]
</script>

<template>
  <section id="hero" class="container">
    <div class="py-12 text-center flex flex-col gap-6 min-h-screen items-center justify-center">
      <VLogo class="mb-4" :size="100" />
      <h1 class="title">JSON vEdit</h1>
      <p class="text-base leading-7 mt-4 sm:text-lg">
        Effortlessly manage and edit your JSON data with our powerful visualization tool. Upload,
        explore, and modify JSON in real time with interactive views. Now with new
        <span
          class="text-sm text-primary-foreground font-medium px-2 py-0.5 rounded-md bg-primary inline-flex items-center justify-center"
        >
          CSV support
        </span>
        for enhanced flexibility. Export seamlessly—all in one place. Perfect for developers and
        analysts.
      </p>
      <RouterLink
        class="btn-primary font-semibold mt-6 px-5 py-2.5 rounded-lg bg-primary inline-flex gap-2 transition items-center"
        to="/editor"
        role="button"
        aria-label="Launch JSON Editor"
      >
        Launch Editor
        <UilArrowRight class="text-lg" />
      </RouterLink>
    </div>
  </section>
  <section id="features" class="py-8 bg-background-subtle/40">
    <div class="container">
      <h2 class="text-3xl font-bold mb-12 text-center">Features</h2>
      <div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-2">
        <section
          v-for="(feat, i) in features"
          :key="i"
          class="p-4 text-center border rounded-xl flex flex-col gap-2 shadow-xs items-center"
        >
          <div class="rounded-lg bg-accent grid h-20 w-20 place-items-center">
            <component :is="feat.icon" class="text-primary size-12 hover:size-16" />
          </div>
          <h3 class="text-xl font-semibold">
            {{ feat.title }}
          </h3>
          <p class="max-w-sm">
            {{ feat.text }}
          </p>
        </section>
      </div>
    </div>
  </section>
  <section id="cta" class="container py-24 text-center">
    <h2 class="text-3xl font-bold mb-4">Ready to Edit Your JSON?</h2>
    <p class="mx-auto mb-8 max-w-xl">
      Start editing right now—no sign-up required. Drag and drop your JSON or CSV and watch it come
      alive.
    </p>
    <RouterLink class="btn btn-primary" to="/editor">
      Launch Editor
      <UilArrowRight class="size-5" />
    </RouterLink>
  </section>
</template>
