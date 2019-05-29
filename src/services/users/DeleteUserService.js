import { Mongo } from 'porg'

export default async ({ id }) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' DELETE -> Single user (id: ' + id + ')')

  // Delete user from DB
  let db = await Mongo.getDB()
  await db.collection('users').deleteOne({ _id: id })

  return 'Deleted user with id: ' + id
}
