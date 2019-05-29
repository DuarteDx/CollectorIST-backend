import { Mongo, errorWithKey } from 'porg'

export default async ({ userId, emailId, primary }) => {
  if (primary) {
    let db = await Mongo.getDB()
    const status = await db.collection('users').updateOne(
      {
        '_id': userId,
        'emails.id': emailId
      },
      { $set: { 'primaryEmail': emailId } }
    )
    if (status.result.nModified === 0) {
      throw errorWithKey('unable-to-change-primary-email', { ctx: { userId, emailId } })
    }
    return emailId
  }
}
