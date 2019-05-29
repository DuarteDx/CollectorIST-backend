import { Mongo, errorWithKey } from 'porg'

export default async ({ userId, provider }) => {
  const updateQuery = {}
  updateQuery[`externalProfiles.${provider}`] = ''
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOneAndUpdate({ '_id': userId }, {
    $unset: updateQuery
  })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  return {}
}
