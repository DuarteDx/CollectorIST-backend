import { Mongo, errorWithKey } from 'porg'
import nanoid from 'nanoid'
import IsManagerInUnitService from '@/services/units/IsManagerInUnitService'

export default async ({ id, memberId, start, end, username }) => {
  if (!await IsManagerInUnitService({ id, username })) {
    throw errorWithKey('unit-not-found', { ctx: { id } })
  }
  let db = await Mongo.getDB()
  let user = await db.collection('users').findOne({ '_id': memberId })
  if (!user) {
    throw errorWithKey('user-not-found', { ctx: { memberId } })
  }

  const newAffiliation = {
    id: nanoid(),
    unitID: id,
    start,
    end,
    verified: true
  }

  const response = await db.collection('users').updateOne(
    { '_id': memberId, 'affiliations.unitID': { $ne: id } },
    {
      $addToSet: {
        'affiliations': newAffiliation
      }
    }
  )
  if (response.result.n === 0) {
    throw errorWithKey('member-already-in-unit', { ctx: { id } })
  } else {
    return newAffiliation
  }
}
