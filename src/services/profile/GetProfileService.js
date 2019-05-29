import { Mongo, errorWithKey } from 'porg'
import ProfileSchema from '@/schemas/ProfileSchema'
import UnitSchema from '@/schemas/UnitSchema'

export default async ({ userId }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  const profile = ProfileSchema(user)
  let units = await db.collection('units').find({ 'managers': userId }).toArray()
  profile.units = units.map(UnitSchema)
  return profile
}
