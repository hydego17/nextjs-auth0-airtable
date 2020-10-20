import { table, getMinifiedRecord } from "./utils/Airtable"

export default async (req, res) => {
  const { id } = req.body

  try {
    // update data
    const deletedRecords = await table.destroy([id])

    //Display result
    res.statusCode = 200
    res.json({ msg: "Delete Successful" })
  } catch (err) {
    //display err msg
    res.statusCode = 500
    res.json({ error: err.message })
  }
}
