import { Mongo, errorWithKey } from 'porg'
import ValidUsersServices from '@/services/users/ValidUsersServices'

export default async ({ id, roles, manager, ...unitUpdate }) => {
  let db = await Mongo.getDB()
  let unit = await db.collection('units').findOne({ _id: id })
  if (!unit) {
    throw errorWithKey('unit-not-found', { ctx: { unitID: id } })
  }
  if (!(unit.managers.includes(manager) || roles.includes('admin'))) {
    throw errorWithKey('not-authorized', { ctx: { parentID: unitUpdate.parentID } })
  }

  if (unitUpdate.parentID) {
    if (!roles.includes('admin')) {
      throw errorWithKey('not-authorized', { ctx: { parentID: unitUpdate.parentID } })
    }
    const parentUnit = await db.collection('units').findOne({ '_id': unitUpdate.parentID })
    if (!parentUnit) {
      throw errorWithKey('parent-unit-not-found', { ctx: { parentID: unitUpdate.parentID } })
    }
  }
  if (unitUpdate.managers) {
    if (!roles.includes('admin')) {
      throw errorWithKey('not-authorized', { ctx: { } })
    }
    if (!await ValidUsersServices({ users: unitUpdate.managers })) {
      throw errorWithKey('users-not-valid', { ctx: { parentID: unitUpdate.parentID } })
    }
  }
  try {
    await db.collection('units').updateOne({ _id: id }, { '$set': unitUpdate })
    return { id: unit._id }
  } catch (err) {
    throw err
  }
}
