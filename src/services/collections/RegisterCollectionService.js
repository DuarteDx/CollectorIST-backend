import { Mongo } from 'porg'
import nanoId from 'nanoid'

export default async ({ collection }) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' POST -> Insert single collection (title: ' + collection.title + ')')

  // Insert collection into DB
  let db = await Mongo.getDB()
  collection._id = nanoId()
  await db.collection('collections').insertOne(collection)

  return 'Id of newly inserted collection: ' + collection._id
}
