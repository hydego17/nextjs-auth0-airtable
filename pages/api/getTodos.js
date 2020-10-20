import { table, minifyRecords } from "./utils/Airtable"
import auth0 from "./utils/auth0"

export default auth0.requireAuthentication(async (req, res) => {
  const { user } = await auth0.getSession()
  try {
    // Get data
    const records = await table
      .select({ filterByFormula: `userId = '${user.sub}'` })
      .firstPage()

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
})
