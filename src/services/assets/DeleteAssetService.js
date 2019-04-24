import { Mongo } from 'porg'

export default async ({ id }) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' DELETE -> Single asset (id: ' + id + ')')

  // Delete asset from DB
  let db = await Mongo.getDB()
  await db.collection('assets').deleteOne({ _id: id })

  return 'Deleted asset with id: ' + id
}
