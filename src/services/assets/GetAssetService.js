import { Mongo, errorWithKey } from 'porg'
import NormalizeObject from '@/schemas/NormalizeObject'

export default async ({ id }) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> Single asset (id: ' + id + ')')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const asset = await db.collection('assets').findOne({ _id: id })
  if (!asset) {
    throw errorWithKey('asset-not-found', { ctx: { id } })
  }

  return NormalizeObject(asset)
}
