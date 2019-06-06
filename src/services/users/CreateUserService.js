import { Mongo } from 'porg'

export default async (user) => {
  console.log(user)

  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' POST -> Single user (id: ' + user.id + ')')

  let db = await Mongo.getDB()

  // Insert in DB
  const newUser = {
    '_id': user.name,
    'name': user.name,
    'password': user.hashedPassword,
    'rank': user.rank
  }
  console.log('Created user: ')
  console.log(newUser)
  await db.collection('users').insertOne(newUser)

  // Create log
  var log = {
    time: today,
    action: 'Create user',
    asseId: user.id,
    userId: 'ToDo',
    userName: 'ToDo2'
  }
  await db.collection('logs').insertOne(log)

  return newUser
}
