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

          <h3 class="text-center fw-semibold mb-4">Edit Data</h3>

          <section v-if="parsedData.length">
            <div class="table-responsive">
              <table class="table table-hover" role="table">
                <thead>
                  <tr>
                    <th
                      v-for="(value, key) in parsedData[0]"
                      :key="key"
                      class="text-center"
                      scope="col"
                    >
                      <span>{{ key }}</span>
                    </th>
                    <th class="text-center" scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in parsedData" :key="index">
                    <td v-for="(value, key) in item" :key="key">
                      <input
                        v-model="item[key]"
                        class="form-control form-control-sm"
                        type="text"
                        :aria-label="`Edit ${key} for row ${index + 1}`"
                      />
                    </td>
                    <td class="text-center">
                      <button
                        @click="confirmDelete(index)"
                        class="btn btn-danger btn-sm"
                        :aria-label="`Remove row ${index + 1}`"
                      >
                        <i class="bi bi-trash3-fill"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4 d-flex flex-wrap justify-content-center gap-3">
              <button @click="addItem" class="btn btn-primary" aria-label="Add new row">
                <i class="bi bi-plus-circle me-2"></i> Add New Row
              </button>
              <button @click="exportJSON" class="btn btn-success" aria-label="Export as JSON">
                <i class="bi bi-download me-2"></i> Export as JSON
              </button>
              <button @click="exportCSV" class="btn btn-warning" aria-label="Export as CSV">
                <i class="bi bi-download me-2"></i> Export as CSV
              </button>
            </div>
          </section>

          <div v-else class="text-center py-4">
            <i class="bi bi-file-earmark-text display-1"></i>
            <p class="text-muted mt-4">
              No data available. Enter JSON/CSV or upload a file to begin.
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

useSeoMeta({
  title: 'Editor - JSON vEdit',
  ogTitle: 'Editor - JSON vEdit',
  twitterTitle: 'Editor - JSON vEdit',
})

const json = ref('')
const fileName = ref('')
const parsedData = ref([])
const hasError = ref(false)

const parseJSON = () => {
  try {
    parsedData.value = JSON.parse(json.value)
    hasError.value = false
    if (Array.isArray(parsedData.value) && parsedData.value.length > 0) populateEmptyFields()
  } catch (error) {
    hasError.value = true
  }
}

const populateEmptyFields = () => {
  const keys = new Set()
  parsedData.value.forEach((item) => {
    Object.keys(item).forEach((key) => keys.add(key))
  })
  parsedData.value = parsedData.value.map((item) => {
    let updatedItem = {}
    keys.forEach((key) => {
      updatedItem[key] = item[key] !== undefined ? item[key] : ''
    })
    return updatedItem
  })
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

const parseCSV = (csv) => {
  const lines = csv
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line)
  const headers = lines[0].split(',')
  parsedData.value = lines.slice(1).map((line) => {
    const values = line.split(',')
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || ''
      return obj
    }, {})
  })
  hasError.value = false
}

const addItem = () => {
  const newItem = {}
  if (parsedData.value.length) {
    Object.keys(parsedData.value[0]).forEach((key) => {
      newItem[key] = ''
    })
  }
  parsedData.value.push(newItem)
}

const confirmDelete = (index) => {
  if (confirm('Are you sure you want to delete this row?')) {
    parsedData.value.splice(index, 1)
  }
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
