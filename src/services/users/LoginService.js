import { Mongo } from 'porg'

export default async ({ clientUser }) => {
  let db = await Mongo.getDB()
  console.log(clientUser)
  const user = await db.collection('users').findOne({ 'name': clientUser.username })
  console.log(user)
  if (!user) {
    return 'User does not exist!'
  } else {
    console.log('server password: ' + user.password)
    console.log('client password: ' + clientUser.hashedPassword)
    if (user.password === clientUser.hashedPassword) {

      // Create log
      var log = {
        time: Date(),
        action: 'Login',
        userId: user._id,
        userName: clientUser.username
      }
      await db.collection('logs').insertOne(log)

      return {
        username: clientUser.username,
        password: clientUser.hashedPassword,
        rank: user.rank,
        success: true
      }
    } else {
      return 'Invalid password!'
    }
  }
}
