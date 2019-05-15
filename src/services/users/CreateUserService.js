import { Mongo } from 'porg'

export default async (user) => {
  console.log(user)
  let db = await Mongo.getDB()
  const newUser = {
    '_id': user.name,
    'name': user.name,
    'password': user.hashedPassword,
    'rank': user.rank
  }
  console.log('Created user: ')
  console.log(newUser)
  await db.collection('users').insertOne(newUser)
  return newUser
}
