import { table, getMinifiedRecord } from "./utils/Airtable"
import auth0 from "./utils/auth0"

export default auth0.requireAuthentication(async (req, res) => {
  const { id, fields } = req.body
  const { user } = await auth0.getSession(req)

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
})
