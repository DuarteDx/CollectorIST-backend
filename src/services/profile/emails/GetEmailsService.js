import { Mongo, errorWithKey } from 'porg'
import EmailsSchema from '@/schemas/EmailsSchema'

export default async ({ userId }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  return EmailsSchema(user || [])
}
