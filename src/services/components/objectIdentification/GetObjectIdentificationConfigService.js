import { Mongo } from 'porg'

export default async () => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> List of optional ids (objectIdentification)')

  // Get config from DB
  let db = await Mongo.getDB()
  const document = await db.collection('modules').findOne({ 'moduleName': 'objectIdentification' })

  return document.optionalId.values
}
