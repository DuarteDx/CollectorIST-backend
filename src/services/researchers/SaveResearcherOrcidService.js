import { Mongo, errorWithKey } from 'porg'

export default async ({ userId, orcid }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOneAndUpdate({ '_id': userId }, { $set: { 'externalProfiles.orcid': { id: orcid, lastSync: undefined } } })
  if (!user) {
    throw errorWithKey('researcher-not-found', { ctx: { userId } })
  }
  return { orcid }
}
