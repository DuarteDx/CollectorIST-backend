import { Mongo } from 'porg'

export default async ({ id }) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' DELETE -> Single collection (id: ' + id + ')')

  // Delete collection from DB
  let db = await Mongo.getDB()
  await db.collection('collections').deleteOne({ _id: id })

  return 'Deleted collection with id: ' + id
}
