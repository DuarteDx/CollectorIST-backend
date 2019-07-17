import { Mongo } from 'porg'

export default async (params) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + 'GET -> Search assets')
  console.log(params)
  console.log('\n')

  // Convert strings into objects
  const ObjectIdentification = JSON.parse(params.objectIdentification)
  const ObjectDescription = JSON.parse(params.objectDescription)
  const ObjectLocation = JSON.parse(params.objectLocation)
  const ObjectHistory = JSON.parse(params.objectHistory)

  // Build MongoDB query
  var query = {}

  // Add params to query if they are not null
  if (ObjectIdentification.title) {
    query['ObjectIdentification.title'] = { $regex: ObjectIdentification.title, $options: 'i' }
  }
  if (ObjectIdentification.optionalId) {
    query['ObjectIdentification.optionalId'] = ObjectIdentification.optionalId
  }
  if (ObjectDescription.category) {
    query['ObjectDescription.category'] = ObjectDescription.category
  }

  // Fetch data from DB
  const db = await Mongo.getDB()
  const categories = await db.collection('assets').find({ ...query }).toArray()
  console.log(categories)
  if (!categories) {
    return 'No assets match the given search params!'
  }

  return categories
}
