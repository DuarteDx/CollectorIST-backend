import GetUsersServices from '@/services/users/GetUsersServices'
import { Mongo, errorWithKey } from 'porg'

export default async ({ unitID, skip, limit, sort, q }) => {
  let db = await Mongo.getDB()
  const unit = await db.collection('units').findOne({ '_id': unitID })
  if (!unit) {
    throw errorWithKey('unit-not-found', { ctx: { id: unitID } })
  }
  const users = await GetUsersServices({ users: unit.managers })
  const totalItems = users.length
  const items = users.slice(skip, limit).map(u => { // Emulate UserSchema is being used for elastic query
    return {
      id: u._id,
      userID: u._id,
      username: u.username,
      name: u.name,
      avatar: u.avatar,
      roles: u.roles
    }
  })
  return {
    totalItems,
    items
  }
}
