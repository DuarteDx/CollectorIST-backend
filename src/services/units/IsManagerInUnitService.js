import { Mongo } from 'porg'

export default async ({ id, username }) => {
  let db = await Mongo.getDB()
  let unit = await db.collection('units').findOne({ '_id': id, managers: username })
  return !!unit
}
