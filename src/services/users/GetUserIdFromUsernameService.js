import { Mongo } from 'porg'

export default async ({ username }) => {
  let db = await Mongo.getDB()
  const user = await db.collection('users').findOne({ 'username': username })
  if (!user) {
    return null
  } else {
    return { userId: user._id }
  }
}
