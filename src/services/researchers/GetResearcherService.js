import { Mongo, errorWithKey } from 'porg'

export default async ({ userId }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId, 'roles': 'researcher' })
  if (!user) {
    throw errorWithKey('researcher-not-found', { ctx: { userId } })
  }
  // Get public email only

  user.email = (user.emails || []).find((e) => e.id === user.primaryEmail).email
  delete user.emails
  delete user.primaryEmail
  return user
}
