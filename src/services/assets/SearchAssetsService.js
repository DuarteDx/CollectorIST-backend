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

  // Convert strings into objects
  // General modules
  const ObjectIdentification = JSON.parse(params.objectIdentification)
  const ObjectDescription = JSON.parse(params.objectDescription)
  const ObjectLocation = JSON.parse(params.objectLocation)
  const ObjectHistory = JSON.parse(params.objectHistory)
  const ObjectCollection = JSON.parse(params.objectCollection)
  // Specific modules
  if (params.pinturas) { var Pinturas = JSON.parse(params.pinturas) }
  if (params.gravuras) { var Gravuras = JSON.parse(params.gravuras) }

  // Convert strings into numbers
  const nResultsPerPage = parseInt(params.nResultsPerPage)
  const currentPage = parseInt(params.currentPage)

  // Build MongoDB query
  var query = {}

  // Add params to query if they are not null
  // GENERAL MODULES
  // OBJECT IDENTIFICATION
  if (ObjectIdentification.title) {
    query['ObjectIdentification.title'] = { $regex: ObjectIdentification.title, $options: 'i' }
  }
  if (ObjectIdentification.optionalIds) {
    if (ObjectIdentification.optionalIds.length > 0) {
      query['ObjectIdentification.optionalIds'] = { $all: ObjectIdentification.optionalIds }
    }
  }
  // OBJECT DESCRIPTION
  if (ObjectDescription.category) {
    query['ObjectDescription.category'] = { $all: [ObjectDescription.category] }
  }
  // OBJECT LOCATION
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
  // OBJECT COLLECTION
  if (ObjectCollection.collection) {
    query['ObjectCollection.collection'] = ObjectCollection.collection
  }

  // OBJECT HISTORY
  if (Object.keys(ObjectHistory).length > 0) {
    if (ObjectHistory.initial) {
      query['ObjectHistory.initial'] = { $regex: ObjectHistory.initial, $options: 'i' }
    }
    if (ObjectHistory.end) {
      query['ObjectHistory.end'] = { $regex: ObjectHistory.end, $options: 'i' }
    }
    if (ObjectHistory.local) {
      query['ObjectHistory.local'] = { $regex: ObjectHistory.local, $options: 'i' }
    }
    if (ObjectHistory.activity) {
      query['ObjectHistory.activity'] = { $regex: ObjectHistory.activity, $options: 'i' }
    }
  }
  // SPECIFIC MODULES
  // PINTURAS
  if (params.pinturas) {
    if (Object.keys(Pinturas).length > 0) {
      if (Pinturas.author) {
        query['pinturas.author'] = Pinturas.author
      }
      if (Pinturas.year) {
        query['pinturas.year'] = Pinturas.year
      }
      if (Pinturas.materia.length) {
        console.log(Pinturas.materia)
        query['pinturas.materia'] = { $all: [Pinturas.materia] }
      }
      if (Pinturas.suporte) {
        query['pinturas.suporte'] = Pinturas.suporte
      }
      if (Pinturas.tecnica) {
        query['pinturas.tecnica'] = Pinturas.tecnica
      }
    }
  }
  // GRAVURAS
  if (params.gravuras) {
    if (Object.keys(Gravuras).length > 0) {
      if (Gravuras.amountOfCopies) {
        query['gravuras.amountOfCopies'] = Gravuras.amountOfCopies
      }
      if (Gravuras.copyNumber) {
        query['gravuras.copyNumber'] = Gravuras.copyNumber
      }
    }
  }

  console.log('MONGODB QUERY: ')
  console.log(query)
  console.log('\n')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const resultsCount = await db.collection('assets').find({ ...query }).count()
  const assets = await db.collection('assets').find({ ...query }).skip((currentPage - 1) * nResultsPerPage).limit(nResultsPerPage).toArray()
  console.log('ASSETS FOUND: ')
  console.log(assets)
  if (!assets) {
    return 'No assets match the given search params!'
  }
  // Prepend results counts to assets array
  assets.unshift(resultsCount)

  return assets
}
