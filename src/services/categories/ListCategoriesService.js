import { Mongo, errorWithKey } from 'porg'
import NormalizeObject from '@/schemas/NormalizeObject'

export default async () => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> List of categories')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const categories = await db.collection('categories').find({}).toArray()
  if (!categories) {
    return 'No categories in database!'
  }

  return NormalizeObject(categories)
}
