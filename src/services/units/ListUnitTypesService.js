import { Mongo } from 'porg'

export default async () => {
  const db = await Mongo.getDB()
  let unitTypes = await db.collection('unit-types').find().toArray()
  return unitTypes.map(u => u._id)
}
