const Airtable = require("airtable")
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
)

const table = base(process.env.AIRTABLE_TABLE_NAME)

// Simplified the records view

const minifyRecords = (records) => {
  return records.map((record) => {
    return getMinifiedRecord(record)
  })
}

const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false
  }

  return {
    id: record.id,
    fields: record.fields,
  }
}

export { table, minifyRecords, getMinifiedRecord }
