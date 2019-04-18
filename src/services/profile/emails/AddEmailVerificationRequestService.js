import { Mongo, Email, config, errorWithKey } from 'porg'
import jwt from 'jsonwebtoken'

export default async ({ userId, emailId }) => {
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
    throw errorWithKey('invalid-email-verification')
  }

  const emailObject = user.emails.find(e => e.id === emailId)
  await Email.sendWithTemplate({
    from: config.noreplyEmail,
    to: emailObject.email,
    template: 'verification_email',
    context: {
      emailId,
      token: getTokenFor({ userId, emailId })
    },
    locale: user.locale || 'pt'
  })
  return {} // FIXME, what should be returned?
}

const getTokenFor = ({ userId, emailId }) => {
  return jwt.sign({ userId, emailId }, config.emailVerification.jwtSecret, { expiresIn: '2m' })
}
