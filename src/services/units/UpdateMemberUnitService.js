import { Mongo, errorWithKey } from 'porg'
import IsManagerInUnitService from '@/services/units/IsManagerInUnitService'

export default async ({ id, memberId, verified, username }) => {
  if (!await IsManagerInUnitService({ id, username })) {
    throw errorWithKey('unit-not-found', { ctx: { id } })
  }
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': memberId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { memberId } })
  }
  if (verified) {
    await db.collection('users').updateOne(
      { '_id': memberId, 'affiliations.unitID': id },
      {
        $set: {
          'affiliations.$.verified': true
        }
      }
    )
  } else {
    await db.collection('users').findOneAndUpdate({ '_id': memberId }, {
      $pull: { 'affiliations': { unitID: id } }
    })
    // TODO: Create notitication to user
  }
  return {}
}
