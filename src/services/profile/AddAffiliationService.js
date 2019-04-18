import { Mongo, errorWithKey } from 'porg'
import nanoid from 'nanoid'

export default async ({ userId, unitID, start, end }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }

  const newAffiliation = {
    id: nanoid(),
    unitID,
    start,
    end,
    verified: false
  }

  await db.collection('users').updateOne(
    { '_id': userId },
    {
      $addToSet: {
        'affiliations': newAffiliation
      }
    }
  )

  return newAffiliation
}
