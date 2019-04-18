import { Mongo } from 'porg'

export default async ({ users }) => {
  let db = await Mongo.getDB()
  const usersInDb = await db.collection('users').find({ '_id': { '$in': users } }).toArray()
  return usersInDb
}
