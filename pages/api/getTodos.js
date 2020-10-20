import { table, minifyRecords } from "./utils/Airtable"

export default async (req, res) => {
  try {
    // Get data
    const records = await table.select({}).firstPage()

    // Simplified data
    const minifiedRecords = minifyRecords(records)

    //Display result
    res.statusCode = 200
    res.json(minifiedRecords)
  } catch (err) {
    //display err msg
    res.statusCode = 500
    res.json({ error: err.message })
  }
}
