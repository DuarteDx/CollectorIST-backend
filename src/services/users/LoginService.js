import { Mongo } from 'porg'
const jwt = require('jsonwebtoken')

export default async ({ clientUser }) => {
  let db = await Mongo.getDB()
  const user = await db.collection('users').findOne({ 'name': clientUser.username })
  console.log(user)
  if (!user) {
    return 'User does not exist!'
  } else {
    console.log('server password: ' + user.password)
    console.log('client password: ' + clientUser.hashedPassword)
    if (user.password === clientUser.hashedPassword) {
      // Generate JWT token
      var token = jwt.sign({ user }, 'secretKey', { expiresIn: '1d' })

      // Create log
      var log = {
        time: Date(),
        action: 'Login',
        userId: user._id,
        userName: clientUser.username
      }
      // Insert log into DB
      await db.collection('logs').insertOne(log)

      return {
        username: clientUser.username,
        password: clientUser.hashedPassword,
        rank: user.rank,
        success: true,
        token: token
      }
    } else {
      return 'Invalid password!'
    }
  }
}
