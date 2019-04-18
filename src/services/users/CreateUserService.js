import { Mongo } from 'porg'

export default async (ctx) => {
  let db = await Mongo.getDB()
  const user = { '_id': ctx.username, ...ctx }
  await db.collection('users').insertOne(user)
  return user
}
