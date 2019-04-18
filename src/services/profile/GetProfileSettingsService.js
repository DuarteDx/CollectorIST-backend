import { Mongo, errorWithKey } from 'porg'
import ProfileSettingsSchema from '@/schemas/ProfileSettingsSchema'

export default async ({ userId }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  const profile = ProfileSettingsSchema(user)
  return profile
}
