import { table, getMinifiedRecord } from "./utils/Airtable"

export default async (req, res) => {
  const { id, fields } = req.body

  try {
    // update data
    const updatedRecords = await table.update([{ id, fields }])

    //Display result
    res.statusCode = 200
    res.json(getMinifiedRecord(updatedRecords[0]))
  } catch (err) {
    //display err msg
    res.statusCode = 500
    res.json({ error: err.message })
  }
}
