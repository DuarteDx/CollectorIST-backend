import { Mongo, errorWithKey } from 'porg'
import IsManagerInUnitService from '@/services/units/IsManagerInUnitService'

export default async ({ id, memberId, username }) => {
  if (!await IsManagerInUnitService({ id, username })) {
    throw errorWithKey('unit-not-found', { ctx: { id } })
  }
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOneAndUpdate({ '_id': memberId, 'affiliations.unitID': id }, {
    $pull: { 'affiliations': { unitID: id } }
  })
  if (!user.value) {
    throw errorWithKey('member-not-in-unit', { ctx: { memberId } })
  }
  return {}
}
