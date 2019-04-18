import { Mongo, errorWithKey } from 'porg'
import AliasesSchema from '@/schemas/AliasesSchema'

export default async ({ userId }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  return AliasesSchema((user.importedAliases || []).concat(user.aliases || []))
}
