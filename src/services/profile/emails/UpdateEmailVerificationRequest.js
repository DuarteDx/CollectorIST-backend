import { Mongo, config, errorWithKey } from 'porg'
import jwt from 'jsonwebtoken'

export default async ({ userId, emailId, token }) => {
  let decoded
  try {
    decoded = jwt.verify(token, config.emailVerification.jwtSecret)
  } catch (error) {
    throw errorWithKey('expired-email-verification')
  }

  if (decoded.emailId !== emailId || decoded.userId !== userId) {
    throw errorWithKey('invalid-email-verification')
  }

  const db = await Mongo.getDB()
  const user = await db.collection('users').findOne({
    _id: userId,
    emails: {
      $elemMatch: {
        id: emailId,
        verified: { $eq: false }
      }
    }
  })
  if (!user) {
    throw errorWithKey('invalid-email-verification', {
      metadata: { userId, emailId }
    })
  }

  await db.collection('users').updateOne(
    {
      _id: userId,
      emails: {
        $elemMatch: {
          id: emailId,
          verified: { $eq: false }
        }
      }
    },
    {
      $set: {
        'emails.$.verified': true
      }
    }
  )
  return {} // FIXME, what should be returned?
}
