import { table } from "./utils/Airtable"
import auth0 from "./utils/auth0"

export default auth0.requireAuthentication(async (req, res) => {
  const { user } = await auth0.getSession(req)
  const { description } = req.body

  try {
    // create data
    const createdRecords = await table.create([
      { fields: { description, userId: user.sub } },
    ])

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
})
