import { Mongo } from 'porg'
const ObjectId = require('mongodb').ObjectID

export default async (id) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> Single category: ' + id)

  // Fetch data from DB
  const db = await Mongo.getDB()
  const category = await db.collection('categories').findOne({ _id: ObjectId(id) })
  if (!category) {
    return 'Requested category is not in database!'
  }

  return category
}
