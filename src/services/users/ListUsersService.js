import { Mongo, errorWithKey } from 'porg'
import NormalizeObject from '@/schemas/NormalizeObject'

export default async () => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> List of users')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const users = await db.collection('users').find({}).toArray()
  if (!users) {
    throw errorWithKey('users-not-found')
  }

  return NormalizeObject(users)
}
