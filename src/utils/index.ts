import { ref } from 'vue'

export type DataRow = Record<string, string>

export const json = ref('')
export const parsedData = ref<DataRow[]>([])
export const hasError = ref(false)

function populateEmptyFields(rows: DataRow[]): DataRow[] {
  const keys = new Set<string>()
  rows.forEach((r) => Object.keys(r).forEach((k) => keys.add(k)))

  return rows.map((r) => {
    const out: DataRow = {}
    keys.forEach((k) => (out[k] = r[k] ?? ''))
    return out
  })
}

function isValidDataArray(data: unknown): data is DataRow[] {
  return (
    Array.isArray(data) &&
    data.every(
      (row) =>
        row &&
        typeof row === 'object' &&
        !Array.isArray(row) &&
        Object.values(row).every(
          (v) => typeof v === 'string' || typeof v === 'number' || v === null,
        ),
    )
  )
}

export const parseJSON = () => {
  try {
    const parsed = JSON.parse(json.value)
    if (!isValidDataArray(parsed)) throw new Error('Invalid structure')
    parsedData.value = populateEmptyFields(
      parsed.map((r) =>
        Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v == null ? '' : String(v)])),
      ),
    )
    hasError.value = false
  } catch {
    parsedData.value = []
    hasError.value = true
  }
}

function parseCsvLines(csv: string): string[][] {
  const rows: string[][] = []
  let cur = ''
  let inQuotes = false
  let row: string[] = []
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i]
    if (c === '"') {
      if (inQuotes && csv[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (c === ',' && !inQuotes) {
      row.push(cur)
      cur = ''
    } else if ((c === '\n' || c === '\r') && !inQuotes) {
      if (cur || row.length) {
        row.push(cur)
        rows.push(row)
        row = []
        cur = ''
      }
      if (c === '\r' && csv[i + 1] === '\n') i++
    } else {
      cur += c
    }
  }
  if (cur || row.length) {
    row.push(cur)
    rows.push(row)
  }
  return rows
}

export const parseCSV = (csv: string) => {
  try {
    const lines = parseCsvLines(csv.trim())
    if (!lines.length) throw new Error('Empty CSV')
    const headers = lines[0]
    if (!headers.length) throw new Error('Missing headers')

    const rows: DataRow[] = lines.slice(1).map((cols) => {
      const obj: DataRow = {}
      headers.forEach((h, i) => {
        obj[h] = cols[i] !== undefined ? cols[i] : ''
      })
      return obj
    })

    parsedData.value = populateEmptyFields(rows)
    hasError.value = false
  } catch {
    parsedData.value = []
    hasError.value = true
  }
}

export const onFileUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const content = (reader.result as string) || ''
    try {
      if (file.name.toLowerCase().endsWith('.csv')) {
        parseCSV(content)
      } else {
        json.value = content
        parseJSON()
      }
    } finally {
      ;(e.target as HTMLInputElement).value = ''
    }
  }
  reader.readAsText(file)
}
