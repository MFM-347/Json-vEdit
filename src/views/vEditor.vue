<template>
  <div class="card p-4 shadow-lg rounded">
    <div class="mb-3">
      <label class="form-label fw-semibold" for="jsonInput">JSON Input</label>
      <textarea
        id="jsonInput"
        v-model="json"
        class="form-control"
        placeholder="Enter JSON data here..."
        rows="5"
      ></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label fw-semibold" for="fileUpload">Upload JSON/CSV File</label>
      <input id="fileUpload" type="file" @change="onFileUpload" class="form-control" />
    </div>

    <div v-if="hasError" class="alert alert-danger mt-3" role="alert">
      Invalid JSON/CSV format. Please check your input.
    </div>

    <h3 class="text-center fw-bold my-4">Visualize and Edit</h3>
    <div v-if="parsedData.length" class="table-responsive">
      <table class="table table-hover table-bordered align-middle">
        <thead class="table-light">
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
              <input v-model="item[key]" class="form-control" type="text" />
            </td>
            <td class="text-center">
              <button @click="deleteItem(index)" class="btn btn-danger btn-sm" title="Delete Item">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center mt-4">
      <p class="text-muted">No data available. Enter JSON/CSV or upload a file to begin.</p>
    </div>

    <div class="mt-4 flex flex-wrap justify-center">
      <button @click="addItem" class="btn btn-primary mx-2">
        <i class="bi bi-plus-circle"></i> Add New Item
      </button>
      <button @click="exportJSON" class="btn btn-success mx-2 text-white">
        <i class="bi bi-download"></i> Export JSON
      </button>
      <button @click="exportCSV" class="btn btn-warning mx-2">
        <i class="bi bi-download"></i> Export CSV
      </button>
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
  const keys = Object.keys(parsedData.value[0])
  parsedData.value.forEach((item) => {
    keys.forEach((key) => {
      if (!(key in item)) item[key] = ''
    })
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
.table thead th {
  vertical-align: middle;
}
</style>
