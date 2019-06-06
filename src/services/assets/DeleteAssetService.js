import { Mongo } from 'porg'

export default async ({ id }) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' DELETE -> Single asset (id: ' + id + ')')

  // Delete asset from DB
  let db = await Mongo.getDB()
  await db.collection('assets').deleteOne({ _id: id })

  // Create log
  var log = {
    time: today,
    action: 'Delete asset',
    asseId: id,
    userId: 'ToDo',
    userName: 'ToDo2'
  }
  await db.collection('logs').insertOne(log)

  return 'Deleted asset with id: ' + id
}
