import { Mongo } from 'porg'

export default async (params) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + 'GET -> Search assets')
  console.log('\n')
  console.log('QUERY RECEIVED FROM FRONTEND: ')
  console.log(params)
  console.log('\n')
  console.log(params.nResultsPerPage)

  // Convert strings into objects
  const ObjectIdentification = JSON.parse(params.objectIdentification)
  const ObjectDescription = JSON.parse(params.objectDescription)
  const ObjectLocation = JSON.parse(params.objectLocation)
  const ObjectHistory = JSON.parse(params.objectHistory)

  // Convert strings into numbers
  const nResultsPerPage = parseInt(params.nResultsPerPage)
  const currentPage = parseInt(params.currentPage)

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
  if (Object.keys(ObjectLocation).length > 0) {
    if (ObjectLocation.istSpace.room) {
      query['ObjectLocation.usual.istSpace.room'] = ObjectLocation.istSpace.room
    }
    if (ObjectLocation.istSpace.cabinet) {
      query['ObjectLocation.usual.istSpace.cabinet'] = ObjectLocation.istSpace.cabinet
    }
    if (ObjectLocation.istSpace.drawer) {
      query['ObjectLocation.usual.istSpace.drawer'] = ObjectLocation.istSpace.drawer
    }
    if (ObjectLocation.istSpace.position) {
      query['ObjectLocation.usual.istSpace.position'] = ObjectLocation.istSpace.position
    }
    if (ObjectLocation.address.name) {
      query['ObjectLocation.usual.address.name'] = ObjectLocation.address.name
    }
  }

  console.log('MONGODB QUERY: ')
  console.log(query)
  console.log('\n')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const assets = await db.collection('assets').find({ ...query }).limit(nResultsPerPage).skip((currentPage - 1) * 15).toArray()
  console.log('ASSETS FOUND: ')
  console.log(assets)
  if (!assets) {
    return 'No assets match the given search params!'
  }

  return assets
}
