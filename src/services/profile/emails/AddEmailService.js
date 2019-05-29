import { Mongo, errorWithKey } from 'porg'
import nanoid from 'nanoid'
import AddEmailVerificationRequestService from './AddEmailVerificationRequestService'

export default async ({ userId, email, primary }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  const emails = user.emails || []
  if (emails.some(e => e.email === email)) {
    throw errorWithKey('user-already-has-email', { ctx: { userId, email } })
  }
  const isPrimary = emails.length === 0 ? true : primary
  const newEmail = {
    id: nanoid(),
    email,
    verified: false
  }

  await db.collection('users').updateOne(
    { '_id': userId },
    {
      $addToSet: {
        'emails': newEmail
      },
      ...isPrimary && {
        $set: {
          ...isPrimary && { 'primaryEmail': newEmail.id }
        }
      }
    }
  )

  await AddEmailVerificationRequestService({
    userId,
    emailId: newEmail.id
  })
  return newEmail
}
