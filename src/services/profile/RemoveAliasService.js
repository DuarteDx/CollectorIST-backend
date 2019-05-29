import { Mongo, errorWithKey } from 'porg'

export default async ({ userId, alias }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOneAndUpdate({ '_id': userId }, {
    $pull: { aliases: [alias] }
  })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  return {}
}
