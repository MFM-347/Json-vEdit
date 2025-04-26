<template>
  <section class="wf p-3 p-md-4">
    <div class="container">
      <div class="card shadow-lg">
        <div class="card-body">
          <section class="mb-4">
            <label class="form-label fw-medium h6" for="fileUpload">Upload JSON/CSV File</label>
            <input
              id="fileUpload"
              type="file"
              accept=".json, .csv"
              @change="onFileUpload"
              class="form-control"
              aria-describedby="fileHelp"
            />
            <div id="fileHelp" class="form-text">Supported formats: .json, .csv</div>
            <div v-if="fileName" class="mt-2 text-muted small">Selected file: {{ fileName }}</div>
          </section>
          <div v-if="hasError" class="alert alert-danger d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            Invalid JSON/CSV format. Please check your input.
          </div>
          <h3 class="text-center fw-semibold mb-4">Preview Data</h3>
          <section v-if="parsedData.length">
            <div class="table-responsive">
              <table class="table table-hover table-bordered align-middle" role="table">
                <thead class="table-light text-center">
                  <tr>
                    <th v-for="(value, key) in parsedData[0]" :key="key">
                      {{ key }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in parsedData" :key="index">
                    <td v-for="(value, key) in item" :key="key">
                      {{ value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4 d-flex flex-wrap justify-content-center gap-3">
              <button @click="exportJSON" class="btn btn-success" aria-label="Export as JSON">
                <i class="bi bi-download me-2"></i> Download as JSON
              </button>
              <button @click="exportCSV" class="btn btn-warning" aria-label="Export as CSV">
                <i class="bi bi-download me-2"></i> Download as CSV
              </button>
              <button @click="exportPDF" class="btn btn-danger" aria-label="Export as PDF">
                <i class="bi bi-file-earmark-pdf me-2"></i> Download as PDF
              </button>
            </div>
          </section>
          <div v-else class="text-center py-4">
            <i class="bi bi-file-earmark-text display-1"></i>
            <p class="text-muted mt-4">
              No data available. Upload a JSON/CSV file to preview and export.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSeoMeta } from '@unhead/vue'
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

useSeoMeta({
  title: 'Viewer/Export - JSON vEdit',
  ogTitle: 'Viewer/Export - JSON vEdit',
  twitterTitle: 'Viewer/Export - JSON vEdit',
})

const fileName = ref('')
const json = ref('')
const parsedData = ref([])
const hasError = ref(false)

const parseJSON = () => {
  try {
    parsedData.value = JSON.parse(json.value)
    hasError.value = false
  } catch (error) {
    hasError.value = true
  }
}

const parseCSV = (csv) => {
  try {
    const lines = csv.split('\n').filter((line) => line.trim() !== '')
    const headers = lines[0].split(',')
    parsedData.value = lines.slice(1).map((line) => {
      const values = line.split(',')
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() ?? ''
        return obj
      }, {})
    })
    hasError.value = false
  } catch (error) {
    hasError.value = true
  }
}

const onFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = () => {
    const content = reader.result
    if (file.name.endsWith('.csv')) parseCSV(content)
    else {
      json.value = content
      parseJSON()
    }
  }
  reader.readAsText(file)
}

const exportJSON = () => {
  const blob = new Blob([JSON.stringify(parsedData.value, null, 2)], {
    type: 'application/json',
  })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'data.json'
  link.click()
}

const exportCSV = () => {
  if (!parsedData.value.length) return
  const headers = Object.keys(parsedData.value[0])
  const csv = parsedData.value.map((row) => headers.map((header) => row[header]).join(','))
  csv.unshift(headers.join(','))
  const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'data.csv'
  link.click()
}

const exportPDF = () => {
  if (!parsedData.value.length) return
  const doc = new jsPDF()
  const headers = [Object.keys(parsedData.value[0])]
  const data = parsedData.value.map((row) => Object.values(row))
  doc.text('Created with JSON vEdit', 14, 20)
  autoTable(doc, {
    head: headers,
    body: data,
    startY: 30,
    theme: 'grid',
    headStyles: { fillColor: [22, 160, 133] },
  })
  doc.save('data.pdf')
}

watch(json, parseJSON)
</script>

<style scoped>
.btn {
  transition: transform 0.3s ease;
}
.btn:hover {
  transform: translateY(-2px);
}
@media (max-width: 768px) {
  .table-responsive {
    max-height: 70vh;
    overflow-y: auto;
  }
}
</style>
