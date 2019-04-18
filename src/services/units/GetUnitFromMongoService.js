import { Mongo, errorWithKey } from 'porg'

export default async ({ id }) => {
  let db = await Mongo.getDB()
  let unit = await db.collection('units').findOne({ _id: id })
  if (!unit) {
    throw errorWithKey('unit-not-found', { ctx: { unitID: id } })
  }
  return unit
}
