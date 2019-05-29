import { Mongo, errorWithKey } from 'porg'

export default async ({ userId, emailId }) => {
  let db = await Mongo.getDB()
  const status = await db.collection('users').updateOne(
    {
      '_id': userId,
      'emails.1': { $exists: true }
    },
    { $pull: { 'emails': { 'id': emailId } } }
  )
  if (status.result.nModified === 0) {
    throw errorWithKey('unable-to-delete-email', { ctx: { userId, emailId } })
  }
  return emailId
}
