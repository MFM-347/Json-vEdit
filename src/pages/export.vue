<script setup lang="ts">
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

useSeoMeta({
  title: 'Viewer / Export – JSON vEdit',
  description:
    'Preview JSON or CSV files directly in your browser and export as JSON, CSV, or PDF with JSON vEdit.',
  ogTitle: 'Viewer / Export – JSON vEdit',
  ogDescription:
    'Preview JSON or CSV files directly in your browser and export as JSON, CSV, or PDF with JSON vEdit.',
  twitterTitle: 'Viewer / Export – JSON vEdit',
  twitterDescription:
    'Preview JSON or CSV files directly in your browser and export as JSON, CSV, or PDF with JSON vEdit.',
})

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
  URL.revokeObjectURL(url)
}

const exportCSV = () => {
  if (!parsedData.value.length) return
  const headers = Object.keys(parsedData.value[0])
  const escape = (val: string) => `"${String(val).replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
  const rows = parsedData.value.map((r) => headers.map((h) => escape(r[h] ?? '')).join(','))
  const csv = headers.map(escape).join(',') + '\n' + rows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = Object.assign(document.createElement('a'), {
    href: url,
    download: 'data.csv',
  })
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

const exportPDF = () => {
  if (!parsedData.value.length) return

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  const headers = [Object.keys(parsedData.value[0])]
  const body = parsedData.value.map((r) => Object.values(r))

  doc.setFillColor(244, 244, 246)
  doc.setTextColor(9, 9, 11)

  autoTable(doc, {
    head: headers,
    body,
    startY: 36,
    styles: {
      fontSize: 12,
      cellPadding: 6,
      fillColor: [244, 244, 246],
      textColor: [9, 9, 11],
      halign: 'center',
      valign: 'middle',
      lineWidth: 1,
      lineColor: [90, 90, 110],
    },
    alternateRowStyles: { fillColor: [244, 244, 246], textColor: [9, 9, 11] },
    headStyles: {
      fillColor: [233, 233, 237],
      textColor: [9, 9, 11],
      halign: 'center',
      valign: 'middle',
    },
    margin: { top: 36, bottom: 36, left: 32, right: 32 },
  })

  const totalPages = doc.getNumberOfPages()

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text(`page ${i} of ${totalPages}`, pageWidth - 100, pageHeight - 24)

    doc.setFontSize(11)
    const text = 'Created by JSON vEdit'
    const linkWidth = doc.getTextWidth(text)
    const linkX = (pageWidth - linkWidth) / 2
    doc.textWithLink(text, linkX, pageHeight - 24, { url: 'https://json-v-edit.vercel.app/' })
    doc.setTextColor(9, 9, 11)
  }

  doc.save('data.pdf')
}

watch(json, parseJSON)
</script>

<template>
  <section class="container py-16 flex flex-col gap-6 min-h-screen justify-center">
    <h1 class="title my-4 text-center">Viewer / Export</h1>

    <div class="mx-auto p-6 text-center border rounded-xl max-w-xl shadow-sm md:max-w-4xl">
      <label class="font-medium mb-3 block" for="fileUpload">Upload a JSON/CSV File</label>
      <input
        id="fileUpload"
        class="sr-only"
        type="file"
        accept=".json,.csv"
        @change="onFileUpload"
      />
      <label class="btn btn-primary" for="fileUpload">
        <UilUpload class="mr-1" />
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
      <h2 class="sub-title mb-4">Preview Data</h2>
      <div
        class="mx-auto bg-background-subtle flex flex-row gap-1 w-fit top-0 sticky z-10 backdrop-blur-sm"
      >
        <button class="btn btn-ghost" aria-label="Export data as JSON" @click="exportJSON">
          <UilDownloadAlt class="mr-1" /> Download JSON
        </button>
        <button class="btn btn-ghost" aria-label="Export data as CSV" @click="exportCSV">
          <UilDownloadAlt class="mr-1" /> Download CSV
        </button>
        <button class="btn btn-ghost" aria-label="Export data as PDF" @click="exportPDF">
          <UilFileAlt class="mr-1" /> Download PDF
        </button>
      </div>

      <div class="mt-4 max-h-[70vh] overflow-auto">
        <table class="text-sm w-full border-collapse table-auto sm:text-base">
          <thead class="bg-muted/40">
            <tr>
              <th
                v-for="(v, k) in parsedData[0]"
                :key="k"
                class="font-semibold px-4 py-3 text-center border min-w-[8rem] whitespace-nowrap"
              >
                {{ k }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in parsedData" :key="i" class="hover:bg-accent/20">
              <td v-for="(val, k) in row" :key="k" class="px-3 py-2 border break-words">
                {{ val }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div v-else class="text-muted-foreground py-8 text-center flex flex-col gap-2 items-center">
      <UilFolderTimes class="size-24" />
      <p>No data available. Upload a JSON/CSV file to preview and export.</p>
    </div>
  </section>
</template>

<style scoped>
.btn {
  cursor: pointer;
}
</style>
