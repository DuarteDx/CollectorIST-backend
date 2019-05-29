import { Mongo, errorWithKey } from 'porg'

export default async ({ userId, id }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOneAndUpdate({ '_id': userId }, {
    $pull: { 'affiliations': { id } }
  })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  return {}
}
