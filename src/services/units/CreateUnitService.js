import { Mongo, errorWithKey } from 'porg'
import nanoId from 'nanoid'
import ValidUsersServices from '@/services/users/ValidUsersServices'

export default async (ctx) => {
  let db = await Mongo.getDB()
  const unit = { '_id': nanoId(), ...ctx }
  const parentUnit = await db.collection('units').findOne({ '_id': ctx.parentID })
  if (!parentUnit) {
    throw errorWithKey('parent-unit-not-found', { ctx: { parentID: ctx.parentID } })
  }
  if (!await ValidUsersServices({ users: ctx.managers })) {
    throw errorWithKey('users-not-valid', { ctx: { parentID: ctx.parentID } })
  }
  try {
    await db.collection('units').insertOne(unit)
    return { id: unit._id }
  } catch (err) {
    if (err.errmsg && err.errmsg.startsWith('E11000 duplicate key error collection')) {
      throw errorWithKey('unit-name-already-in-use', { ctx: { name: ctx.name } })
    }
    throw err
  }
}
