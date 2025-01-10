<template>
  <div
    class="container mx-auto my-4 md:my-8 py-4 md:p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-md bg-zinc-200 dark:bg-zinc-800"
  >
    <div class="mb-6">
      <label class="text-lg my-2" for="json">JSON Input</label>
      <textarea
        id="json"
        v-model="json"
        class="inp border h-40 w-full resize-none"
        placeholder="Enter JSON data here..."
      ></textarea>
    </div>
    <h4 class="border-y-2 py-2 text-3xl font-bold text-center my-4">OR</h4>
    <div class="mb-6">
      <label class="text-lg my-2" for="upload">Upload JSON File</label>
      <input id="upload" type="file" @change="upload" class="inp border" />
    </div>
    <h3 class="text-4xl font-semibold">Visualize and Edit</h3>
    <div v-if="parsed.length" class="border rounded-lg">
      <table class="min-w-full">
        <thead>
          <tr>
            <th v-for="(value, key) in parsed[0]" :key="key">
              {{ key }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in parsed"
            :key="index"
            class="bg-zinc-200 dark:bg-zinc-800"
          >
            <td v-for="(value, key) in item" :key="key">
              <input v-model="item[key]" class="inp w-full" />
            </td>
            <td class="text-center">
              <button
                @click="delItem(index)"
                class="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-6 flex space-x-4">
      <button
        @click="addItem"
        class="bg-blue-500 px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Add New
      </button>
      <button
        @click="export"
        class="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
      >
        Export
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json: "",
      parsed: [],
    };
  },
  methods: {
    parseJsonData() {
      try {
        this.parsed = JSON.parse(this.json);
        if (Array.isArray(this.parsed) && this.parsed.length > 0) {
          this.ensureValidDataStructure();
        }
      } catch (e) {
        console.error("Invalid JSON");
      }
    },
    ensureValidDataStructure() {
      const keys = Object.keys(this.parsed[0]);
      this.parsed.forEach((item) => {
        keys.forEach((key) => {
          if (!(key in item)) {
            this.$set(item, key, "");
          }
        });
      });
    },
    upload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.json = reader.result;
        this.parseJsonData();
      };
      reader.readAsText(file);
    },
    addItem() {
      const newRow = {};
      Object.keys(this.parsed[0]).forEach((key) => {
        newRow[key] = "";
      });
      this.parsed.push(newRow);
    },
    delItem(index) {
      this.parsed.splice(index, 1);
    },
    export() {
      const blob = new Blob([JSON.stringify(this.parsed, null, 2)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data.json";
      link.click();
    },
  },
  watch: {
    json: "parseJsonData",
  },
};
</script>
