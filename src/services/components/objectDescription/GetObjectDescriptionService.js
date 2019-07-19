import { Mongo } from 'porg'

export default async () => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> Object Description (list of categories)')

  // Get config from DB
  let db = await Mongo.getDB()
  const document = await db.collection('modules').findOne({ 'moduleName': 'objectDescription' })

  return document.categories.value
}
