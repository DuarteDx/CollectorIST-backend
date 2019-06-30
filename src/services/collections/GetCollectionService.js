import { Mongo } from 'porg'
const ObjectId = require('mongodb').ObjectID

export default async (id) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> Single collection: ' + id)

  // Fetch data from DB
  const db = await Mongo.getDB()
  const collection = await db.collection('collections').findOne({ _id: ObjectId(id) })
  if (!collection) {
    return 'Requested collection is not in database!'
  }

  return collection
}
