import { Mongo } from 'porg'

export default async ({ userId, username }) => {
  const db = await Mongo.getDB()
  const result = await db.collection('users').findOneAndUpdate({ _id: userId }, { $set: { username } })
  if (result.ok) {
    return { ok: true }
  } else {
    return { ok: false }
  }
}
