import { table } from "./utils/Airtable"

export default async (req, res) => {
  const { description } = req.body

  try {
    // create data
    const createdRecords = await table.create([{ fields: { description } }])

    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    }

    //Display result
    res.statusCode = 200
    res.json(createdRecord)
  } catch (err) {
    //display err msg
    res.statusCode = 500
    res.json({ error: err.message })
  }
}
