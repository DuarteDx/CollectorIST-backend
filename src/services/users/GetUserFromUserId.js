import { Mongo } from 'porg'

export default async ({ userId }) => {
  let db = await Mongo.getDB()
  return db.collection('users').findOne({ '_id': userId })
}
