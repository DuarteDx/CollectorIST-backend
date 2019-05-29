import { Mongo, errorWithKey } from 'porg'
import NormalizeObject from '@/schemas/NormalizeObject'

export default async () => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> List of logs')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const logs = await db.collection('logs').find({}).toArray()
  if (!logs) {
    throw errorWithKey('logs-not-found')
  }

  return NormalizeObject(logs)
}
