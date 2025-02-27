<template>
  <div class="wf p-3 p-md-4" data-bs-theme="dark">
    <div class="container">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="mb-4">
            <label class="form-label fw-medium h6" for="jsonInput">JSON Input</label>
            <textarea
              id="jsonInput"
              v-model="json"
              class="form-control"
              placeholder="Enter JSON data here..."
              rows="5"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="form-label fw-medium h6" for="fileUpload">Upload JSON/CSV File</label>
            <input id="fileUpload" type="file" @change="onFileUpload" class="form-control" />
          </div>

          <div v-if="hasError" class="alert alert-danger d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            Invalid JSON/CSV format. Please check your input.
          </div>

          <h3 class="text-center fw-semibold mb-4">Visualize and Edit</h3>

          <div v-if="parsedData.length" class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th v-for="(value, key) in parsedData[0]" :key="key" class="text-center">
                    {{ key }}
                  </th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in parsedData" :key="index">
                  <td v-for="(value, key) in item" :key="key">
                    <input v-model="item[key]" class="form-control form-control-sm" type="text" />
                  </td>
                  <td class="text-center">
                    <button @click="deleteItem(index)" class="btn btn-danger btn-sm">
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-5">
            <i class="bi bi-file-earmark-text display-1 mb-3"></i>
            <p class="text-muted">No data available. Enter JSON/CSV or upload a file to begin.</p>
          </div>

          <div class="mt-4 d-flex flex-wrap justify-content-center gap-3">
            <button @click="addItem" class="btn btn-primary">
              <i class="bi bi-plus-circle me-2"></i> Add New Item
            </button>
            <button @click="exportJSON" class="btn btn-success">
              <i class="bi bi-download me-2"></i> Export JSON
            </button>
            <button @click="exportCSV" class="btn btn-warning">
              <i class="bi bi-download me-2"></i> Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const json = ref('')
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
  if (!Array.isArray(parsedData.value) || !parsedData.value.length) return
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

const deleteItem = (index) => {
  parsedData.value.splice(index, 1)
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
