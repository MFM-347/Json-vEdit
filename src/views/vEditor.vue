<template>
  <div class="card p-4 shadow-lg rounded">
    <div class="mb-3">
      <label class="form-label fw-semibold" for="json">JSON Input</label>
      <textarea
        id="json"
        v-model="json"
        class="form-control"
        placeholder="Enter JSON data here..."
        rows="5"
      ></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label fw-semibold" for="upload"
        >Upload JSON File</label
      >
      <input id="upload" type="file" @change="upload" class="form-control" />
    </div>

    <div v-if="error" class="alert alert-danger mt-3" role="alert">
      Invalid JSON format. Please check your input.
    </div>

    <h3 class="text-center fw-bold my-4">Visualize and Edit</h3>
    <div v-if="parsed.length" class="table-responsive">
      <table class="table table-hover table-bordered align-middle">
        <thead class="table-light">
          <tr>
            <th
              v-for="(value, key) in parsed[0]"
              :key="key"
              class="text-center"
            >
              {{ key }}
            </th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in parsed" :key="index">
            <td v-for="(value, key) in item" :key="key">
              <input v-model="item[key]" class="form-control" type="text" />
            </td>
            <td class="text-center">
              <button
                @click="delItem(index)"
                class="btn btn-danger btn-sm"
                title="Delete Item"
              >
                <i class="bi bi-trash3-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center mt-4">
      <p class="text-muted">
        No data available. Enter JSON or upload a file to begin.
      </p>
    </div>

    <div class="mt-4 flex flex-wrap justify-center gap-3">
      <button @click="addItem" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Add New Item
      </button>
      <button @click="exportData" class="btn btn-success text-white">
        <i class="bi bi-download"></i> Export JSON
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const json = ref("");
const parsed = ref([]);
const error = ref(false);

const parseJsonData = () => {
  try {
    parsed.value = JSON.parse(json.value);
    error.value = false;
    if (Array.isArray(parsed.value) && parsed.value.length > 0) {
      ensureValidDataStructure();
    }
  } catch (e) {
    error.value = true;
  }
};

const ensureValidDataStructure = () => {
  const keys = Object.keys(parsed.value[0]);
  parsed.value.forEach((item) => {
    keys.forEach((key) => {
      if (!(key in item)) {
        item[key] = "";
      }
    });
  });
};

const upload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    json.value = reader.result;
    parseJsonData();
  };
  reader.readAsText(file);
};

const addItem = () => {
  const newItem = {};
  if (parsed.value.length) {
    Object.keys(parsed.value[0]).forEach((key) => {
      newItem[key] = "";
    });
  }
  parsed.value.push(newItem);
};

const delItem = (index) => {
  parsed.value.splice(index, 1);
};

const exportData = () => {
  const blob = new Blob([JSON.stringify(parsed.value, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";
  link.click();
  alert("JSON file exported successfully!");
};

watch(json, parseJsonData);
</script>

<style scoped>
.table thead th {
  vertical-align: middle;
}
</style>
