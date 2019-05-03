import { Mongo, errorWithKey } from 'porg'
import NormalizeObject from '@/schemas/NormalizeObject'

export default async () => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> List of collections')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const collections = await db.collection('collections').find({}).toArray()
  if (!collections) {
    throw errorWithKey('collections-not-found')
  }

  return NormalizeObject(collections)
}
