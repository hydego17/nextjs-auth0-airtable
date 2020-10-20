import { table, getMinifiedRecord } from "./utils/Airtable"
import auth0 from "./utils/auth0"
import OwnsRecord from "./middleware/OwnsRecord"

export default OwnsRecord(async (req, res) => {
  const { id } = req.body
  const { user } = await auth0.getSession(req)

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
})
