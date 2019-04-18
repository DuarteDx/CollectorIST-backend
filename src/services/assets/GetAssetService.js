import { Mongo, errorWithKey } from 'porg'
import NormalizeObject from '@/schemas/NormalizeObject'

export default async ({ id }) => {
  const db = await Mongo.getDB()
  const asset = await db.collection('assets').findOne({ _id: id, active: true })
  if (!asset) {
    throw errorWithKey('asset-not-found', { ctx: { id } })
  }
  return NormalizeObject(asset)
}
