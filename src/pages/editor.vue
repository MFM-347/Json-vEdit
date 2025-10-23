<script setup lang="ts">
useSeoMeta({
  title: 'JSON vEdit – Online JSON & CSV Editor',
  description:
    'Edit, add, and export JSON or CSV data directly in your browser with JSON vEdit. Upload files, modify cells, and export with one click.',
  ogTitle: 'JSON vEdit – Fast JSON/CSV Editor',
  ogDescription:
    'A lightweight web editor for editing, adding, and exporting JSON or CSV files instantly.',
  twitterTitle: 'JSON vEdit',
  twitterDescription: 'Upload and edit JSON/CSV in your browser and export in seconds.',
})

const addItem = () => {
  if (!parsedData.value.length) return
  const newItem: DataRow = {}
  Object.keys(parsedData.value[0]).forEach((k) => (newItem[k] = ''))
  parsedData.value.push(newItem)
}

const confirmDelete = (i: number) => {
  if (confirm('Delete this row permanently?')) {
    parsedData.value.splice(i, 1)
  }
}

const resetDocument = () => {
  if (!parsedData.value.length) return
  if (!confirm('Reset document to a single empty row?')) return
  const emptyRow: DataRow = {}
  Object.keys(parsedData.value[0]).forEach((k) => (emptyRow[k] = ''))
  parsedData.value = [emptyRow]
}

const exportJSON = () => {
  if (!parsedData.value.length) return
  const blob = new Blob([JSON.stringify(parsedData.value, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = Object.assign(document.createElement('a'), {
    href: url,
    download: 'data.json',
  })
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

watch(json, parseJSON)
</script>

<template>
  <section class="container py-16 flex flex-col gap-6 min-h-screen justify-center">
    <h1 class="title my-4 text-center">Editor</h1>
    <div class="mx-auto p-6 text-center border rounded-xl max-w-xl shadow-sm md:max-w-4xl">
      <label class="font-medium mb-3 block" for="fileUpload"> Upload a JSON/CSV File </label>
      <input
        id="fileUpload"
        class="sr-only"
        type="file"
        accept=".json,.csv"
        @change="onFileUpload"
      />
      <label class="btn btn-primary" for="fileUpload">
        <UilUpload />
        Choose File
      </label>
      <p id="fileHelp" class="text-sm text-muted-foreground mt-2">
        Supported formats: <code>.json</code>, <code>.csv</code>
      </p>
    </div>
    <div
      v-if="hasError"
      class="text-red-950 mb-6 px-4 py-2 text-center rounded-md bg-red-200"
      role="alert"
    >
      Invalid JSON/CSV format or structure. Please check your file.
    </div>
    <section v-if="parsedData.length" class="relative">
      <h2 class="sub-title mb-4">Edit Data</h2>

      <div
        class="mx-auto bg-background-subtle flex flex-row gap-1 w-fit top-0 sticky z-10 backdrop-blur-sm"
      >
        <button class="btn btn-ghost" aria-label="Add a new row" @click="addItem">
          <UilPlus /> Add New Row
        </button>
        <button
          class="btn btn-ghost"
          aria-label="Reset document to empty rows"
          @click="resetDocument"
        >
          <UilRefresh class="mr-1" /> Reset Doc
        </button>
        <button class="btn btn-ghost" aria-label="Export data as JSON" @click="exportJSON">
          <UilDownloadAlt class="mr-1" /> Export JSON
        </button>
      </div>
      <div class="mt-4 max-h-[70vh] overflow-auto">
        <table class="text-sm w-full border-collapse table-auto sm:text-base" role="table">
          <thead class="bg-accent/60">
            <tr>
              <th
                v-for="(v, k) in parsedData[0]"
                :key="k"
                class="font-semibold px-4 py-3 text-center border min-w-[8rem] whitespace-nowrap"
                scope="col"
              >
                {{ k }}
              </th>
              <th
                class="font-semibold px-4 py-3 text-center border min-w-[6rem] whitespace-nowrap"
                scope="col"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in parsedData" :key="i" class="hover:bg-accent/20">
              <td
                v-for="(v, k) in item"
                :key="k"
                class="px-3 py-2 align-middle border min-w-[8rem] break-words"
              >
                <input
                  v-model="item[k]"
                  class="input text-sm h-9 w-full sm:text-base"
                  type="text"
                  :aria-label="`Edit ${k} for row ${i + 1}`"
                />
              </td>
              <td class="px-3 py-2 text-center border">
                <button
                  class="btn btn-destructive"
                  :aria-label="`Delete row ${i + 1}`"
                  @click="confirmDelete(i)"
                >
                  <UilTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div v-else class="text-muted-foreground py-8 text-center flex flex-col gap-2 items-center">
      <UilFolderTimes class="size-24" />
      <p>No data available. Upload a JSON/CSV file to begin.</p>
    </div>
  </section>
</template>

<style scoped>
.btn {
  cursor: pointer;
}
</style>
