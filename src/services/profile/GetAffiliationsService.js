import { Mongo, errorWithKey } from 'porg'
import AffiliationSchema from '@/schemas/AffiliationSchema'

export default async ({ userId }) => {
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': userId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
  const unitIDs = user.affiliations.map(affiliation => affiliation.unitID)
  const units = await db.collection('units').find({ '_id': { '$in': unitIDs } }).toArray()
  const unitsMap = {}
  for (let unit of units) {
    unitsMap[unit._id] = unit
  }
  for (let affiliation of user.affiliations) {
    affiliation.unit = {
      id: affiliation.unitID,
      name: unitsMap[affiliation.unitID].name
    }
  }
  return {
    totalItems: user.affiliations.length,
    items: user.affiliations.map(AffiliationSchema)
  }
}
