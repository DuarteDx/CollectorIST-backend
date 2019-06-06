import { Mongo } from 'porg'

export default async ({ id }) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' DELETE -> Single user (id: ' + id + ')')

  // Delete user from DB
  let db = await Mongo.getDB()
  await db.collection('users').deleteOne({ username: id })

  // Create log
  var log = {
    time: today,
    action: 'Delete user',
    asseId: id,
    userId: 'ToDo',
    userName: 'ToDo2'
  }
  await db.collection('logs').insertOne(log)

  return 'Deleted user with id: ' + id
}
